import { Report } from './report.cjs';

export interface Logger {
	info(message: string): void;
	warning(message: string): void;
	error(message: string): void;
	location(message: string, location: string): void;
}

export interface ReportSubmitter {
	logger: Logger;
}

export interface ReportSubmitterSubmit {
	report: Report;
}
