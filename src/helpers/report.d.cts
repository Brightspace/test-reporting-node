export interface ReportGithub {
    organization: string,
    repository: string,
    workflow: string,
    runId: number,
    runAttempt: number
}

export interface ReportGit {
    branch: string,
    sha: string
}

export interface ReportContext {
    github: ReportGithub,
    git: ReportGit,
}

export interface ReportLms {
    buildNumber?: string,
    instanceUrl?: string 
}

export interface ReportSummary {
    status: 'passed' | 'failed',
    github: ReportGithub,
    git: ReportGit,
    lms: ReportLms,
    framework: string,
    operatingSystem: 'linux' | 'windows' | 'mac',
    started: string,
    duration: {
      total: number
    },
    count: {
      passed: number,
      failed: number,
      skipped: number,
      flaky: number
    }
}

interface ReportDetails {
    name: string,
    status: 'passed' | 'skipped' | 'failed',
    location: {
        file: string,
        line?: number,
        column?: number
    },
    taxonomy: {
        tool?: string,
        type?: string
    },
    browser?:'chromium' | 'chrome' | 'firefox' | 'webkit' | 'safari' | 'edge',
    configuration: {
        timeout?: number
    },
    started: number,
    duration: {
        total: number,
        final: number
    },
    github: {
        codeowners?: string[]
    },
    retries: number
}

export interface Report {
    id: string,
    version: number,
    summary: ReportSummary,
    details: ReportDetails[]
}

export declare class Report {
    constructor (
        path: string,
        options: {
            context: ReportContext,
            lmsInfo: ReportLms
            overrideContext: boolean,
        }
    );
    getPath(): string;
    getId(): string;
    getVersionOriginal(): string;
    getVersion(): string;
    getContext(): ReportContext;
    toJSON(): Report
}