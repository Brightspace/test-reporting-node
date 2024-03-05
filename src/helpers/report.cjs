const { formatErrorAjv, validateReportAjv, validateReportConfigurationAjv } = require('./schema.cjs');
const { getContext, hasContext } = require('./github.cjs');
const { readFileSync, writeFileSync } = require('node:fs');
const { relative, sep: platformSeparator, resolve } = require('node:path');
const { getOperatingSystem } = require('./system.cjs');
const { join } = require('node:path/posix');
const { minimatch } = require('minimatch');
const { randomUUID } = require('node:crypto');

const defaultReportPath = './d2l-test-report.json';
const defaultConfigurationPath = './d2l-test-reporting.config.json';
const reportMemberPriority = [
	'reportId',
	'reportVersion',
	'summary',
	'details',
	'githubOrganization',
	'githubRepository',
	'githubWorkflow',
	'githubRunId',
	'githubRunAttempt',
	'gitBranch',
	'gitSha',
	'name',
	'status',
	'lmsBuildNumber',
	'lmsInstanceUrl',
	'location',
	'browser',
	'framework',
	'operatingSystem',
	'started',
	'totalDuration',
	'duration',
	'tool',
	'experience',
	'type',
	'countPassed',
	'countFailed',
	'countSkipped',
	'countFlaky',
	'retries'
];

const makeLocation = (filePath) => {
	const path = relative(process.cwd(), filePath);
	const pathParts = path.split(platformSeparator);

	return join(...pathParts);
};

const determineReportPath = (path) => {
	return resolve(path ?? defaultReportPath);
};

const getReportConfiguration = (path) => {
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

	return reportConfiguration;
};

const getReportTaxonomy = (configuration, location) => {
	const { overrides } = configuration;
	const metadata = {};

	for (const override of overrides ?? []) {
		const { pattern, type, tool, experience } = override;

		if (minimatch(location, pattern)) {
			metadata.type = type?.toLowerCase();
			metadata.tool = tool;
			metadata.experience = experience;

			break;
		}
	}

	metadata.type = metadata.type ?? configuration.type?.toLowerCase();
	metadata.tool = metadata.tool ?? configuration.tool;
	metadata.experience = metadata.experience ?? configuration.experience;

	return metadata;
};

const ignorePattern = (configuration, location) => {
	const { ignorePatterns } = configuration;

	for (const ignorePattern of ignorePatterns ?? []) {
		if (minimatch(location, ignorePattern)) {
			return true;
		}
	}

	return false;
};

const validateReport = (report) => {
	if (!validateReportAjv(report)) {
		const { errors } = validateReportAjv;

		throw new Error(formatErrorAjv('report', errors));
	}
};

class ReportSummary {
	constructor(framework, logger) {
		this._logger = logger;
		this._reportSummary = {
			operatingSystem: getOperatingSystem(),
			framework
		};
	}

	toJSON() {
		return this._reportSummary;
	}

	_setProperty(key, value, { override = false } = {}) {
		if (override) {
			this._reportSummary[key] = value;
		} else {
			this._reportSummary[key] = this._reportSummary[key] ?? value;
		}
	}

	addContext() {
		if (hasContext()) {
			const githubContext = getContext();

			this._reportSummary = {
				...this._reportSummary,
				...githubContext
			};
		} else {
			this._logger.warning('D2L test report will not contain GitHub context details');
		}

		return this;
	}

	setStarted(started, options) {
		this._setProperty('started', started, options);

		return this;
	}

	setTotalDuration(totalDuration, options) {
		this._setProperty('totalDuration', totalDuration, options);

		return this;
	}

	setPassed(options) {
		this._setProperty('status', 'passed', options);

		return this;
	}

	setFailed(options) {
		this._setProperty('status', 'failed', options);

		return this;
	}

	setPassedCount(countPassed, options) {
		this._setProperty('countPassed', countPassed, options);

		return this;
	}

	setFlakyCount(countFlaky, options) {
		this._setProperty('countFlaky', countFlaky, options);

		return this;
	}

	setSkippedCount(countSkipped, options) {
		this._setProperty('countSkipped', countSkipped, options);

		return this;
	}

	setFailedCount(countFailed, options) {
		this._setProperty('countFailed', countFailed, options);

		return this;
	}
}

class ReportDetail {
	constructor(reportConfiguration) {
		this._reportConfiguration = reportConfiguration;
		this._reportDetail = {
			totalDuration: 0,
			duration: 0,
			retries: 0
		};
	}

