const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { formatErrorAjv, validateReportConfigurationAjv } = require('./schema.cjs');
const { minimatch } = require('minimatch');
const { makeLocation } = require('./system.cjs');

const defaultConfigurationPath = './d2l-test-reporting.config.json';

class ReportConfiguration {
	constructor(path) {
		let reportConfiguration;

		if (path) {
			path = resolve(path);

			try {
				const contents = readFileSync(path, 'utf8');

				reportConfiguration = JSON.parse(contents);
			} catch {
				throw new Error(`Unable to read/parse configuration at path ${path}`);
			}
		} else {
			path = resolve(defaultConfigurationPath);

			let contents;

			try {
				contents = readFileSync(path, 'utf8');
			} catch {
				return {};
			}

			try {
				reportConfiguration = JSON.parse(contents);
			} catch {
				throw new Error(`Unable to read/parse configuration at path ${path}`);
			}
		}

		if (!validateReportConfigurationAjv(reportConfiguration)) {
			const { errors } = validateReportConfigurationAjv;

			throw new Error(formatErrorAjv('report configuration', errors));
		}

		this._reportConfiguration = reportConfiguration;
	}

	getTaxonomy(location) {
		location = makeLocation(location);

		const { overrides } = this._reportConfiguration;
		const metadata = {};

		for (const override of overrides ?? []) {
			const {
				pattern,
				type: overriddenType,
				tool: overriddenTool,
				experience: overriddenExperience
			} = override;

			if (minimatch(location, pattern)) {
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

	hasTaxonomy(location) {
		const taxonomy = this.getTaxonomy(location);

		return taxonomy.type != null &&
			taxonomy.tool != null &&
			taxonomy.experience != null;
	}

	ignoreLocation(location) {
		location = makeLocation(location);

		const { ignorePatterns } = this._reportConfiguration;

		for (const ignorePattern of ignorePatterns ?? []) {
			if (minimatch(location, ignorePattern)) {
				return true;
			}
		}

		return false;
	}
}

module.exports = { ReportConfiguration };
