import { determineReportPath, ignorePattern, getOperatingSystem, getReportConfiguration, getReportTaxonomy, makeLocation, writeReport } from './helpers.cjs';
import { getContext, hasContext } from '../helpers/github.cjs';
import { randomUUID } from 'crypto';

export function reporter({ reportPath, reportConfigurationPath, verbose } = {}) {
	reportPath = determineReportPath(reportPath);
	verbose = verbose || false;

	const reportConfiguration = getReportConfiguration(reportConfigurationPath);
	const report = {
		reportId: randomUUID(),
		reportVersion: 1,
		summary: {
			operatingSystem: getOperatingSystem(),
			framework: '@web/test-runner',
			countFlaky: 0
		}
	};

	if (hasContext()) {
		const githubContext = getContext();

		report.summary = {
			...report.summary,
			...githubContext
		};
	} else {
		console.log('D2L test report will not contain GitHub context details');
	}

	let testConfig;

	const collectTests = (session, prefix, tests) => {
		const { browser, testFile } = session;
		const location = makeLocation(testFile);

		if (ignorePattern(reportConfiguration, location)) {
			return [];
		}

		const browserName = browser.name.toLowerCase();
		const { type, tool, experience } = getReportTaxonomy(reportConfiguration, location);
		const flattened = [];

		for (const test of tests) {
			const { skipped, passed, duration, name: testName } = test;

			if (verbose) {
				const prefix = `Test '${testName}' at '${location}' is missing`;

				if (!type) {
					console.log(`${prefix} a 'type'`);
				}

				if (!tool) {
					console.log(`${prefix} a 'tool'`);
				}

				if (!experience) {
					console.log(`${prefix} an 'experience'`);
				}
			}

			const testDuration = duration ?? 0;
			let status;

			if (skipped) {
				status = 'skipped';
			} else if (passed) {
				status = 'passed';
			} else {
				status = 'failed';
			}

			flattened.push({
				name: `${prefix}${testName}`,
				duration: testDuration,
				totalDuration: testDuration,
				status,
				location,
				type,
				tool,
				experience,
				retries: 0,
				started: (new Date()).toISOString(),
				browser: browserName
			});
		}

		return flattened;
	};

	const collectSuite = (session, prefix, suite) => {
		const tests = collectTests(session, prefix, suite.tests);

		for (const childSuite of suite.suites) {
			const newPrefix = `${prefix}${childSuite.name} > `;

			tests.push(...collectSuite(session, newPrefix, childSuite));
		}

		return tests;
	};

	const gatherTestInfo = (sessions) => {
		const tests = [];
		let overallPassed = true;

		for (const session of sessions) {
			const { passed, group: { name: groupName } } = session;
			const isGroupName = groupName && testConfig.groups?.some(({ name }) => groupName === name);
			const prefix = isGroupName ? `[${groupName}] > ` : '';

			overallPassed &= passed;

			tests.push(...collectSuite(session, prefix, session.testResults));
		}

		return {
			status: overallPassed ? 'passed' : 'failed',
			details: tests
		};
	};

	return {
		name: 'd2l-test-reporting',
		start({ config, sessions, startTime }) {
			if (sessions.length === 0) {
				return;
			}

			testConfig = config;
			report.summary.started = (new Date(startTime)).toISOString();
		},
		onTestRunFinished({ sessions }) {
			if (sessions.length === 0) {
				return;
			}

			const started = new Date(report.summary.started);
			const ended = new Date();
			const duration = Math.abs(ended - started);
			const { status, details } = gatherTestInfo(sessions);
			const counts = details.reduce(
				(acc, { status }) => {
					switch (status) {
						case 'passed':
							++acc.passed;

							break;
						case 'failed':
							++acc.failed;

							break;
						case 'skipped':
							++acc.skipped;

							break;
					}

					return acc;
				},
				{ passed: 0, failed: 0, skipped: 0 }
			);

			report.summary.status = status;
			report.summary.totalDuration = duration;
			report.summary.countPassed = counts.passed;
			report.summary.countFailed = counts.failed;
			report.summary.countSkipped = counts.skipped;
			report.details = details;

			try {
				writeReport(reportPath, report);

				console.log(`\nD2L test report available at: ${reportPath}\n`);
			} catch {
				console.log('\nFailed to generate D2L test report\n');
			}
		}
	};
}
