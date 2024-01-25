const { reporters: { Base, Spec }, Runner: { constants } } = require('mocha');
const { hasContext, getContext } = require('../helpers/github.cjs');
const { getOperatingSystem, makeLocation, getConfiguration, getReportOptions, determineReportPath, writeReport } = require('./helpers.cjs');
const { randomUUID } = require('node:crypto');

const { consoleLog, color } = Base;

const {
	EVENT_RUN_BEGIN,
	EVENT_RUN_END,
	EVENT_TEST_BEGIN,
	EVENT_TEST_END,
	EVENT_TEST_PENDING,
	EVENT_TEST_RETRY
} = constants;

const makeTestName = (test) => {
	return test.titlePath().join(' > ');
};

const convertEndState = (state) => {
	return state === 'pending' ? 'skipped' : state;
};

const log = (message) => {
	consoleLog(`  ${message}`);
};

class TestReportingMochaReporter extends Spec {
	constructor(runner, options) {
		super(runner, options);

		const { stats } = runner;
		const { reporterOptions: { reportPath, configurationPath } = {} } = options;

		this._configuration = getConfiguration(configurationPath);
		this._reportPath = determineReportPath(reportPath);
		this._report = {
			reportId: randomUUID(),
			reportVersion: 1,
			summary: {
				operatingSystem: getOperatingSystem(),
				framework: 'mocha'
			}
		};

		if (hasContext()) {
			const githubContext = getContext();

			this._report.summary = {
				...this._report.summary,
				...githubContext
			};
		} else {
			log(color('bright yellow', 'D2L test report will not contain GitHub context details'));
		}

		this._tests = new Map();
		this._testsFlaky = new Set();

		runner
			.once(EVENT_RUN_BEGIN, () => this._onRunBegin(stats))
			.on(EVENT_TEST_PENDING, test => this._onTestPending(test))
			.on(EVENT_TEST_BEGIN, test => this._onTestBegin(test))
			.on(EVENT_TEST_END, test => this._onTestEnd(test))
			.on(EVENT_TEST_RETRY, test => this._onTestRetry(test))
			.once(EVENT_RUN_END, () => this._onRunEnd(stats));
	}

	_onRunBegin(stats) {
		this._report.summary.started = stats.start.toISOString();
	}

	_onTestPending(test) {
		this._onTestBegin(test);
	}

	_onTestBegin(test) {
		const name = makeTestName(test);
		const values = this._tests.get(name) ?? {};

		values.started = values.started ?? (new Date()).toISOString();
		values.location = values.location ?? makeLocation(test.file);
		values.retries = values.retries ?? 0;
		values.totalDuration = values.totalDuration ?? 0;

		if (!values.type || !values.tool || !values.experience) {
			const { type, tool, experience } = getReportOptions(this._configuration, values.location);

			values.type = values.type ?? type;
			values.tool = values.tool ?? tool;
			values.experience = values.experience ?? experience;
		}

		this._tests.set(name, values);
	}

	_onTestRetry(test) {
		const name = makeTestName(test);
		const values = this._tests.get(name);

		values.totalDuration += test.duration;
		values.retries += 1;

		this._tests.set(name, values);
	}

	_onTestEnd(test) {
		const name = makeTestName(test);
		const values = this._tests.get(name);

		values.status = convertEndState(test.state);
		values.duration = test.duration ?? 0;
		values.totalDuration += values.duration;

		this._tests.set(name, values);

		if (values.status === 'passed' && values.retries !== 0) {
			this._testsFlaky.add(name);
		}
	}

	_onRunEnd(stats) {
		this._report.summary.totalDuration = stats.duration;
		this._report.summary.status = stats.failures !== 0 ? 'failed' : 'passed';
		this._report.summary.countPassed = stats.passes;
		this._report.summary.countFailed = stats.failures;
		this._report.summary.countSkipped = stats.pending;
		this._report.summary.countFlaky = this._testsFlaky.size;
		this._report.details = [...this._tests].map(([name, values]) => ({ name, ...values }));

		try {
			writeReport(this._reportPath, this._report);
			log(`D2L test report available at: ${color('pending', this._reportPath)}\n`);
		} catch {
			log(color('fail', 'Failed to generate D2L test report\n'));
		}
	}
}

module.exports = TestReportingMochaReporter;
