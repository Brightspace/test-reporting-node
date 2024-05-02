const { getContext, hasContext } = require('./github.cjs');
const { getOperatingSystemType, makeRelativeFilePath } = require('./system.cjs');
const { randomUUID } = require('node:crypto');
const { resolve } = require('node:path');
const { ReportConfiguration } = require('./report-configuration.cjs');
const { writeFileSync } = require('node:fs');

const defaultReportPath = './d2l-test-report.json';
const reportMemberPriority = [
	'id',
	'version',
	'summary',
	'details',
	'github',
	'organization',
	'repository',
	'workflow',
	'runId',
	'runAttempt',
	'git',
	'branch',
	'sha',
	'name',
	'status',
	'lms',
	'buildNumber',
	'instanceUrl',
	'location',
	'file',
	'line',
	'column',
	'browser',
	'framework',
	'operatingSystem',
	'started',
	'duration',
	'total',
	'final',
	'tool',
	'experience',
	'type',
	'count',
	'passed',
	'failed',
	'skipped',
	'flaky',
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

	_accumulateProperty(key, value) {
		if (this._data[key] != null) {
			this._data[key] += value;
		} else {
			this._data[key] = value;
		}
	}

	_setNestedProperty(parentKey, key, value, { override = false } = {}) {
		this._data[parentKey] = this._data[parentKey] ?? {};

		if (override) {
			this._data[parentKey][key] = value;
		} else {
			this._data[parentKey][key] = this._data[parentKey][key] ?? value;
		}
	}

	_accumulateNestedProperty(parentKey, key, value) {
		this._data[parentKey] = this._data[parentKey] ?? {};

		if (this._data[parentKey][key] != null) {
			this._data[parentKey][key] += value;
		} else {
			this._data[parentKey][key] = value;
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
			const { github, git } = getContext();

			this._setProperty('github', github, { override: true });
			this._setProperty('git', git, { override: true });
		} else {
			this._logger.warning('D2L test report will not contain GitHub context details');
		}

		return this;
	}

	setStarted(started, options) {
		this._setProperty('started', started, options);

		return this;
	}

	setDurationTotal(durationTotal, options) {
		this._setNestedProperty('duration', 'total', durationTotal, options);

		return this;
	}

	setStatus(status, options) {
		this._setProperty('status', status, options);

		return this;
	}

	setPassed(options) {
		return this.setStatus('passed', options);
	}

	setFailed(options) {
		return this.setStatus('failed', options);
	}

	setCount(status, count, options) {
		this._setNestedProperty('count', status, count, options);

		return this;
	}

	setCountPassed(count, options) {
		return this.setCount('passed', count, options);
	}

	setCountFlaky(count, options) {
		return this.setCount('flaky', count, options);
	}

	setCountSkipped(count, options) {
		return this.setCount('skipped', count, options);
	}

	setCountFailed(count, options) {
		return this.setCount('failed', count, options);
	}
}

class ReportDetailBuilder extends ReportBuilderBase {
	constructor(reportConfiguration) {
		super();

		this._reportConfiguration = reportConfiguration;

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

	setLocationFile(filePath, options) {
		filePath = makeRelativeFilePath(filePath);

		this._setNestedProperty('location', 'file', filePath, options);

		const { type, tool, experience } = this._reportConfiguration.getTaxonomy(filePath);

		this._setProperty('type', type, options);
		this._setProperty('tool', tool, options);
		this._setProperty('experience', experience, options);

		return this;
	}

	setLocationLine(number, options) {
		this._setNestedProperty('location', 'line', number, options);

		return this;
	}

	setLocationColumn(number, options) {
		this._setNestedProperty('location', 'column', number, options);

		return this;
	}

	setBrowser(browser, options) {
		this._setProperty('browser', browser, options);

		return this;
	}

	setStatus(status, options) {
		this._setProperty('status', status, options);

		return this;
	}

	setPassed(options) {
		return this.setStatus('passed', options);
	}

	setSkipped(options) {
		return this.setStatus('skipped', options);
	}

	setFailed(options) {
		return this.setStatus('failed', options);
	}

	incrementRetries() {
		return this.addRetries(1);
	}

	addRetries(count) {
		this._accumulateProperty('retries', count);

		return this;
	}

	addDuration(duration) {
		this._accumulateNestedProperty('duration', 'total', duration);

		return this.setDurationFinal(duration, { override: true });
	}

	setDurationTotal(duration, options) {
		this._setNestedProperty('duration', 'total', duration, options);

		return this;
	}

	setDurationFinal(duration, options) {
		this._setNestedProperty('duration', 'final', duration, options);

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

		this._setProperty('id', randomUUID());
		this._setProperty('version', 2);
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
			.setCountPassed(countPassed)
			.setCountFlaky(countFlaky)
			.setCountSkipped(countSkipped)
			.setCountFailed(countFailed);

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
