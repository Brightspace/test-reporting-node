import { createRequire } from 'node:module';
import { colors } from 'playwright-core/lib/utilsBundle';
import { escapeSpecialCharacters } from '../helpers/strings.cjs';

const require = createRequire(import.meta.url);

const { ReportBuilder } = require('../helpers/report-builder.cjs');

const { cyan, red, yellow } = colors;

class PlaywrightLogger {
	info(message) { console.log(`\n${message}\n`); }
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

const getBrowser = (project) => {
	const { name, use: { browserName, defaultBrowserType } = {} } = project;
	const browser = (browserName ?? defaultBrowserType ?? name)?.trim().toLowerCase();

	if (ReportBuilder.SupportedBrowsers.includes(browser)) {
		return browser;
	}

	return null;
};

export default class Reporter {
	constructor(options = {}) {
		this._options = options;
	}

	onBegin(_, suite) {
		this._hasTests = suite.allTests().length !== 0;

		if (!this._hasTests) {
			return;
		}

		this._logger = new PlaywrightLogger();

		try {
			this._report = new ReportBuilder('playwright', this._logger, this._options);
		} catch ({ message }) {
			this._logger.error('Failed to initialize D2L test report builder, report will not be generated');
			this._logger.error(message);

			return;
		}

		this._report
			.getSummary()
			.addContext();
	}

	onTestEnd(test, result) {
		if (!this._report || !this._hasTests) {
			return;
		}

		const { timeout, location: { file, line, column } } = test;

		if (this._report.ignoreFilePath(file)) {
			return;
		}

		const { id, expectedStatus } = test;
		const { startTime, retry, status, duration } = result;
		const project = test.parent.project();
		const name = makeTestName(test);
		const detail = this._report
			.getDetail(id)
			.setName(name)
			.setLocationFile(file)
			.setLocationLine(line)
			.setLocationColumn(column)
			.setStarted(startTime)
			.setTimeout(Math.round(timeout))
			.addDuration(Math.round(duration));
		const isRetry = retry !== 0;

		if (isRetry) {
			detail.incrementRetries();
		}

		const browser = getBrowser(project);

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
	}

	onEnd(result) {
		if (!this._report || !this._hasTests) {
			return;
		}

		const { startTime, duration, status } = result;
		const summary = this._report
			.getSummary()
			.setStarted(startTime)
			.setDurationTotal(Math.round(duration));

		if (status === 'passed') {
			summary.setPassed();
		} else {
			summary.setFailed();
		}

		this._report.finalize();
	}

	onExit() {
		if (!this._report || !this._hasTests) {
			return;
		}

		this._report.save();
	}
}
