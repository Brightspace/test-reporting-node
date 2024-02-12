import { createRequire } from 'node:module';
import { colors } from 'playwright-core/lib/utilsBundle';

const require = createRequire(import.meta.url);

const { Report } = require('../helpers/report.cjs');

const { cyan, red, yellow } = colors;

const getRootParent = (test) => {
	if (test.parent && test.parent.parent) {
		return getRootParent(test.parent);
	}

	return test;
};

const getBrowserType = (project) => {
	// won't work for merge-reports workflow, all information under `use` will be undefined
	// hopefully get something included as part of https://github.com/microsoft/playwright/issues/29174
	const {
		use: { browserName, defaultBrowserType } = {},
		metadata: { browserType } = {}
	} = project;

	if (browserType) {
		return browserType;
	}

	if (browserName) {
		return browserName;
	}

	if (defaultBrowserType) {
		return defaultBrowserType;
	}

	return undefined;
};

const makeTestName = (test) => {
	const [, projectName, , ...titles] = test.titlePath();
	const titlePaths = projectName ? [`[${projectName}]`, ...titles] : titles;

	return titlePaths.join(' > ');
};

class PlaywrightLogger {
	info(message) { console.log(`\n${message}\n`); }
	warning(message) { this.info(yellow(message)); }
	error(message) { this.info(red(message)); }
	location(message, location) { this.info(`${message}: ${cyan(location)}`); }
}

export default class Reporter {
	constructor(reporterOptions = {}) {
		this._reporterOptions = reporterOptions;
	}

	onBegin(_, suite) {
		this._hasTests = suite.allTests().length !== 0;

		if (!this._hasTests) {
			return;
		}

		this._logger = new PlaywrightLogger();
		this._report = new Report('playwright', this._logger, this._reporterOptions);

		this._report
			.getSummary()
			.addContext();
	}

	onTestEnd(test, result) {
		const { location: { file } } = test;

		if (this._report.ignorePattern(file)) {
			return;
		}

		const { id } = test;
		const { startTime, retry, status, duration } = result;
		// workaround can be removed if https://github.com/microsoft/playwright/issues/29173 is fixed/released
		// should be able to just do test.parent.project(), need to remove workaround
		const rootParent = getRootParent(test);
		const project = rootParent.project();
		//////////////////////////////////////////////////////////////////////////////////////////////////////
		const browser = getBrowserType(project);
		const name = makeTestName(test);
		const detail = this._report
			.getDetail(id)
			.setName(name)
			.setLocation(file)
			.setStarted(startTime)
			.setBrowser(browser)
			.addDuration(Math.round(duration));

		if (retry > 0) {
			detail.incrementRetries();
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
		if (!this._hasTests) {
			return;
		}

		const { startTime, duration, status } = result;

		const summary = this._report
			.getSummary()
			.setStarted(startTime)
			.setTotalDuration(Math.round(duration));

		if (status === 'passed') {
			summary.setPassed();
		} else {
			summary.setFailed();
		}
	}

	async onExit() {
		if (!this._hasTests) {
			return;
		}

		this._report.finalize();
		this._report.save();
	}
}
