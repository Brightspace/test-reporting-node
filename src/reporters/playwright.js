import { createRequire } from 'node:module';
import { colors } from 'playwright-core/lib/utilsBundle';

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

	return titlePaths.join(' > ');
};

const getBrowser = (project) => {
	const {
		use: { browserName, defaultBrowserType } = {},
		metadata: { browser } = {}
	} = project;

	if (browser) {
		return browser;
	}

	if (browserName) {
		return browserName;
	}

	if (defaultBrowserType) {
		return defaultBrowserType;
	}

	return undefined;
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

		const { id } = test;
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

		if (retry !== 0) {
			detail.incrementRetries();
		}

		const browser = getBrowser(project);

		if (browser !== undefined) {
			detail.setBrowser(browser);
		}

		if (status === 'passed') {
			detail.setPassed({ override: true });
		} else if (status === 'skipped') {
			detail.setSkipped({ override: true });
		} else {
			detail.setFailed({ override: true });
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

	async onExit() {
		if (!this._report || !this._hasTests) {
			return;
		}

		this._report.save();
	}
}
