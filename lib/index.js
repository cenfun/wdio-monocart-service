import { CoverageReport } from 'monocart-coverage-reports';

export default class CoverageReportService {

    /**
     * `serviceOptions` contains all options specific to the service
     * e.g. if defined as follows:
     *
     * ```
     * services: [['monocart', { outputDir: 'coverage-reports' }]]
     * ```
     *
     * the `serviceOptions` parameter will be: `{ outputDir: 'coverage-reports' }`
     */
    constructor(serviceOptions, capabilities, config) {
        this.coverageReport = new CoverageReport({
            ... serviceOptions
        });
        // v8 or istanbul
        this.coverageProvider = 'v8';
    }

    /**
     * this browser object is passed in here for the first time
     */
    async before(config, capabilities, browser) {
        this.browser = browser;
        // something before all tests are run, e.g.
        await this.coverageReport.loadConfig();
        this.coverageProvider = this.coverageReport.options.coverageProvider;
        this.coverageReport.cleanCache();
    }

    async after(exitCode, config, capabilities) {
        // something after all tests are run
        if (this.coverageReport.hasCache()) {
            await this.coverageReport.generate();
        }
    }

    async beforeTest(test, context) {
        // something before each Mocha/Jasmine test run
        const puppeteer = await this.browser.getPuppeteer();
        if (puppeteer) {
            const page = (await puppeteer.pages())[0];
            if (page) {

                if (this.coverageProvider === 'istanbul') {
                    // no need start for istanbul, but it requires instrumenting source code
                    // https://github.com/cenfun/monocart-coverage-reports?tab=readme-ov-file#collecting-istanbul-coverage-data
                } else {
                    await Promise.all([
                        page.coverage.startJSCoverage({
                            resetOnNavigation: false,
                            includeRawScriptCoverage: true
                        }),
                        page.coverage.startCSSCoverage({
                            resetOnNavigation: false
                        })
                    ]);
                }
            }
        }

    }

    async afterTest(test, context) {
        const puppeteer = await this.browser.getPuppeteer();
        if (puppeteer) {
            const page = (await puppeteer.pages())[0];
            if (page) {

                if (this.coverageProvider === 'istanbul') {
                    const coverageData = await page.evaluate(() => window.__coverage__);
                    await this.coverageReport.add(coverageData);
                } else {
                    const [jsCoverage, cssCoverage] = await Promise.all([
                        page.coverage.stopJSCoverage(),
                        page.coverage.stopCSSCoverage()
                    ]);
                    // to raw V8 script coverage
                    const coverageList = [... jsCoverage.map((it) => {
                        return {
                            source: it.text,
                            ... it.rawScriptCoverage
                        };
                    }), ... cssCoverage];
                    await this.coverageReport.add(coverageList);
                }

            }
        }
    }

}
