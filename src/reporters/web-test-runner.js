import { Report } from '../helpers/report.cjs';

class WebTestRunnerLogger {
	info(message) { console.log(`\n${message}\n`); }
	warning(message) { this.info(message); }
	error(message) { this.info(message); }
	location(message, location) { this.info(`${message}: ${location}`); }
}

const makeDetailName = (prefix, testName) => {
	return `${prefix}${testName}`;
};

const makeDetailId = (sessionId, file, name) => {
	return `${sessionId}/${file}/${name}`;
};

export function reporter(options = {}) {
	const logger = new WebTestRunnerLogger();
	const report = new Report('@web/test-runner', logger, options);
	const summary = report
		.getSummary()
		.addContext();
	let overallStarted;
	let testConfig;

	const collectTests = (session, prefix, tests) => {
		const { id: sessionId, browser: { name: browserName }, testFile } = session;

		if (report.ignorePattern(testFile)) {
			return;
		}

		const browser = browserName.toLowerCase();

		for (const test of tests) {
			const { skipped, passed, duration, name } = test;
			const testName = makeDetailName(prefix, name);
			const id = makeDetailId(sessionId, testFile, testName);
			const detail = report
				.getDetail(id)
				.setName(testName)
				.setLocation(testFile)
				.setStarted((new Date()).toISOString())
				.setBrowser(browser);

			if (passed) {
				detail.setPassed();
			} else if (skipped) {
				detail.setSkipped();
			} else {
				detail.setFailed();
			}

			if (duration !== undefined) {
				detail.addDuration(duration);
			}
		}
	};

	const collectSuite = (session, prefix, suite) => {
		collectTests(session, prefix, suite.tests);

		for (const childSuite of suite.suites) {
			const newPrefix = `${prefix}${childSuite.name} > `;

			collectSuite(session, newPrefix, childSuite);
		}
	};

	const gatherTestInfo = (sessions) => {
		let overallPassed = true;

		for (const session of sessions) {
			const { passed, group: { name: groupName }, testResults } = session;
			const isGroupName = groupName && testConfig.groups?.some(({ name }) => groupName === name);
			const prefix = isGroupName ? `[${groupName}] > ` : '';

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

			summary.setTotalDuration(duration);

			gatherTestInfo(sessions);

			report.finalize();
			report.save();
		}
	};
}
