# wdio-monocart-service
[![](https://img.shields.io/npm/v/wdio-monocart-service)](https://www.npmjs.com/package/wdio-monocart-service)
[![](https://badgen.net/npm/dw/wdio-monocart-service)](https://www.npmjs.com/package/wdio-monocart-service)
![](https://img.shields.io/github/license/cenfun/wdio-monocart-service)


> A [WebdriverIO](https://github.com/webdriverio/webdriverio) service for [monocart coverage reports](https://github.com/cenfun/monocart-coverage-reports)

## Install
```sh
npm i wdio-monocart-service
```

## Usage
```js
// wdio.conf.js
{
    services: [
        ['monocart', {
            name: 'My WebdriverIO Coverage Report',
            // v8 (default) or istanbul (requires instrumenting source code)
            // coverageProvider: 'v8',
            entryFilter: '**/src/**',
            reports: [
                'v8',
                'console-details'
            ],
            outputDir: './coverage-reports'
        }]
    ]
}
```

Check repo [monocart coverage reports](https://github.com/cenfun/monocart-coverage-reports) for more options.