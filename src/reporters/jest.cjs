const { ReportBuilder } = require('../helpers/report-builder.cjs');
const { escapeSpecialCharacters } = require('../helpers/strings.cjs');
const { getNowISOString } = require('../helpers/system.cjs');

const makeDetailId = (file, name) => {
	return `${file}[${name}]`;
};

const makeDetailName = (testCaseResult) => {
	const titleParts = [
		...(testCaseResult.ancestorTitles ?? []),
		testCaseResult.title
	];

	return titleParts
		.map(titlePart => escapeSpecialCharacters(`${titlePart}`.trim()))
		.join(' > ');
};

const getDetailStatus = (status) => {
	if (status === 'passed') {
		return 'passed';
	}

	if (['pending', 'skipped', 'todo', 'disabled'].includes(status)) {
		return 'skipped';
	}

	return 'failed';
};

class JestLogger {
	info(message) {
		const lines = `${message}`.split(/\r?\n/u);

		for (const line of lines) {
			console.log(`[D2L Reporter] ${line}`);
		}
	}

	warning(message) {
		console.warn(`[D2L Reporter] ${message}`);
	}

	error(message) {
		console.error(`[D2L Reporter] ${message}`);
	}

	location(message, location) {
		this.info(`${message}: ${location}`);
	}
}

class JestReporter {
	#globalConfig;
	#lastError;
	#logger;
	#options;
	#report;
	#testCaseRetries;
	#testCaseStarted;

	constructor(globalConfig, options = {}) {
		this.#globalConfig = globalConfig;
		this.#lastError = null;
		this.#logger = new JestLogger();
		this.#options = options;
		this.#report = null;
		this.#testCaseRetries = new Map();
		this.#testCaseStarted = new Map();
	}

	#getTimeout() {
		return this.#globalConfig?.testTimeout ?? null;
	}

	#applyLocation(detail, location) {
		if (!location) {
			return;
		}

		detail
			.setLocationLine(location.line)
			.setLocationColumn(location.column);
	}

	#applyTimeout(detail) {
		const timeout = this.#getTimeout();

		if (timeout != null) {
			detail.setTimeout(timeout);
		}
	}

	onRunStart(results) {
		try {
			this.#report = new ReportBuilder('jest', this.#logger, this.#options);
		} catch ({ message }) {
			this.#logger.error('Failed to initialize D2L test report builder, report will not be generated');
			this.#logger.error(message);
			this.#lastError = new Error('D2L test report initialization failed');

			return;
		}

		const started = results?.startTime ?
			new Date(results.startTime).toISOString() :
			getNowISOString();

		this.#report
			.getSummary()
			.addContext()
			.setStarted(started);
	}

	onTestCaseStart(test, testCaseStartInfo) {
		if (!this.#report) {
			return;
		}

		const file = test?.path;

		if (!file || this.#report.ignoreFilePath(file)) {
			return;
		}

		const name = makeDetailName(testCaseStartInfo);
		const id = makeDetailId(file, name);

		this.#testCaseStarted.set(id, getNowISOString());
	}

	onTestCaseResult(test, testCaseResult) {
		if (!this.#report) {
			return;
		}

		const file = test?.path;

		if (!file || this.#report.ignoreFilePath(file)) {
			return;
		}

		const name = makeDetailName(testCaseResult);
		const id = makeDetailId(file, name);
		const status = getDetailStatus(testCaseResult.status);
		const retries = Math.max((testCaseResult.invocations ?? 1) - 1, 0);
		const previousRetries = this.#testCaseRetries.get(id) ?? 0;
		const duration = testCaseResult.duration ?? 0;
		const started = this.#testCaseStarted.get(id) ?? getNowISOString();
		const detail = this.#report
			.getDetail(id)
			.setName(name)
			.setLocationFile(file)
			.setStarted(started);

		this.#applyLocation(detail, testCaseResult.location);
		this.#applyTimeout(detail);

		if (retries > previousRetries) {
			detail.addRetries(retries - previousRetries);
		}

		this.#testCaseRetries.set(id, retries);

		if (status === 'skipped') {
			detail
				.setSkipped()
				.setDurationFinal(0)
				.setDurationTotal(0);
		} else {
			detail.addDuration(duration);

			if (status === 'passed') {
				detail.setPassed();
			} else {
				detail.setFailed();
			}
		}

		this.#testCaseStarted.delete(id);
	}

	onTestResult(test, testResult) {
		if (!this.#report) {
			return;
		}

		const file = test?.path;

		if (!file || this.#report.ignoreFilePath(file)) {
			return;
		}

		for (const testCaseResult of testResult.testResults ?? []) {
			const status = getDetailStatus(testCaseResult.status);

			if (status !== 'skipped') {
				continue;
			}

			const name = makeDetailName(testCaseResult);
			const id = makeDetailId(file, name);
			const detail = this.#report.getDetail(id);

			if (detail.getStatus()) {
				continue;
			}

			const started = this.#testCaseStarted.get(id) ?? getNowISOString();

			detail
				.setName(name)
				.setLocationFile(file)
				.setStarted(started)
				.setSkipped()
				.setDurationFinal(0)
				.setDurationTotal(0);

			this.#applyLocation(detail, testCaseResult.location);
			this.#applyTimeout(detail);

			this.#testCaseStarted.delete(id);
		}

		const hasNoTests = (testResult.testResults?.length ?? 0) === 0;
		const hasExecutionError = testResult.testExecError?.message;

		if (!hasNoTests || !hasExecutionError) {
			return;
		}

		const name = 'test execution error';
		const id = makeDetailId(file, name);
		const detail = this.#report
			.getDetail(id)
			.setName(name)
			.setLocationFile(file)
			.setStarted(getNowISOString())
			.addDuration(0)
			.setFailed();

		this.#applyTimeout(detail);
	}

	onRunComplete(_, results) {
		if (!this.#report) {
			if (this.#lastError) {
				this.#logger.error('D2L test report was not generated due to initialization failure');
			}

			return;
		}

		const duration = results?.startTime ? Math.max(Date.now() - results.startTime, 0) : 0;
		const summary = this.#report
			.getSummary()
			.setDurationTotal(duration);

		if (results?.success) {
			summary.setPassed();
		} else {
			summary.setFailed();
		}

		this.#report
			.finalize()
			.save();
	}

	getLastError() {
		return this.#lastError;
	}
}

module.exports = JestReporter;
