const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { formatErrorAjv, validateReportConfigurationV1Ajv } = require('./schema.cjs');
const { minimatch } = require('minimatch');
const { makeRelativeFilePath } = require('./system.cjs');

const defaultConfigurationPath = './d2l-test-reporting.config.json';

class ReportConfiguration {
	constructor(path) {
		let reportConfiguration;
		let reportConfigurationPath;

		if (path) {
			path = resolve(path);

			try {
				const contents = readFileSync(path, 'utf8');

				reportConfiguration = JSON.parse(contents);
			} catch {
				throw new Error(`Unable to read/parse report configuration at path ${path}`);
			}

			reportConfigurationPath = makeRelativeFilePath(path);
		} else {
			path = resolve(defaultConfigurationPath);

			let contents;

			try {
				contents = readFileSync(path, 'utf8');
			} catch {
				this._reportConfiguration = {};

				return;
			}

			try {
				reportConfiguration = JSON.parse(contents);
			} catch {
				throw new Error(`Unable to read/parse report configuration at path ${path}`);
			}

			reportConfigurationPath = makeRelativeFilePath(path);
		}

		if (!validateReportConfigurationV1Ajv(reportConfiguration)) {
			const { errors } = validateReportConfigurationV1Ajv;

			throw new Error(formatErrorAjv('report configuration', errors));
		}

		this._reportConfigurationPath = reportConfigurationPath;
		this._reportConfiguration = reportConfiguration;
	}

	getPath() {
		return this._reportConfigurationPath;
	}

	getTaxonomy(filePath) {
		filePath = makeRelativeFilePath(filePath);

		const { overrides } = this._reportConfiguration;
		const metadata = {};

		for (const override of overrides ?? []) {
			const {
				pattern,
				type: overriddenType,
				tool: overriddenTool,
				experience: overriddenExperience
			} = override;

			if (minimatch(filePath, pattern)) {
				metadata.type = overriddenType?.toLowerCase();
				metadata.tool = overriddenTool;
				metadata.experience = overriddenExperience;

				break;
			}
		}

		const {
			type: defaultType,
			tool: defaultTool,
			experience: defaultExperience
		} = this._reportConfiguration;

		metadata.type = metadata.type ?? defaultType?.toLowerCase();
		metadata.tool = metadata.tool ?? defaultTool;
		metadata.experience = metadata.experience ?? defaultExperience;

		return metadata;
	}

	hasTaxonomy(filePath) {
		const taxonomy = this.getTaxonomy(filePath);

		return taxonomy.type != null &&
			taxonomy.tool != null &&
			taxonomy.experience != null;
	}

	ignoreFilePath(filePath) {
		filePath = makeRelativeFilePath(filePath);

		const { ignorePatterns } = this._reportConfiguration;

		for (const ignorePattern of ignorePatterns ?? []) {
			if (minimatch(filePath, ignorePattern)) {
				return true;
			}
		}

		return false;
	}

	toJSON() {
		return this._reportConfiguration;
	}
}

module.exports = { ReportConfiguration };