	_setProperty(key, value, { override = false } = {}) {
		if (override) {
			this._reportDetail[key] = value;
		} else {
			this._reportDetail[key] = this._reportDetail[key] ?? value;
		}
	}

	toJSON() {
		return this._reportDetail;
	}

	setStarted(started, options) {
		this._setProperty('started', started, options);

		return this;
	}

	setName(name, options) {
		this._setProperty('name', name, options);

		return this;
	}

	setLocation(location, options) {
		location = makeLocation(location);

		this._setProperty('location', location, options);

		const { type, tool, experience } = getReportTaxonomy(this._reportConfiguration, location);

		this._setProperty('type', type, options);
		this._setProperty('tool', tool, options);
		this._setProperty('experience', experience, options);

		return this;
	}

	setBrowser(browser, options) {
		this._setProperty('browser', browser, options);

		return this;
	}

	setPassed(options) {
		this._setProperty('status', 'passed', options);

		return this;
	}

	setSkipped(options) {
		this._setProperty('status', 'skipped', options);

		return this;
	}

	setFailed(options) {
		this._setProperty('status', 'failed', options);

		return this;
	}

	incrementRetries() {
		return this.addRetries(1);
	}

	addRetries(count) {
		this._reportDetail.retries += count;

		return this;
	}

	addDuration(duration) {
		this._setProperty('duration', duration, { override: true });

		this._reportDetail.totalDuration += duration;

		return this;
	}
}

class Report {
	constructor(framework, logger, options) {
		const { reportPath, reportConfigurationPath, reportWriter, verbose = false } = options;

		this._logger = logger;
		this._verbose = verbose;

		if (reportWriter) {
			if (reportPath) {
				throw new Error('must supply only one of \'reportPath\' or \'reportWriter\'');
			}

			this._writeReport = (reportData) => {
				reportWriter(reportData);

				this._logger.info('D2L test report available at output location');
			};
		} else {
			const reportPathFinal = determineReportPath(reportPath);

			this._writeReport = (reportData) => {
				writeFileSync(reportPathFinal, reportData, 'utf8');

				this._logger.location('D2L test report available at', reportPathFinal);
			};
		}

		this._reportConfiguration = getReportConfiguration(reportConfigurationPath);
		this._report = {
			reportId: randomUUID(),
			reportVersion: 1,
			summary: new ReportSummary(framework, this._logger),
			details: new Map()
		};
	}

	ignorePattern(location) {
		location = makeLocation(location);

		return ignorePattern(this._reportConfiguration, location);
	}

	getSummary() {
		return this._report.summary;
	}

	getDetail(id) {
		const { details } = this._report;

		if (!details.has(id)) {
			details.set(id, new ReportDetail(this._reportConfiguration));
		}

		return details.get(id);
	}

	finalize() {
		let countPassed = 0;
		let countFailed = 0;
		let countSkipped = 0;
		let countFlaky = 0;

		for (const [, detail] of this._report.details) {
			const { status, retries } = detail.toJSON();

			if (status === 'passed') {
				if (retries !== 0) {
					countFlaky++;
				} else {
					countPassed++;
				}
			} else if (status === 'skipped') {
				countSkipped++;
			} else {
				countFailed++;
			}

			if (this._verbose) {
				const { name, location, type, tool, experience } = detail.toJSON();
				const prefix = `Test '${name}' at '${location}' is missing`;

				if (!type) {
					this._logger.warning(`${prefix} a 'type'`);
				}

				if (!tool) {
					this._logger.warning(`${prefix} a 'tool'`);
				}

				if (!experience) {
					this._logger.warning(`${prefix} an 'experience'`);
				}
			}
		}

		this.getSummary()
			.setPassedCount(countPassed)
			.setFlakyCount(countFlaky)
			.setSkippedCount(countSkipped)
			.setFailedCount(countFailed);

		return this;
	}

	toJSON() {
		return {
			reportId: this._report.reportId,
			reportVersion: this._report.reportVersion,
			summary: this._report.summary.toJSON(),
			details: [...this._report.details].map(([, detail]) => detail.toJSON())
		};
	}

	save() {
		try {
			const reportData = JSON.stringify(this, reportMemberPriority);

			this._writeReport(reportData);
		} catch {
			this._logger.error('Failed to generate D2L test report');
		}
	}
}

module.exports = { Report, validateReport };
