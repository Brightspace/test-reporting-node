const WDIOReporter = require('@wdio/reporter').default;
const { ReportBuilder } = require('../helpers/report-builder.cjs');
const { escapeSpecialCharacters } = require('../helpers/strings.cjs');

class WebdriverIO extends WDIOReporter {
	#baseReportPath;
	#logger;
	#report;
	#reportConfigurationPath;
	#suiteStartTime;
	#testFiles;
	#testStartTimes;
	#totalDuration;
	#verbose;

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

		this.#baseReportPath = options.reportPath || './d2l-test-report.json';
		this.#reportConfigurationPath = options.reportConfigurationPath || './d2l-test-reporting.config.json';
		this.#verbose = options.verbose || false;
		this.#logger = logger;
		this.#report = null;
		this.#testStartTimes = new Map();
		this.#testFiles = new Map();
		this.#suiteStartTime = null;
		this.#totalDuration = 0;
	}

	#getTestId(test) {
		const file = test.file || test.parent || 'unknown';
		const fullName = test.fullTitle || test.title || 'unknown-test';
		return `${file}[${fullName}]`;
	}

	#getPlatformName() {
		const capabilities = this.runnerStat?.capabilities;
		if (!capabilities) return null;

		const platformName = capabilities.platformName || capabilities['appium:platformName'] || capabilities.platform;
		return platformName ? platformName.toLowerCase().trim() : null;
	}

	#makeTestName(test) {
		const platform = this.#getPlatformName();
		let testName = (test.fullTitle || test.title || 'unknown-test');

		testName = testName.split('.').map(part => escapeSpecialCharacters(part.trim())).join(' > ');

		return platform ? `[${platform}] > ${testName}` : testName;
	}

	onRunnerStart(runner) {
		const cid = runner.cid;

		const path = require('path');
		const dir = path.dirname(this.#baseReportPath);
		const ext = path.extname(this.#baseReportPath);
		const base = path.basename(this.#baseReportPath, ext);
		const workerReportPath = path.join(dir, `${base}-${cid}${ext}`);

		try {
			this.#report = new ReportBuilder('webdriverio', this.#logger, {
				reportPath: workerReportPath,
				reportConfigurationPath: this.#reportConfigurationPath,
				verbose: this.#verbose
			});
			console.log('[D2L Reporter] Initialized successfully');
		} catch (error) {
			console.error('[D2L Reporter] Failed to initialize:', error.message);
			this.#report = null;
			return;
		}

		this.#suiteStartTime = new Date().toISOString();

		this.#report
			.getSummary()
			.addContext()
			.setStarted(this.#suiteStartTime);

		console.log(`[D2L Reporter] Test run started (worker ${cid})`);
	}

	onTestStart(test) {
		if (!this.#report) return;

		const filePath = test.file || this.runnerStat?.specs?.[0] || 'unknown';

		if (filePath !== 'unknown' && this.#report.ignoreFilePath(filePath)) {
			return;
		}

		const testId = this.#getTestId(test);
		const startTime = new Date().toISOString();

		this.#testStartTimes.set(testId, startTime);
		this.#testFiles.set(testId, filePath);

		const testName = this.#makeTestName(test);
		const detail = this.#report.getDetail(testId);
		detail
			.setName(testName)
			.setLocationFile(filePath)
			.setStarted(startTime);

		if (test.timeout) {
			detail.setTimeout(test.timeout);
		}
	}

	onTestEnd(test) {
		if (!this.#report) return;

		const testId = this.#getTestId(test);
		let filePath = this.#testFiles.get(testId);

		if (!filePath) {
			filePath = test.file || this.runnerStat?.specs?.[0] || 'unknown';
			this.#testFiles.set(testId, filePath);
		}

		if (filePath !== 'unknown' && this.#report.ignoreFilePath(filePath)) {
			return;
		}

		const detail = this.#report.getDetail(testId);

		if (!this.#testStartTimes.has(testId)) {
			const testName = this.#makeTestName(test);
			const startTime = new Date().toISOString();
			this.#testStartTimes.set(testId, startTime);

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
				this.#totalDuration += test.duration;
			}
		} else if (test.state === 'skipped' || test.state === 'pending') {
			detail.setSkipped();
			detail.setDurationFinal(0).setDurationTotal(0);
		} else {
			detail.setFailed();
			if (test.duration) {
				detail.addDuration(test.duration);
				this.#totalDuration += test.duration;
			}
		}
	}

	onTestRetry(test) {
		if (!this.#report) return;

		const testId = this.#getTestId(test);
		const filePath = this.#testFiles.get(testId) || test.file || this.runnerStat?.specs?.[0] || 'unknown';

		if (filePath !== 'unknown' && this.#report.ignoreFilePath(filePath)) {
			return;
		}
		const detail = this.#report.getDetail(testId);

		detail.incrementRetries();

		if (test.duration) {
			detail.addDuration(test.duration);
			this.#totalDuration += test.duration;
		}
	}

	onRunnerEnd(runner) {
		if (!this.#report) return;

		const summary = this.#report.getSummary();

		summary.setDurationTotal(this.#totalDuration);

		const stats = runner.failures > 0 ? 'failed' : 'passed';
		if (stats === 'passed') {
			summary.setPassed();
		} else {
			summary.setFailed();
		}

		this.#report
			.finalize()
			.save();

		console.log('[D2L Reporter] Test report saved');
	}
}

module.exports = WebdriverIO;
