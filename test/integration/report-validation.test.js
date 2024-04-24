import { expect, use } from 'chai';
import chaiSubset from 'chai-subset';
import { getOperatingSystemType } from '../../src/helpers/system.cjs';
import { hasContext } from '../../src/helpers/github.cjs';
import { readFile } from 'node:fs/promises';
import { validateReport } from '../../src/helpers/report.cjs';

use(chaiSubset);

const dummyContext = {
	githubOrganization: 'TestOrganization',
	githubRepository: 'test-repository',
	githubWorkflow: 'test-workflow.yml',
	githubRunId: 12345,
	githubRunAttempt: 1,
	gitBranch: 'test/branch',
	gitSha: '0000000000000000000000000000000000000000'
};
const partialReportMocha = {
	reportVersion: 1,
	summary: {
		status: 'failed',
		framework: 'mocha',
		countPassed: 2,
		countFailed: 2,
		countSkipped: 2,
		countFlaky: 2
	},
	details: [{
		name: 'reporter tests 1 > test',
		status: 'passed',
		location: 'test/integration/data/mocha-1.test.js',
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: 'reporter tests 1 > skipped test',
		status: 'skipped',
		location: 'test/integration/data/mocha-1.test.js',
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: 'reporter tests 1 > flaky test',
		status: 'passed',
		location: 'test/integration/data/mocha-1.test.js',
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 2
	}, {
		name: 'reporter tests 1 > failed test',
		status: 'failed',
		location: 'test/integration/data/mocha-1.test.js',
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 3
	}, {
		name: 'reporter tests 2 > test',
		status: 'passed',
		location: 'test/integration/data/mocha-2.test.js',
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'reporter tests 2 > skipped test',
		status: 'skipped',
		location: 'test/integration/data/mocha-2.test.js',
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'reporter tests 2 > flaky test',
		status: 'passed',
		location: 'test/integration/data/mocha-2.test.js',
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: 'reporter tests 2 > failed test',
		status: 'failed',
		location: 'test/integration/data/mocha-2.test.js',
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 3
	}]
};
const partialReportPlaywright = {
	reportVersion: 1,
	summary: {
		status: 'failed',
		framework: 'playwright',
		countPassed: 5,
		countFailed: 5,
		countSkipped: 5,
		countFlaky: 5
	},
	details: [{
		name: '[chromium] > reporter tests 1 > skipped test',
		status: 'skipped',
		location: 'test/integration/data/playwright-1.test.js',
		browser: 'chromium',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter tests 2 > skipped test',
		status: 'skipped',
		location: 'test/integration/data/playwright-2.test.js',
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[firefox] > reporter tests 2 > skipped test',
		status: 'skipped',
		location: 'test/integration/data/playwright-2.test.js',
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[chromium] > reporter tests 1 > test',
		status: 'passed',
		location: 'test/integration/data/playwright-1.test.js',
		browser: 'chromium',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter tests 2 > test',
		status: 'passed',
		location: 'test/integration/data/playwright-2.test.js',
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[chromium] > reporter tests 1 > failed test',
		status: 'failed',
		location: 'test/integration/data/playwright-1.test.js',
		browser: 'chromium',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 3
	}, {
		name: '[firefox] > reporter tests 2 > test',
		status: 'passed',
		location: 'test/integration/data/playwright-2.test.js',
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter tests 1 > skipped test',
		status: 'skipped',
		location: 'test/integration/data/playwright-1.test.js',
		browser: 'webkit',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter tests 2 > failed test',
		status: 'failed',
		location: 'test/integration/data/playwright-2.test.js',
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 3
	}, {
		name: '[firefox] > reporter tests 2 > failed test',
		status: 'failed',
		location: 'test/integration/data/playwright-2.test.js',
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 3
	}, {
		name: '[webkit] > reporter tests 1 > test',
		status: 'passed',
		location: 'test/integration/data/playwright-1.test.js',
		browser: 'webkit',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[webkit] > reporter tests 1 > failed test',
		status: 'failed',
		location: 'test/integration/data/playwright-1.test.js',
		browser: 'webkit',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 3
	}, {
		name: '[chromium] > reporter tests 1 > flaky test',
		status: 'passed',
		location: 'test/integration/data/playwright-1.test.js',
		browser: 'chromium',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: '[chromium] > reporter tests 2 > flaky test',
		status: 'passed',
		location: 'test/integration/data/playwright-2.test.js',
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 2
	}, {
		name: '[webkit] > reporter tests 1 > flaky test',
		status: 'passed',
		location: 'test/integration/data/playwright-1.test.js',
		browser: 'webkit',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: '[webkit] > reporter tests 2 > skipped test',
		status: 'skipped',
		location: 'test/integration/data/playwright-2.test.js',
		browser: 'webkit',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[firefox] > reporter tests 2 > flaky test',
		status: 'passed',
		location: 'test/integration/data/playwright-2.test.js',
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 2
	}, {
		name: '[webkit] > reporter tests 2 > test',
		status: 'passed',
		location: 'test/integration/data/playwright-2.test.js',
		browser: 'webkit',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter tests 2 > failed test',
		status: 'failed',
		location: 'test/integration/data/playwright-2.test.js',
		browser: 'webkit',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 3
	}, {
		name: '[webkit] > reporter tests 2 > flaky test',
		status: 'passed',
		location: 'test/integration/data/playwright-2.test.js',
		browser: 'webkit',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 2
	}]
};
const partialReportWebTestRunner = {
	reportVersion: 1,
	summary: {
		status: 'failed',
		framework: '@web/test-runner',
		countPassed: 4,
		countFailed: 4,
		countSkipped: 4,
		countFlaky: 0
	},
	details: [{
		name: 'reporter tests 1 > test',
		status: 'passed',
		location: 'test/integration/data/web-test-runner-1.test.js',
		browser: 'chrome',
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'reporter tests 1 > skipped test',
		status: 'skipped',
		location: 'test/integration/data/web-test-runner-1.test.js',
		browser: 'chrome',
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'reporter tests 1 > failed test',
		status: 'failed',
		location: 'test/integration/data/web-test-runner-1.test.js',
		browser: 'chrome',
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[group 1] > reporter tests 2 > test',
		status: 'passed',
		location: 'test/integration/data/web-test-runner-2.test.js',
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter tests 2 > skipped test',
		status: 'skipped',
		location: 'test/integration/data/web-test-runner-2.test.js',
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter tests 2 > failed test',
		status: 'failed',
		location: 'test/integration/data/web-test-runner-2.test.js',
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter tests 2 > test',
		status: 'passed',
		location: 'test/integration/data/web-test-runner-2.test.js',
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter tests 2 > skipped test',
		status: 'skipped',
		location: 'test/integration/data/web-test-runner-2.test.js',
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter tests 2 > failed test',
		status: 'failed',
		location: 'test/integration/data/web-test-runner-2.test.js',
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 2] > reporter tests 1 > test',
		status: 'passed',
		location: 'test/integration/data/web-test-runner-1.test.js',
		browser: 'webkit',
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[group 2] > reporter tests 1 > skipped test',
		status: 'skipped',
		location: 'test/integration/data/web-test-runner-1.test.js',
		browser: 'webkit',
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[group 2] > reporter tests 1 > failed test',
		status: 'failed',
		location: 'test/integration/data/web-test-runner-1.test.js',
		browser: 'webkit',
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}]
};
const partialReportTestCafe = {
	reportVersion: 1,
	summary: {
		status: 'failed',
		framework: 'testcafe',
		countPassed: 6,
		countFailed: 6,
		countSkipped: 6,
		countFlaky: 6
	},
	details: [
		{
			name: 'fixture 1 > test',
			status: 'passed',
			location: 'test/integration/data/testcafe-1.test.js',
			browser: 'firefox',
			tool: 'TestCafe 1 Test Reporting',
			experience: 'Test Framework',
			type: 'ui',
			retries: 0
		}, {
			name: 'fixture 1 > test',
			status: 'passed',
			location: 'test/integration/data/testcafe-1.test.js',
			browser: 'chrome',
			tool: 'TestCafe 1 Test Reporting',
			experience: 'Test Framework',
			type: 'ui',
			retries: 0
		}, {
			name: 'fixture 1 > test',
			status: 'passed',
			location: 'test/integration/data/testcafe-1.test.js',
			browser: 'edge',
			tool: 'TestCafe 1 Test Reporting',
			experience: 'Test Framework',
			type: 'ui',
			retries: 0
		}, {
			name: 'fixture 1 > skipped test',
			status: 'skipped',
			location: 'test/integration/data/testcafe-1.test.js',
			browser: 'firefox',
			tool: 'TestCafe 1 Test Reporting',
			experience: 'Test Framework',
			type: 'ui',
			retries: 0
		}, {
			name: 'fixture 1 > skipped test',
			status: 'skipped',
			location: 'test/integration/data/testcafe-1.test.js',
			browser: 'chrome',
			tool: 'TestCafe 1 Test Reporting',
			experience: 'Test Framework',
			type: 'ui',
			retries: 0
		}, {
			name: 'fixture 1 > skipped test',
			status: 'skipped',
			location: 'test/integration/data/testcafe-1.test.js',
			browser: 'edge',
			tool: 'TestCafe 1 Test Reporting',
			experience: 'Test Framework',
			type: 'ui',
			retries: 0
		}, {
			name: 'fixture 1 > flaky test',
			status: 'passed',
			location: 'test/integration/data/testcafe-1.test.js',
			browser: 'edge',
			tool: 'TestCafe 1 Test Reporting',
			experience: 'Test Framework',
			type: 'ui',
			retries: 2
		}, {
			name: 'fixture 1 > flaky test',
			status: 'passed',
			location: 'test/integration/data/testcafe-1.test.js',
			browser: 'chrome',
			tool: 'TestCafe 1 Test Reporting',
			experience: 'Test Framework',
			type: 'ui',
			retries: 2
		}, {
			name: 'fixture 1 > flaky test',
			status: 'passed',
			location: 'test/integration/data/testcafe-1.test.js',
			browser: 'firefox',
			tool: 'TestCafe 1 Test Reporting',
			experience: 'Test Framework',
			type: 'ui',
			retries: 2
		}, {
			name: 'fixture 1 > failed test',
			status: 'failed',
			location: 'test/integration/data/testcafe-1.test.js',
			browser: 'firefox',
			tool: 'TestCafe 1 Test Reporting',
			experience: 'Test Framework',
			type: 'ui',
			retries: 3
		}, {
			name: 'fixture 1 > failed test',
			status: 'failed',
			location: 'test/integration/data/testcafe-1.test.js',
			browser: 'edge',
			tool: 'TestCafe 1 Test Reporting',
			experience: 'Test Framework',
			type: 'ui',
			retries: 3
		}, {
			name: 'fixture 1 > failed test',
			status: 'failed',
			location: 'test/integration/data/testcafe-1.test.js',
			browser: 'chrome',
			tool: 'TestCafe 1 Test Reporting',
			experience: 'Test Framework',
			type: 'ui',
			retries: 3
		}, {
			name: 'fixture 2 > test',
			status: 'passed',
			location: 'test/integration/data/testcafe-2.test.js',
			browser: 'edge',
			tool: 'TestCafe 2 Test Reporting',
			experience: 'TestCafe 2 Test Framework',
			type: 'integration',
			retries: 0
		}, {
			name: 'fixture 2 > test',
			status: 'passed',
			location: 'test/integration/data/testcafe-2.test.js',
			browser: 'chrome',
			tool: 'TestCafe 2 Test Reporting',
			experience: 'TestCafe 2 Test Framework',
			type: 'integration',
			retries: 0
		}, {
			name: 'fixture 2 > test',
			status: 'passed',
			location: 'test/integration/data/testcafe-2.test.js',
			browser: 'firefox',
			tool: 'TestCafe 2 Test Reporting',
			experience: 'TestCafe 2 Test Framework',
			type: 'integration',
			retries: 0
		}, {
			name: 'fixture 2 > skipped test',
			status: 'skipped',
			location: 'test/integration/data/testcafe-2.test.js',
			browser: 'edge',
			tool: 'TestCafe 2 Test Reporting',
			experience: 'TestCafe 2 Test Framework',
			type: 'integration',
			retries: 0
		}, {
			name: 'fixture 2 > skipped test',
			status: 'skipped',
			location: 'test/integration/data/testcafe-2.test.js',
			browser: 'chrome',
			tool: 'TestCafe 2 Test Reporting',
			experience: 'TestCafe 2 Test Framework',
			type: 'integration',
			retries: 0
		}, {
			name: 'fixture 2 > skipped test',
			status: 'skipped',
			location: 'test/integration/data/testcafe-2.test.js',
			browser: 'firefox',
			tool: 'TestCafe 2 Test Reporting',
			experience: 'TestCafe 2 Test Framework',
			type: 'integration',
			retries: 0
		}, {
			name: 'fixture 2 > flaky test',
			status: 'passed',
			location: 'test/integration/data/testcafe-2.test.js',
			browser: 'chrome',
			tool: 'TestCafe 2 Test Reporting',
			experience: 'TestCafe 2 Test Framework',
			type: 'integration',
			retries: 2
		}, {
			name: 'fixture 2 > flaky test',
			status: 'passed',
			location: 'test/integration/data/testcafe-2.test.js',
			browser: 'edge',
			tool: 'TestCafe 2 Test Reporting',
			experience: 'TestCafe 2 Test Framework',
			type: 'integration',
			retries: 2
		}, {
			name: 'fixture 2 > flaky test',
			status: 'passed',
			location: 'test/integration/data/testcafe-2.test.js',
			browser: 'firefox',
			tool: 'TestCafe 2 Test Reporting',
			experience: 'TestCafe 2 Test Framework',
			type: 'integration',
			retries: 2
		}, {
			name: 'fixture 2 > failed test',
			status: 'failed',
			location: 'test/integration/data/testcafe-2.test.js',
			browser: 'firefox',
			tool: 'TestCafe 2 Test Reporting',
			experience: 'TestCafe 2 Test Framework',
			type: 'integration',
			retries: 3
		}, {
			name: 'fixture 2 > failed test',
			status: 'failed',
			location: 'test/integration/data/testcafe-2.test.js',
			browser: 'chrome',
			tool: 'TestCafe 2 Test Reporting',
			experience: 'TestCafe 2 Test Framework',
			type: 'integration',
			retries: 3
		}, {
			name: 'fixture 2 > failed test',
			status: 'failed',
			location: 'test/integration/data/testcafe-2.test.js',
			browser: 'edge',
			tool: 'TestCafe 2 Test Reporting',
			experience: 'TestCafe 2 Test Framework',
			type: 'integration',
			retries: 3
		}]
};
const reportTests = [{
	name: 'mocha',
	path: './d2l-test-report-mocha.json',
	expected: partialReportMocha
}, {
	name: 'playwright',
	path: './d2l-test-report-playwright.json',
	expected: partialReportPlaywright
}, {
	name: '@web/test-runner',
	path: './d2l-test-report-web-test-runner.json',
	expected: partialReportWebTestRunner
}, {
	name: 'testcafe',
	path: './d2l-test-report-testcafe.json',
	expected: partialReportTestCafe
}];

