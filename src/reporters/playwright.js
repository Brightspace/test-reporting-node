import { createRequire } from 'node:module';
import { colors } from 'playwright-core/lib/utilsBundle';
import { escapeSpecialCharacters } from '../helpers/strings.cjs';
import { getNowISOString } from '../helpers/system.cjs';

const require = createRequire(import.meta.url);

const { ReportBuilder } = require('../helpers/report-builder.cjs');

const { cyan, red, yellow } = colors;

class PlaywrightLogger {
	info(message) {
		const lines = `${message}`.split(/\r?\n/u);

		for (const line of lines) {
			console.log(`\n${line}\n`);
		}
	}

	warning(message) { this.info(yellow(message)); }
	error(message) { this.info(red(message)); }
	location(message, location) { this.info(`${message}: ${cyan(location)}`); }
}

const makeTestName = (test) => {
	const [, projectName, , ...titles] = test.titlePath();
	const titlePaths = projectName ? [`[${projectName}]`, ...titles] : titles;

	return titlePaths
		.map(titlePart => escapeSpecialCharacters(titlePart).trim())
		.join(' > ');
};

const getBrowser = (project, logger) => {
	const { name, use: { browserName, defaultBrowserType } = {} } = project;
	const browser = (browserName ?? defaultBrowserType ?? name)?.trim().toLowerCase();

	if (ReportBuilder.SupportedBrowsers.includes(browser)) {
		return browser;
	}

	if (browser) {
		logger.warning(`Unsupported browser '${browser}', omitting from test report detail`);
	}

	return null;
};

export default class Reporter {
	#hasTests;
	#logger;
	#options;
	#report;
	#testStarted;

	constructor(options = {}) {
		this.#options = options;
	}

	onBegin(_, suite) {
		this.#hasTests = suite.allTests().length !== 0;

		if (!this.#hasTests) {
			return;
		}

		this.#logger = new PlaywrightLogger();
		this.#testStarted = new Map();

		try {
			this.#report = new ReportBuilder('playwright', this.#logger, this.#options);
		} catch ({ message }) {
			this.#logger.error('Failed to initialize D2L test report builder, report will not be generated');
			this.#logger.error(message);
			this.#report = null;

			return;
		}

		this.#report
			.getSummary()
			.addContext();
	}

	onTestBegin(test) {
		if (!this.#report || !this.#hasTests) {
			return;
		}

		const { id, location: { file } } = test;

		if (this.#report.ignoreFilePath(file)) {
			return;
		}

		this.#testStarted.set(id, getNowISOString());
	}

	onTestEnd(test, result) {
		if (!this.#report || !this.#hasTests) {
			return;
		}

		const { timeout, location: { file, line, column } } = test;

		if (this.#report.ignoreFilePath(file)) {
			return;
		}

		const { id, expectedStatus } = test;
		const { retry, status, duration } = result;
		const project = test.parent.project();
		const name = makeTestName(test);
		const started = this.#testStarted.get(id) ?? getNowISOString();
		const detail = this.#report
			.getDetail(id)
			.setName(name)
			.setLocationFile(file)
			.setLocationLine(line)
			.setLocationColumn(column)
			.setStarted(started)
			.setTimeout(Math.round(timeout))
			.addDuration(Math.round(duration));
		const isRetry = retry !== 0;

		if (isRetry) {
			detail.incrementRetries();
		}

		const browser = getBrowser(project, this.#logger);

		if (browser) {
			detail.setBrowser(browser);
		}

		if (status === 'skipped') {
			detail.setSkipped({ override: isRetry });
		} else if (expectedStatus !== status) {
			detail.setFailed({ override: isRetry });
		} else {
			detail.setPassed({ override: isRetry });
		}

		this.#testStarted.delete(id);
	}

	onEnd(result) {
		if (!this.#report || !this.#hasTests) {
			return;
		}

		const { startTime, duration, status } = result;
		const summary = this.#report
			.getSummary()
			.setStarted(startTime.toISOString())
			.setDurationTotal(Math.round(duration));

		if (status === 'passed') {
			summary.setPassed();
		} else {
			summary.setFailed();
		}

		this.#report.finalize();
	}

	onExit() {
		if (!this.#report || !this.#hasTests) {
			if (this.#hasTests && !this.#report) {
				this.#logger.error('D2L test report was not generated due to initialization failure');
			}

			return;
		}

		this.#report.save();
	}
}
