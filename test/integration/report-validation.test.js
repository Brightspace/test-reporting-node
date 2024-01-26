import { expect, use } from 'chai';
import chaiSubset from 'chai-subset';
import { getOperatingSystem } from '../../src/reporters/helpers.cjs';
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
	summary: {
		framework: 'mocha',
		countPassed: 2,
		countFailed: 2,
		countSkipped: 2,
		countFlaky: 2
	},
	details: [{
		name: 'reporter tests 1 > test',
		status: 'passed',
		location: 'test/integration/mocha-1.test.js',
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: 'reporter tests 1 > skipped test',
		status: 'skipped',
		location: 'test/integration/mocha-1.test.js',
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: 'reporter tests 1 > flaky test that succeeds eventually',
		status: 'passed',
		location: 'test/integration/mocha-1.test.js',
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 2
	}, {
		name: 'reporter tests 1 > failed test',
		status: 'failed',
		location: 'test/integration/mocha-1.test.js',
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 3
	}, {
		name: 'reporter tests 2 > test',
		status: 'passed',
		location: 'test/integration/mocha-2.test.js',
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'reporter tests 2 > skipped test',
		status: 'skipped',
		location: 'test/integration/mocha-2.test.js',
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'reporter tests 2 > flaky test',
		status: 'passed',
		location: 'test/integration/mocha-2.test.js',
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: 'reporter tests 2 > failed test',
		status: 'failed',
		location: 'test/integration/mocha-2.test.js',
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 3
	}]
};
const partialReportPlaywright = {
	summary: {
		framework: 'playwright',
		countPassed: 5,
		countFailed: 5,
		countSkipped: 5,
		countFlaky: 5
	},
	details: [{
		name: '[chromium] > reporter tests 1 > skipped test',
		status: 'skipped',
		location: 'test/integration/playwright-1.test.js',
		browser: 'chromium',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter tests 2 > skipped test',
		status: 'skipped',
		location: 'test/integration/playwright-2.test.js',
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[chromium] > reporter tests 1 > test',
		status: 'passed',
		location: 'test/integration/playwright-1.test.js',
		browser: 'chromium',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter tests 1 > failed test',
		status: 'failed',
		location: 'test/integration/playwright-1.test.js',
		browser: 'chromium',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 3
	}, {
		name: '[chromium] > reporter tests 2 > test',
		status: 'passed',
		location: 'test/integration/playwright-2.test.js',
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[firefox] > reporter tests 2 > skipped test',
		status: 'skipped',
		location: 'test/integration/playwright-2.test.js',
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[chromium] > reporter tests 2 > failed test',
		status: 'failed',
		location: 'test/integration/playwright-2.test.js',
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 3
	}, {
		name: '[firefox] > reporter tests 2 > test',
		status: 'passed',
		location: 'test/integration/playwright-2.test.js',
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[firefox] > reporter tests 2 > failed test',
		status: 'failed',
		location: 'test/integration/playwright-2.test.js',
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 3
	}, {
		name: '[chromium] > reporter tests 2 > flaky test',
		status: 'passed',
		location: 'test/integration/playwright-2.test.js',
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 2
	}, {
		name: '[chromium] > reporter tests 1 > flaky test',
		status: 'passed',
		location: 'test/integration/playwright-1.test.js',
		browser: 'chromium',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: '[webkit] > reporter tests 1 > skipped test',
		status: 'skipped',
		location: 'test/integration/playwright-1.test.js',
		browser: 'webkit',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[webkit] > reporter tests 1 > test',
		status: 'passed',
		location: 'test/integration/playwright-1.test.js',
		browser: 'webkit',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[webkit] > reporter tests 2 > skipped test',
		status: 'skipped',
		location: 'test/integration/playwright-2.test.js',
		browser: 'webkit',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[firefox] > reporter tests 2 > flaky test',
		status: 'passed',
		location: 'test/integration/playwright-2.test.js',
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 2
	}, {
		name: '[webkit] > reporter tests 1 > failed test',
		status: 'failed',
		location: 'test/integration/playwright-1.test.js',
		browser: 'webkit',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 3
	}, {
		name: '[webkit] > reporter tests 2 > test',
		status: 'passed',
		location: 'test/integration/playwright-2.test.js',
		browser: 'webkit',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter tests 2 > failed test',
		status: 'failed',
		location: 'test/integration/playwright-2.test.js',
		browser: 'webkit',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 3
	}, {
		name: '[webkit] > reporter tests 1 > flaky test',
		status: 'passed',
		location: 'test/integration/playwright-1.test.js',
		browser: 'webkit',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: '[webkit] > reporter tests 2 > flaky test',
		status: 'passed',
		location: 'test/integration/playwright-2.test.js',
		browser: 'webkit',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 2
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
				expect(report.reportVersion).to.eq(1);
				expect(report.summary.status).to.eq('failed');
				expect(report.summary.operatingSystem).to.eq(getOperatingSystem());
				expect(report).to.containSubset(reportTest.expected);
			});
		});
	}
});
