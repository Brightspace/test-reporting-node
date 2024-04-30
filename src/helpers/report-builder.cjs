const { getContext, hasContext } = require('./github.cjs');
const { getOperatingSystemType, makeRelativeFilePath } = require('./system.cjs');
const { flatten } = require('./object.cjs');
const { randomUUID } = require('node:crypto');
const { resolve } = require('node:path');
const { ReportConfiguration } = require('./report-configuration.cjs');
const { writeFileSync } = require('node:fs');

const defaultReportPath = './d2l-test-report.json';
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

const determineReportPath = (path) => {
	return resolve(path ?? defaultReportPath);
};

class ReportBuilderBase {
	constructor() {
		this._data = {};
	}

	toJSON() {
		return this._data;
	}

	_setProperty(key, value, { override = false } = {}) {
		if (override) {
			this._data[key] = value;
		} else {
			this._data[key] = this._data[key] ?? value;
		}
	}
}

class ReportSummaryBuilder extends ReportBuilderBase {
	constructor(framework, logger) {
		super();

		this._logger = logger;

		this._setProperty('operatingSystem', getOperatingSystemType());
		this._setProperty('framework', framework);
	}

	addContext() {
		if (hasContext()) {
			const context = getContext();

			this._data = {
				...this._data,
				...flatten(context)
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

class ReportDetailBuilder extends ReportBuilderBase {
	constructor(reportConfiguration) {
		super();

		this._reportConfiguration = reportConfiguration;

		this._setProperty('totalDuration', 0);
		this._setProperty('duration', 0);
		this._setProperty('retries', 0);
	}

	setStarted(started, options) {
		this._setProperty('started', started, options);

		return this;
	}

	setName(name, options) {
		this._setProperty('name', name, options);

		return this;
	}

	setLocation(filePath, options) {
		filePath = makeRelativeFilePath(filePath);

		this._setProperty('location', filePath, options);

		const { type, tool, experience } = this._reportConfiguration.getTaxonomy(filePath);

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
		this._data.retries += count;

		return this;
	}

	addDuration(duration) {
		this._setProperty('duration', duration, { override: true });

		this._data.totalDuration += duration;

		return this;
	}
}

class ReportBuilder extends ReportBuilderBase {
	constructor(framework, logger, options) {
		super();

		const {
			reportPath,
			reportConfigurationPath,
			reportWriter,
			verbose = false
		} = options;

		this._logger = logger;
		this._verbose = verbose;
		this._reportConfiguration = new ReportConfiguration(reportConfigurationPath);

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

		this._setProperty('reportId', randomUUID());
		this._setProperty('reportVersion', 1);
		this._setProperty('summary', new ReportSummaryBuilder(framework, this._logger));
		this._setProperty('details', new Map());
	}

	ignoreFilePath(filePath) {
		return this._reportConfiguration.ignoreFilePath(filePath);
	}

	getSummary() {
		return this._data.summary;
	}

	getDetail(id) {
		const { details } = this._data;

		if (!details.has(id)) {
			details.set(id, new ReportDetailBuilder(this._reportConfiguration));
		}

		return details.get(id);
	}

	finalize() {
		let countPassed = 0;
		let countFailed = 0;
		let countSkipped = 0;
		let countFlaky = 0;

		for (const [, detail] of this._data.details) {
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
		const data = super.toJSON();

		return {
			...data,
			summary: data.summary.toJSON(),
			details: [...data.details].map(([, detail]) => detail.toJSON())
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

module.exports = { ReportBuilder };
