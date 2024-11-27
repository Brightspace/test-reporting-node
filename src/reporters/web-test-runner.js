import chalk from 'chalk';
import { escapeSpecialCharacters } from '../helpers/strings.cjs';
import { ReportBuilder } from '../helpers/report-builder.cjs';
import { SESSION_STATUS } from '@web/test-runner-core';

const { yellow, red, cyan, bold } = chalk;

class WebTestRunnerLogger {
	info(message) { console.log(`\n${message}\n`); }
	warning(message) { this.info(yellow(bold(message))); }
	error(message) { this.info(red(bold(message))); }
	location(message, location) { this.info(`${message}: ${cyan(bold(location))}`); }
}

const sanitizeName = (name) => {
	return escapeSpecialCharacters(name).trim();
};

const makeDetailName = (prefix, testName) => {
	return `${prefix}${sanitizeName(testName)}`;
};

const makeDetailId = (sessionId, file, name) => {
	return `${sessionId}/${file}/${name}`;
};

const nullReporter = {
	start() {},
	stop() {}
};

export function reporter(options = {}) {
	let overallStarted;
	let testConfig;
	const sessionStarts = new Map();
	const logger = new WebTestRunnerLogger();
	let report;

	try {
		report = new ReportBuilder('@web/test-runner', logger, options);
	} catch ({ message }) {
		logger.error('Failed to initialize D2L test report builder, report will not be generated');
		logger.error(message);

		return nullReporter;
	}

	const summary = report
		.getSummary()
		.addContext();

	const collectTests = (session, prefix, tests) => {
		const { id: sessionId, browser: { name: browserName }, testFile } = session;
		const started = sessionStarts.get(sessionId) ?? (new Date()).toISOString();

		if (report.ignoreFilePath(testFile)) {
			return;
		}

		const browser = browserName.toLowerCase();
		const { testsFinishTimeout } = testConfig;

		for (const test of tests) {
			const { skipped, passed, duration, name } = test;
			const testName = makeDetailName(prefix, name);
			const id = makeDetailId(sessionId, testFile, testName);
			const detail = report
				.getDetail(id)
				.setName(testName)
				.setLocationFile(testFile)
				.setStarted(started)
				.setBrowser(browser)
				.setTimeout(testsFinishTimeout);

			if (passed) {
				detail.setPassed();
			} else if (skipped) {
				detail.setSkipped();
			} else {
				detail.setFailed();
			}

			if (duration !== undefined) {
				detail.addDuration(duration);
			} else {
				detail
					.setDurationFinal(0)
					.setDurationTotal(0);
			}
		}
	};

	const collectSuite = (session, prefix, suite) => {
		if (!suite) {
			return;
		}

		collectTests(session, prefix, suite.tests);

		for (const childSuite of suite.suites) {
			const newPrefix = `${prefix}${sanitizeName(childSuite.name)} > `;

			collectSuite(session, newPrefix, childSuite);
		}
	};

	const gatherTestInfo = (sessions) => {
		let overallPassed = true;

		for (const session of sessions) {
			const { passed, group: { name: groupName }, testResults } = session;
			const isGroupName = groupName && testConfig.groups?.some(({ name }) => groupName === name);
			const prefix = isGroupName ? `[${sanitizeName(groupName)}] > ` : '';

			overallPassed &= passed;

			collectSuite(session, prefix, testResults);
		}

		if (overallPassed) {
			summary.setPassed();
		} else {
			summary.setFailed();
		}
	};

	return {
		name: 'd2l-test-reporting',
		start({ config, sessions, startTime }) {
			if (sessions.length === 0) {
				return;
			}

			overallStarted = (new Date(startTime)).toISOString();
			testConfig = config;

			summary.setStarted(overallStarted);
		},
		onTestRunFinished({ sessions }) {
			if (sessions.length === 0) {
				return;
			}

			const started = new Date(overallStarted);
			const ended = new Date();
			const duration = Math.abs(ended - started);

			summary.setDurationTotal(duration);

			gatherTestInfo(sessions);

			report.finalize();
		},
		getTestProgress({ sessions }) {
			for (const session of sessions) {
				const { id, status } = session;

				switch (status) {
					case SESSION_STATUS.SCHEDULED:
					case SESSION_STATUS.INITIALIZING:
					case SESSION_STATUS.TEST_STARTED:
						sessionStarts.set(id, (new Date()).toISOString());

						break;
					case SESSION_STATUS.TEST_FINISHED:
					case SESSION_STATUS.FINISHED:
					default:
						if (!sessionStarts.has(id)) {
							sessionStarts.set(id, (new Date()).toISOString());
						}

						break;
				}
			}
		},
		stop() {
			report.save();
		}
	};
}
