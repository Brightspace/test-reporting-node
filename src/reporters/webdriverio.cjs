const WDIOReporter = require('@wdio/reporter').default;
const { ReportBuilder } = require('../helpers/report-builder.cjs');
const { escapeSpecialCharacters } = require('../helpers/strings.cjs');

class WebdriverIO extends WDIOReporter {
	constructor(options) {
		super({
			...options,
			stdout: false
		});

		const logger = {
			info: (msg) => console.log(`[D2L Reporter] ${msg}`),
			warning: (msg) => console.warn(`[D2L Reporter] ${msg}`),
			error: (msg) => console.error(`[D2L Reporter] ${msg}`),
			location: (msg, loc) => console.log(`[D2L Reporter] ${msg}: ${loc}`)
		};

		try {
			this._report = new ReportBuilder('webdriverio', logger, {
				reportPath: options.reportPath || './d2l-test-report.json',
				reportConfigurationPath: options.reportConfigurationPath || './d2l-test-reporting.config.json',
				verbose: options.verbose || false
			});
			console.log('[D2L Reporter] Initialized successfully');
		} catch (error) {
			console.error('[D2L Reporter] Failed to initialize:', error.message);
			this._report = null;
			return;
		}

		this._testStartTimes = new Map();
		this._testFiles = new Map();
		this._suiteStartTime = null;
		this._totalDuration = 0;
	}

	_getTestId(test) {
		const file = test.file || test.parent || 'unknown';
		const fullName = test.fullTitle || test.title || 'unknown-test';
		return `${file}[${fullName}]`;
	}

	_getPlatformName() {
		const capabilities = this.runnerStat?.capabilities;
		if (!capabilities) return null;

		const platformName = capabilities.platformName || capabilities['appium:platformName'] || capabilities.platform;
		return platformName ? platformName.toLowerCase().trim() : null;
	}

	_makeTestName(test) {
		const platform = this._getPlatformName();
		let testName = (test.fullTitle || test.title || 'unknown-test');

		testName = testName.split('.').map(part => escapeSpecialCharacters(part.trim())).join(' > ');

		return platform ? `[${platform}] > ${testName}` : testName;
	}

	onRunnerStart() {
		if (!this._report) return;

		this._suiteStartTime = new Date().toISOString();

		this._report
			.getSummary()
			.addContext()
			.setStarted(this._suiteStartTime);

		console.log('[D2L Reporter] Test run started');
	}

	onTestStart(test) {
		if (!this._report) return;

		const filePath = test.file || this.runnerStat?.specs?.[0] || 'unknown';

		if (filePath !== 'unknown' && this._report.ignoreFilePath(filePath)) {
			return;
		}

		const testId = this._getTestId(test);
		const startTime = new Date().toISOString();

		this._testStartTimes.set(testId, startTime);
		this._testFiles.set(testId, filePath);

		const testName = this._makeTestName(test);
		const detail = this._report.getDetail(testId);
		detail
			.setName(testName)
			.setLocationFile(filePath)
			.setStarted(startTime);

		if (test.timeout) {
			detail.setTimeout(test.timeout);
		}

	}

	onTestEnd(test) {
		if (!this._report) return;

		const testId = this._getTestId(test);
		let filePath = this._testFiles.get(testId);

		if (!filePath) {
			filePath = test.file || this.runnerStat?.specs?.[0] || 'unknown';
			this._testFiles.set(testId, filePath);
		}

		if (filePath !== 'unknown' && this._report.ignoreFilePath(filePath)) {
			return;
		}

		const detail = this._report.getDetail(testId);

		if (!this._testStartTimes.has(testId)) {
			const testName = this._makeTestName(test);
			const startTime = new Date().toISOString();
			this._testStartTimes.set(testId, startTime);

			detail
				.setName(testName)
				.setLocationFile(filePath)
				.setStarted(startTime);

			if (test.timeout) {
				detail.setTimeout(test.timeout);
			}
		}

		if (test.state === 'passed') {
			detail.setPassed();
			if (test.duration) {
				detail.addDuration(test.duration);
				this._totalDuration += test.duration;
			}
		} else if (test.state === 'skipped' || test.state === 'pending') {
			detail.setSkipped();
			// Set duration to 0 for skipped tests
			detail.setDurationFinal(0).setDurationTotal(0);
		} else {
			detail.setFailed();
			if (test.duration) {
				detail.addDuration(test.duration);
				this._totalDuration += test.duration;
			}
		}
	}

	onTestRetry(test) {
		if (!this._report) return;

		const testId = this._getTestId(test);
		const filePath = this._testFiles.get(testId) || test.file || this.runnerStat?.specs?.[0] || 'unknown';

		if (filePath !== 'unknown' && this._report.ignoreFilePath(filePath)) {
			return;
		}
		const detail = this._report.getDetail(testId);

		detail.incrementRetries();

		if (test.duration) {
			detail.addDuration(test.duration);
			this._totalDuration += test.duration;
		}
	}

	onRunnerEnd(runner) {
		if (!this._report) return;

		const summary = this._report.getSummary();

		summary.setDurationTotal(this._totalDuration);

		const stats = runner.failures > 0 ? 'failed' : 'passed';
		if (stats === 'passed') {
			summary.setPassed();
		} else {
			summary.setFailed();
		}

		this._report
			.finalize()
			.save();

		console.log('[D2L Reporter] Test report saved');
	}
}

module.exports = WebdriverIO;
