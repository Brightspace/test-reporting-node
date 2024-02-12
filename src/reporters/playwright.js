import { createRequire } from 'node:module';
import { colors } from 'playwright-core/lib/utilsBundle';
import { randomUUID } from 'node:crypto';

const require = createRequire(import.meta.url);

const { determineReportPath, getOperatingSystem, getReportConfiguration, getReportTaxonomy, makeLocation, writeReport, ignorePattern } = require('./helpers.cjs');
const { getContext, hasContext } = require('../helpers/github.cjs');

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

const convertEndStateSummary = (state) => {
	if (!['passed', 'failed'].includes(state)) {
		return 'failed';
	}

	return state;
};

const convertEndStateDetails = (state) => {
	if (!['passed', 'failed', 'skipped'].includes(state)) {
		return 'failed';
	}

	return state;
};

const makeTestName = (test) => {
	const [, projectName, , ...titles] = test.titlePath();
	const titlePaths = projectName ? [`[${projectName}]`, ...titles] : titles;

	return titlePaths.join(' > ');
};

const logWarning = (message) => console.log(yellow(message));

const logError = (message) => console.log(red(message));

export default class Reporter {
	constructor({ reportPath, reportConfigurationPath, verbose } = {}) {
		this._verbose = verbose || false;
		this._reportPath = determineReportPath(reportPath);
		this._reportConfiguration = getReportConfiguration(reportConfigurationPath);
		this._report = {
			reportId: randomUUID(),
			reportVersion: 1,
			summary: {
				operatingSystem: getOperatingSystem(),
				framework: 'playwright'
			}
		};
		this._tests = new Map();
	}

	onBegin(config, suite) {
		this._hasTests = suite.allTests().length !== 0;

		if (!this._hasTests) {
			return;
		}

		if (hasContext()) {
			const githubContext = getContext();

			this._report.summary = {
				...this._report.summary,
				...githubContext
			};
		} else {
			logWarning('\nD2L test report will not contain GitHub context details\n');
		}
	}

	onTestEnd(test, result) {
		const { id, location: { file } } = test;
		const location = makeLocation(file);

		if (ignorePattern(this._reportConfiguration, location)) {
			return;
		}

		const { startTime, retry, status, duration } = result;
		const values = this._tests.get(id) ?? {};

		values.name = makeTestName(test);
		values.started = values.started ?? startTime;
		values.location = values.location ?? location;
		values.retries = retry;
		values.status = convertEndStateDetails(status);
		values.duration = duration;
		values.totalDuration = values.totalDuration === undefined ? duration : values.totalDuration + duration;

		if (values.browser === undefined) {
			// workaround can be removed if https://github.com/microsoft/playwright/issues/29173 is fixed/released
			const rootParent = getRootParent(test);
			// should be able to just do test.parent.project(), need to remove workaround
			const project = rootParent.project();

			values.browser = getBrowserType(project);
		}

		if (!values.type || !values.tool || !values.experience) {
			const { type, tool, experience } = getReportTaxonomy(this._reportConfiguration, values.location);

			values.type = values.type ?? type;
			values.tool = values.tool ?? tool;
			values.experience = values.experience ?? experience;
		}

		this._tests.set(id, values);
	}

	onEnd(result) {
		const { startTime, duration, status } = result;

		this._report.summary.started = startTime;
		this._report.summary.totalDuration = Math.round(duration);
		this._report.summary.status = convertEndStateSummary(status);

		let countPassed = 0;
		let countFailed = 0;
		let countSkipped = 0;
		let countFlaky = 0;

		this._report.details = [...this._tests].map(([, values]) => {
			if (this._verbose) {
				const { name, location, type, tool, experience } = values;
				const prefix = `Test '${name}' at '${location}' is missing`;

				if (!type) {
					logWarning(`${prefix} a 'type'`);
				}

				if (!tool) {
					logWarning(`${prefix} a 'tool'`);
				}

				if (!experience) {
					logWarning(`${prefix} an 'experience'`);
				}
			}

			values.duration = Math.round(values.duration);
			values.totalDuration = Math.round(values.totalDuration);

			if (values.status === 'passed') {
				if (values.retries !== 0) {
					countFlaky++;
				} else {
					countPassed++;
				}
			} else if (values.status === 'failed') {
				countFailed++;
			} else if (values.status === 'skipped') {
				countSkipped++;
			}

			return { ...values };
		});

		this._report.summary.countPassed = countPassed;
		this._report.summary.countFailed = countFailed;
		this._report.summary.countSkipped = countSkipped;
		this._report.summary.countFlaky = countFlaky;
	}

	async onExit() {
		if (!this._hasTests) {
			return;
		}

		try {
			writeReport(this._reportPath, this._report);

			console.log(`\nD2L test report available at: ${cyan(this._reportPath)}\n`);
		} catch {
			logError('\nFailed to generate D2L test report\n');
		}
	}
}
