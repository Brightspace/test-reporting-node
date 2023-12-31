import { generateReportOutput, getOperatingSystem, makeLocation } from './helpers.cjs';
import { getContext, hasContext } from '../helpers/github.cjs';
import { colors } from 'playwright-core/lib/utilsBundle';
import { randomUUID } from 'crypto';
import { resolve } from 'path';
import { writeFile } from 'fs/promises';

const { cyan, red, yellow } = colors;

const getProject = (config, test) => {
	const { projects } = config;
	const [, projectName] = test.titlePath();

	return projects.find(({ name }) => name === projectName);
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
	const titlePaths = projectName ? [projectName, ...titles] : titles;

	return titlePaths.join(' > ');
};

const logWarn = (message) => console.log(yellow(`\n${message}\n`));

const logError = (message) => console.log(red(`\n${message}\n`));

export default class Reporter {
	constructor({ reportPath } = {}) {
		this._reportPath = reportPath ?? './d2l-test-report.json';
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
		this._config = config;

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
			logWarn('D2L test report will not contain GitHub context details');
		}
	}

	onTestEnd(test, result) {
		const { startTime, retry, status, duration } = result;
		const { id, location: { file } } = test;
		const values = this._tests.get(id) ?? {};

		values.name = makeTestName(test);
		values.started = values.started ?? startTime;
		values.location = values.location ?? makeLocation(file);
		values.retries = retry;
		values.status = convertEndStateDetails(status);
		values.duration = duration;
		values.totalDuration = values.totalDuration === undefined ?
			duration :
			values.totalDuration + duration;

		if (values.browser === undefined) {
			const { use: { defaultBrowserType } } = getProject(this._config, test);

			values.browser = defaultBrowserType;
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
			values.duration = Math.round(values.duration);
			values.totalDuration = Math.round(values.totalDuration);

			if (values.status === 'passed') {
				countPassed++;
			} else if (values.status === 'failed') {
				countFailed++;
			} else if (values.status === 'skipped') {
				countSkipped++;
			}

			if (values.retries !== 0) {
				countFlaky++;
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
			const reportOutput = generateReportOutput(this._report);
			const filePath = resolve(this._reportPath);

			await writeFile(filePath, reportOutput, 'utf8');

			console.log(`\nD2L test report available at: ${cyan(filePath)}\n`);
		} catch {
			logError('\nFailed to generate D2L test report');
		}
	}
}