describe('report validation', () => {
	for (const reportTest of reportTests) {
		describe(reportTest.name, () => {
			let report;

			before(async() => {
				const reportFileContents = await readFile(reportTest.path, 'utf8');
				const reportJson = JSON.parse(reportFileContents);

				if (!hasContext()) {
					reportJson.summary = {
						...reportJson.summary,
						...dummyContext
					};
				}

				report = reportJson;
			});

			it('schema', () => validateReport(report));

			it('contents', () => {
				const now = new Date();
				const nowMinus30Minutes = new Date(now);

				nowMinus30Minutes.setMinutes(now.getMinutes() - 30);

				expect(report).to.containSubset(reportTest.expected);

				const { summary, details } = report;

				expect(summary.operatingSystem).to.eq(getOperatingSystemType());
				expect(summary.totalDuration).to.be.above(0);

				const summaryStarted = new Date(summary.started);

				expect(summaryStarted).to.be.at.most(now);
				expect(summaryStarted).to.be.at.least(nowMinus30Minutes);

				for (const detail of details) {
					const detailStarted = new Date(detail.started);

					expect(detail.duration).to.be.at.least(0);
					expect(detail.totalDuration).to.be.at.least(0);
					expect(detail.totalDuration).to.be.at.least(detail.duration);
					expect(detail.duration).to.be.at.most(summary.totalDuration);
					expect(detail.totalDuration).to.be.at.most(summary.totalDuration);
					expect(detailStarted).to.be.at.most(now);
					expect(detailStarted).to.be.at.least(nowMinus30Minutes);
					expect(detailStarted).to.be.at.least(summaryStarted);
				}
			});
		});
	}
});
