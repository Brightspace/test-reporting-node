const { basename, dirname, extname, join } = require('node:path');
const WDIOReporter = require('@wdio/reporter').default;
const { ReportBuilder } = require('../helpers/report-builder.cjs');
const { escapeSpecialCharacters } = require('../helpers/strings.cjs');
const { getNowISOString } = require('../helpers/system.cjs');

const makeDetailId = (file, fullTitle) => {
	return `${file}[${fullTitle}]`;
};

const isBeforeHook = (title) => {
	return /\bbefore (all|each)\b/.test(title ?? '');
};

class WebdriverIOLogger {
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
		this.info(`[D2L Reporter] ${message}: ${location}`);
	}
}

class WebdriverIO extends WDIOReporter {
	#logger;
	#options;
	#report;
	#suiteStack;

	constructor(options) {
		super({
			...options,
			stdout: false
		});

		this.#logger = new WebdriverIOLogger();
		this.#options = {
			reportPath: options.reportPath ?? './d2l-test-report.json',
			reportConfigurationPath: options.reportConfigurationPath ?? './d2l-test-reporting.config.json',
			verbose: options.verbose ?? false
		};
		this.#report = null;
		this.#suiteStack = [];
	}

	#getActiveSuite() {
		return this.#suiteStack[this.#suiteStack.length - 1] ?? null;
	}

	#getPlatformName() {
		const capabilities = this.runnerStat?.capabilities;

		if (!capabilities) {
			return null;
		}

		const platformName = capabilities.platformName ?? capabilities['appium:platformName'] ?? capabilities.platform;

		return platformName ? platformName.toLowerCase().trim() : null;
	}

	#makeTestName(fullTitle) {
		const platform = this.#getPlatformName();
		const name = fullTitle
			.split('.')
			.map(part => escapeSpecialCharacters(part.trim()))
			.join(' > ');

		return platform ? `[${platform}] > ${name}` : name;
	}

	#openDetail(suite, test) {
		const id = makeDetailId(suite.file, test.fullTitle);
		const detail = this.#report
			.getDetail(id)
			.setName(this.#makeTestName(test.fullTitle))
			.setLocationFile(suite.file)
			.setStarted(getNowISOString());

		if (test.timeout) {
			detail.setTimeout(test.timeout);
		}

		return detail;
	}

	#detailFor(test) {
		const suite = this.#getActiveSuite();

		if (!suite || suite.ignored) {
			return null;
		}

		return this.#report.getDetail(makeDetailId(suite.file, test.fullTitle));
	}

	onRunnerStart(runner) {
		const { cid } = runner;
		const { reportPath, reportConfigurationPath, verbose } = this.#options;
		const dir = dirname(reportPath);
		const ext = extname(reportPath);
		const base = basename(reportPath, ext);
		const workerReportPath = join(dir, `${base}-${cid}${ext}`);

		try {
			this.#report = new ReportBuilder('webdriverio', this.#logger, {
				reportPath: workerReportPath,
				reportConfigurationPath,
				verbose
			});
		} catch ({ message }) {
			this.#logger.error('Failed to initialize D2L test report builder, report will not be generated');
			this.#logger.error(message);
			this.#report = null;

			return;
		}

		this.#report
			.getSummary()
			.addContext()
			.setStarted(getNowISOString());
	}

	onSuiteStart(suite) {
		if (!this.#report) {
			return;
		}

		const file = suite.file ?? this.runnerStat?.specs?.[0];
		const ignored = !file || this.#report.ignoreFilePath(file);

		this.#suiteStack.push({ file, ignored });
	}

	onSuiteEnd(suite) {
		if (!this.#report) {
			return;
		}

		const frame = this.#getActiveSuite();

		if (frame && !frame.ignored) {
			const failedBeforeHooks = (suite.hooks ?? []).filter(hook =>
				hook.state === 'failed' && isBeforeHook(hook.title)
			);

			if (failedBeforeHooks.length !== 0) {
				const tests = suite.tests?.length ? suite.tests : failedBeforeHooks
					.filter(hook => hook.currentTest)
					.map(hook => ({
						fullTitle: `${suite.fullTitle}.${hook.currentTest}`
					}));

				for (const test of tests) {
					const fullTitle = test.fullTitle ?? `${suite.fullTitle}.${test.title}`;
					const detail = this.#report.getDetail(makeDetailId(frame.file, fullTitle));

					if (!detail.getStatus()) {
						detail
							.setName(this.#makeTestName(fullTitle))
							.setLocationFile(frame.file)
							.setStarted(getNowISOString())
							.addDuration(0)
							.setFailed();
					}
				}
			}
		}

		this.#suiteStack.pop();
	}

	onTestStart(test) {
		const suite = this.#getActiveSuite();

		if (!suite || suite.ignored) {
			return;
		}

		this.#openDetail(suite, test);
	}

	onTestEnd(test) {
		const suite = this.#getActiveSuite();

		if (!suite || suite.ignored) {
			return;
		}

		const detail = this.#openDetail(suite, test);

		if (test.state === 'passed') {
			detail
				.setPassed()
				.addDuration(test.duration ?? 0);
		} else if (test.state === 'skipped' || test.state === 'pending') {
			detail
				.setSkipped()
				.setDurationFinal(0)
				.setDurationTotal(0);
		} else {
			detail
				.setFailed()
				.addDuration(test.duration ?? 0);
		}
	}

	onTestRetry(test) {
		const detail = this.#detailFor(test);

		if (!detail) {
			return;
		}

		detail
			.incrementRetries()
			.addDuration(test.duration ?? 0);
	}

	onRunnerEnd(runner) {
		if (!this.#report) {
			this.#logger.error('D2L test report was not generated due to initialization failure');

			return;
		}

		const summary = this.#report
			.getSummary()
			.setDurationTotal(runner.duration ?? 0);

		if (runner.failures > 0) {
			summary.setFailed();
		} else {
			summary.setPassed();
		}

		this.#report
			.finalize()
			.save();
	}
}

module.exports = WebdriverIO;
