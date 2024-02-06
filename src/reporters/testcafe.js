import chalk from 'chalk';
import { Report } from '../helpers/report.cjs';

const { yellow, red, cyan } = chalk;

const makeDetailName = (prefix, name) => {
	return `${prefix} > ${name}`;
};

const makeDetailId = (testId, testRunId) => {
	return `${testId}/${testRunId}`;
};

class TestCafeLogger {
	info(message) { console.log(`\n${message}\n`); }
	warning(message) { this.info(yellow(message)); }
	error(message) { this.info(red(message)); }
	location(message, location) { this.info(`${message}: ${cyan(location)}`); }
}

export default function() {
	const logger = new TestCafeLogger();
	const testExecutionInfo = new Map();
	let report;
	let hasTests;

	return {
		reportTaskStart(startTime, userAgents, testCount) {
			hasTests = testCount !== 0;

			if (!hasTests) {
				return;
			}

			this._summaryStartTime = startTime;

			const options = {
				reportWriter: (reportData) => this.write(reportData)
			};

			report = new Report('testcafe', logger, options);

			report
				.getSummary()
				.addContext()
				.setStarted(startTime.toISOString());
		},

		reportFixtureStart(name, path) {
			this._fixtureName = name;
			this._fixturePath = path;
		},

		reportTestStart(name, meta, testStartInfo) {
			if (!hasTests) {
				return;
			}

			if (report.ignorePattern(this._fixturePath)) {
				return;
			}

			const { testId, startTime } = testStartInfo;

			testExecutionInfo.set(testId, { startTime });
		},

		reportTestDone(name, testRunInfo) {
			if (!hasTests) {
				return;
			}

			if (report.ignorePattern(this._fixturePath)) {
				return;
			}

			const testName = makeDetailName(this._fixtureName, name);
			const { testId, skipped, browsers, durationMs, errs } = testRunInfo;
			const { startTime } = testExecutionInfo.get(testId);
			const browserRunInfo = browsers.map((browser) => {
				const { testRunId, alias, quarantineAttemptsTestRunIds } = browser;
				const browserName = (alias.split(':')[0]).toLowerCase();
				const runs = quarantineAttemptsTestRunIds?.length ?? 1;
				const retries = runs - 1;

				return {
					testRunId,
					browser: browserName,
					retries
				};
			});

			for (const { testRunId, browser, retries } of browserRunInfo) {
				const id = makeDetailId(testId, testRunId);
				const detail = report
					.getDetail(id)
					.setName(testName)
					.setLocation(this._fixturePath)
					.setStarted(startTime.toISOString())
					.setBrowser(browser)
					.addRetries(retries)
					.addDuration(durationMs);

				if (skipped) {
					detail.setSkipped();
				} else if (errs.length === 0) {
					detail.setPassed();
				} else {
					detail.setFailed();
				}
			}
		},

		reportTaskDone(endTime, passed, warnings, result) {
			if (!hasTests) {
				return;
			}

			const duration = endTime - this._summaryStartTime;
			const summary = report
				.getSummary()
				.setTotalDuration(duration);
			const { failedCount } = result;

			if (failedCount === 0) {
				summary.setPassed();
			} else {
				summary.setFailed();
			}

			report
				.finalize()
				.save();
		}
	};
}
