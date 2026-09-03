import type { Logger } from './report-builder.js';

export interface Taxonomy {
	type?: string;
	tool?: string;
}

export declare class ReportConfiguration {
	constructor(path?: string, logger?: Pick<Logger, 'warning'>);

	getPath(): string | undefined;
	getDefaultTaxonomy(): Taxonomy;
	getTaxonomy(filePath: string): Taxonomy;
	hasTaxonomy(filePath: string): boolean;
	ignoreFilePath(filePath: string): boolean;
	toJSON(): Record<string, unknown>;
}
