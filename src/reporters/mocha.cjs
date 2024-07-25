const { reporters: { Base, Spec }, Runner: { constants } } = require('mocha');
const { ReportBuilder } = require('../helpers/report-builder.cjs');

const { consoleLog, color } = Base;
const {
	EVENT_RUN_BEGIN,
	EVENT_RUN_END,
	EVENT_TEST_BEGIN,
	EVENT_TEST_END,
	EVENT_TEST_PENDING,
	EVENT_TEST_RETRY
} = constants;

class MochaLogger {
	info(message) { consoleLog(`  ${message}`); }
	warning(message) { this.info(color('bright yellow', message)); }
	error(message) { this.info(color('fail', message)); }
	location(message, location) { this.info(`${message}: ${color('pending', location)}`); }
}

const makeDetailName = (test) => {
	return test.titlePath().join(' > ');
};

const makeDetailId = (file, name) => {
	return `${file}[${name}]`;
};

class TestReportingMochaReporter extends Spec {
	constructor(runner, options) {
		super(runner, options);

		const { stats } = runner;
		const { reporterOptions = {} } = options;

		this._logger = new MochaLogger();

		try {
			const report = new ReportBuilder('mocha', this._logger, reporterOptions);

			this._report = report;
		} catch ({ message }) {
			this._logger.error('Failed to initialize D2L test report builder, report will not be generated');
			this._logger.error(message);

			return;
		}

		runner
			.once(EVENT_RUN_BEGIN, () => this._onRunBegin(stats))
			.on(EVENT_TEST_PENDING, test => this._onTestPending(test))
			.on(EVENT_TEST_BEGIN, test => this._onTestBegin(test))
			.on(EVENT_TEST_END, test => this._onTestEnd(test))
			.on(EVENT_TEST_RETRY, test => this._onTestRetry(test))
			.once(EVENT_RUN_END, () => this._onRunEnd(stats));
	}

	_onRunBegin(stats) {
		this._report
			.getSummary()
			.addContext()
			.setStarted(stats.start.toISOString());
	}

	_onTestPending(test) {
		this._onTestBegin(test);
	}

	_onTestBegin(test) {
		const { file, _timeout } = test;

		if (this._report.ignoreFilePath(file)) {
			return;
		}

		const name = makeDetailName(test);
		const id = makeDetailId(file, name);

		this._report
			.getDetail(id)
			.setName(name)
			.setLocationFile(file)
			.setStarted((new Date()).toISOString())
			.setTimeout(_timeout); // using internal property, not ideal
	}

	_onTestRetry(test) {
		const { file } = test;

		if (this._report.ignoreFilePath(file)) {
			return;
		}

		const { duration } = test;
		const name = makeDetailName(test);
		const id = makeDetailId(file, name);

		this._report
			.getDetail(id)
			.incrementRetries()
			.addDuration(duration);
	}

	_onTestEnd(test) {
		const { file } = test;

		if (this._report.ignoreFilePath(file)) {
			return;
		}

		const { duration, state } = test;
		const name = makeDetailName(test);
		const id = makeDetailId(file, name);
		const detail = this._report.getDetail(id);

		if (state === 'pending') {
			detail
				.setSkipped()
				.setDurationFinal(0)
				.setDurationTotal(0);
		} else {
			detail.addDuration(duration);

			if (state === 'passed') {
				detail.setPassed();
			} else {
				detail.setFailed();
			}
		}
	}

	_onRunEnd(stats) {
		const { duration, failures } = stats;
		const summary = this._report
			.getSummary()
			.setDurationTotal(duration);

		if (failures === 0) {
			summary.setPassed();
		} else {
			summary.setFailed();
		}

		this._report
			.finalize()
			.save();
	}
}

module.exports = TestReportingMochaReporter;
