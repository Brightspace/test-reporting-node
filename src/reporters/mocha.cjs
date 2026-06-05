const { reporters: { Base, Spec }, Runner: { constants } } = require('mocha');
const { escapeSpecialCharacters } = require('../helpers/strings.cjs');
const { ReportBuilder } = require('../helpers/report-builder.cjs');

const { consoleLog, color } = Base;
const {
	EVENT_RUN_BEGIN,
	EVENT_RUN_END,
	EVENT_TEST_BEGIN,
	EVENT_TEST_END,
	EVENT_TEST_FAIL,
	EVENT_TEST_PENDING,
	EVENT_TEST_RETRY
} = constants;

class MochaLogger {
	info(message) {
		const lines = `${message}`.split(/\r?\n/u);

		for (const line of lines) {
			consoleLog(`  ${line}`);
		}
	}

	warning(message) { this.info(color('bright yellow', message)); }
	error(message) { this.info(color('fail', message)); }
	location(message, location) { this.info(`${message}: ${color('pending', location)}`); }
}

const makeDetailName = (test) => {
	return test
		.titlePath()
		.map(titlePart => escapeSpecialCharacters(titlePart).trim())
		.join(' > ');
};

const makeDetailId = (file, name) => {
	return `${file}[${name}]`;
};

class TestReportingMochaReporter extends Spec {
	#logger;
	#report;

	constructor(runner, options) {
		super(runner, options);

		const { stats } = runner;
		const { reporterOptions = {} } = options;

		this.#logger = new MochaLogger();

		try {
			const report = new ReportBuilder('mocha', this.#logger, reporterOptions);

			this.#report = report;
		} catch ({ message }) {
			this.#logger.error('\nFailed to initialize D2L test report builder, report will not be generated\n');
			this.#logger.error(message);

			runner.once(
				EVENT_RUN_END,
				() => this.#logger.error('\nD2L test report was not generated due to initialization failure')
			);

			return;
		}

		runner
			.once(EVENT_RUN_BEGIN, () => this.#onRunBegin(stats))
			.on(EVENT_TEST_PENDING, test => this.#onTestPending(test))
			.on(EVENT_TEST_BEGIN, test => this.#onTestBegin(test))
			.on(EVENT_TEST_END, test => this.#onTestEnd(test))
			.on(EVENT_TEST_FAIL, test => this.#onTestFail(test))
			.on(EVENT_TEST_RETRY, test => this.#onTestRetry(test))
			.once(EVENT_RUN_END, () => this.#onRunEnd(stats));
	}

	#onRunBegin(stats) {
		this.#report
			.getSummary()
			.addContext()
			.setStarted(stats.start.toISOString());
	}

	#onTestPending(test) {
		this.#onTestBegin(test);
	}

	#onTestBegin(test) {
		const { file, _timeout } = test;

		if (this.#report.ignoreFilePath(file)) {
			return;
		}

		const name = makeDetailName(test);
		const id = makeDetailId(file, name);

		this.#report
			.getDetail(id)
			.setName(name)
			.setLocationFile(file)
			.setStarted((new Date()).toISOString())
			.setTimeout(_timeout); // using internal property, not ideal
	}

	#onTestRetry(test) {
		const { file } = test;

		if (this.#report.ignoreFilePath(file)) {
			return;
		}

		const { duration } = test;
		const name = makeDetailName(test);
		const id = makeDetailId(file, name);

		this.#report
			.getDetail(id)
			.incrementRetries()
			.addDuration(duration);
	}

	#onTestEnd(test) {
		const { file, _timeout } = test;

		if (this.#report.ignoreFilePath(file)) {
			return;
		}

		const { duration, state } = test;
		const name = makeDetailName(test);
		const id = makeDetailId(file, name);
		const detail = this.#report
			.getDetail(id)
			.setTimeout(_timeout, { override: true });

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

	#onTestFail(test) {
		if (test.type !== 'hook') {
			return;
		}

		const affectedTest = test.ctx?.currentTest;

		if (!affectedTest) {
			return;
		}

		const { file, _timeout } = affectedTest;

		if (!file || this.#report.ignoreFilePath(file)) {
			return;
		}

		const name = makeDetailName(affectedTest);
		const id = makeDetailId(file, name);
		const detail = this.#report.getDetail(id);

		if (!detail.getStatus()) {
			detail
				.setName(name)
				.setLocationFile(file)
				.setStarted((new Date()).toISOString())
				.setTimeout(_timeout)
				.addDuration(0)
				.setFailed();
		}
	}

	#onRunEnd(stats) {
		const { duration, failures } = stats;
		const summary = this.#report
			.getSummary()
			.setDurationTotal(duration);

		if (failures === 0) {
			summary.setPassed();
		} else {
			summary.setFailed();
		}

		this.#report
			.finalize()
			.save();
	}
}

module.exports = TestReportingMochaReporter;
