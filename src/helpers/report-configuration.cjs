const fs = require('node:fs');
const { resolve } = require('node:path');
const {
	formatErrorAjv,
	validateReportConfigurationV2Ajv
} = require('./schema.cjs');
const { minimatch } = require('minimatch');
const { makeRelativeFilePath } = require('./system.cjs');

const defaultConfigurationPath = './d2l-test-reporting.config.json';
const defaultLogger = {
	warning: (message) => console.warn(message)
};

const upgradeReportConfigurationV1ToV2 = (configuration, logger) => {
	const { experience, overrides, ...rest } = configuration;
	const upgraded = { ...rest };

	if (experience != null) {
		logger.warning('Report configuration field \'experience\' is no longer supported and will be ignored');
	}

	if (overrides) {
		const upgradedOverrides = [];

		for (const override of overrides) {
			const { experience: overrideExperience, ...overrideRest } = override;

			if (overrideExperience != null) {
				logger.warning(`Report configuration override for pattern '${override.pattern}' has field 'experience' which is no longer supported and will be ignored`);
			}

			if (Object.keys(overrideRest).length < 2) {
				logger.warning(`Report configuration override for pattern '${override.pattern}' has no remaining fields after upgrade and will be dropped`);

				continue;
			}

			upgradedOverrides.push(overrideRest);
		}

		if (upgradedOverrides.length > 0) {
			upgraded.overrides = upgradedOverrides;
		}
	}

	return upgraded;
};

class ReportConfiguration {
	constructor(path, logger) {
		logger ??= defaultLogger;

		let reportConfiguration;
		let reportConfigurationPath;

		if (path) {
			path = resolve(path);

			try {
				const contents = fs.readFileSync(path, 'utf8');

				reportConfiguration = JSON.parse(contents);
			} catch {
				throw new Error(`Unable to read/parse report configuration at path ${path}`);
			}

			reportConfigurationPath = makeRelativeFilePath(path);
		} else {
			path = resolve(defaultConfigurationPath);

			let contents;

			try {
				contents = fs.readFileSync(path, 'utf8');
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

		reportConfiguration = upgradeReportConfigurationV1ToV2(reportConfiguration, logger);

		if (!validateReportConfigurationV2Ajv(reportConfiguration)) {
			const { errors } = validateReportConfigurationV2Ajv;

			throw new Error(formatErrorAjv(errors, { dataVar: 'report configuration' }));
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
				tool: overriddenTool
			} = override;

			if (minimatch(filePath, pattern)) {
				metadata.type = overriddenType?.toLowerCase();
				metadata.tool = overriddenTool;

				break;
			}
		}

		const {
			type: defaultType,
			tool: defaultTool
		} = this._reportConfiguration;

		metadata.type = metadata.type ?? defaultType?.toLowerCase();
		metadata.tool = metadata.tool ?? defaultTool;

		return metadata;
	}

	hasTaxonomy(filePath) {
		const taxonomy = this.getTaxonomy(filePath);

		return taxonomy.type != null && taxonomy.tool != null;
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
