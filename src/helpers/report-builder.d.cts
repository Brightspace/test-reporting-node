export interface Logger {
	info(message: string): void;
	warning(message: string): void;
	error(message: string): void;
	location(message: string, location: string): void;
}

export interface SetOptions {
	override?: boolean;
}

export interface ReportBuilderOptions {
	reportPath?: string;
	reportConfigurationPath?: string;
	reportWriter?: (reportData: string) => void;
	verbose?: boolean;
}

export interface ReportSummaryBuilder {
	addContext(): ReportSummaryBuilder;
	setStarted(started: string, options?: SetOptions): ReportSummaryBuilder;
	setDurationTotal(
		durationTotal: number,
		options?: SetOptions,
	): ReportSummaryBuilder;
	setPassed(options?: SetOptions): ReportSummaryBuilder;
	setFailed(options?: SetOptions): ReportSummaryBuilder;
}

export interface ReportDetailBuilder {
	readonly data: Record<string, unknown>;
	setName(name: string, options?: SetOptions): ReportDetailBuilder;
	setStarted(started: string, options?: SetOptions): ReportDetailBuilder;
	setLocationFile(
		filePath: string,
		options?: SetOptions,
	): ReportDetailBuilder;
	setLocationLine(line: number, options?: SetOptions): ReportDetailBuilder;
	setLocationColumn(
		column: number,
		options?: SetOptions,
	): ReportDetailBuilder;
	setBrowser(browser: string, options?: SetOptions): ReportDetailBuilder;
	setTimeout(timeout: number, options?: SetOptions): ReportDetailBuilder;
	setPassed(options?: SetOptions): ReportDetailBuilder;
	setSkipped(options?: SetOptions): ReportDetailBuilder;
	setFailed(options?: SetOptions): ReportDetailBuilder;
	incrementRetries(): ReportDetailBuilder;
	addRetries(count: number): ReportDetailBuilder;
	addDuration(duration: number): ReportDetailBuilder;
	_setNestedProperty(
		parentKey: string,
		key: string,
		value: string,
		options?: SetOptions,
	): void;
	getStatus(): string | undefined;
}

export declare class ReportBuilder {
	constructor(
		framework: string,
		logger: Logger,
		options: ReportBuilderOptions,
	);

	finalize(): ReportBuilder;
	getDetail(id: string): ReportDetailBuilder;
	getSummary(): ReportSummaryBuilder;
	ignoreFilePath(filePath: string): boolean;
	save(): void;
}
