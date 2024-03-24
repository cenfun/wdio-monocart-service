import type {
    CoverageReportOptions as BaseOptions,
    ReportDescription,
    V8CoverageEntry,
    Watermarks,
    CoverageResults,
    CoverageSummary,
    MetricsSummary,
    CoverageFile,
    CoverageRange,
    IgnoredRange,
    AddedResults,
    CoverageReport
} from "monocart-coverage-reports";

interface CoverageReportOptions extends BaseOptions {
    coverageProvider?: 'v8' | "istanbul";
}

export type {
    CoverageReportOptions,
    ReportDescription,
    V8CoverageEntry,
    Watermarks,
    CoverageResults,
    CoverageSummary,
    MetricsSummary,
    CoverageFile,
    CoverageRange,
    IgnoredRange,
    AddedResults,
    CoverageReport
}