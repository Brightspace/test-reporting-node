export const testReportV1Partial = {
	reportVersion: 1,
	summary: {
		status: 'failed',
		framework: 'testcafe',
		countPassed: 6,
		countFailed: 6,
		countSkipped: 6,
		countFlaky: 6
	},
	details: [{
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
export const testReportV2Partial = {
	version: 2,
	summary: {
		status: 'failed',
		framework: 'testcafe',
		count: {
			passed: 6,
			failed: 6,
			skipped: 6,
			flaky: 6
		}
	},
	details: [{
		name: 'fixture 1 > test',
		status: 'passed',
		location: { file: 'test/integration/data/testcafe-1.test.js' },
		browser: 'firefox',
		tool: 'TestCafe 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: 'fixture 1 > test',
		status: 'passed',
		location: { file: 'test/integration/data/testcafe-1.test.js' },
		browser: 'chrome',
		tool: 'TestCafe 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: 'fixture 1 > test',
		status: 'passed',
		location: { file: 'test/integration/data/testcafe-1.test.js' },
		browser: 'edge',
		tool: 'TestCafe 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: 'fixture 1 > skipped test',
		status: 'skipped',
		location: { file: 'test/integration/data/testcafe-1.test.js' },
		browser: 'firefox',
		tool: 'TestCafe 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: 'fixture 1 > skipped test',
		status: 'skipped',
		location: { file: 'test/integration/data/testcafe-1.test.js' },
		browser: 'chrome',
		tool: 'TestCafe 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: 'fixture 1 > skipped test',
		status: 'skipped',
		location: { file: 'test/integration/data/testcafe-1.test.js' },
		browser: 'edge',
		tool: 'TestCafe 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: 'fixture 1 > flaky test',
		status: 'passed',
		location: { file: 'test/integration/data/testcafe-1.test.js' },
		browser: 'edge',
		tool: 'TestCafe 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 2
	}, {
		name: 'fixture 1 > flaky test',
		status: 'passed',
		location: { file: 'test/integration/data/testcafe-1.test.js' },
		browser: 'chrome',
		tool: 'TestCafe 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 2
	}, {
		name: 'fixture 1 > flaky test',
		status: 'passed',
		location: { file: 'test/integration/data/testcafe-1.test.js' },
		browser: 'firefox',
		tool: 'TestCafe 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 2
	}, {
		name: 'fixture 1 > failed test',
		status: 'failed',
		location: { file: 'test/integration/data/testcafe-1.test.js' },
		browser: 'firefox',
		tool: 'TestCafe 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 3
	}, {
		name: 'fixture 1 > failed test',
		status: 'failed',
		location: { file: 'test/integration/data/testcafe-1.test.js' },
		browser: 'edge',
		tool: 'TestCafe 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 3
	}, {
		name: 'fixture 1 > failed test',
		status: 'failed',
		location: { file: 'test/integration/data/testcafe-1.test.js' },
		browser: 'chrome',
		tool: 'TestCafe 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 3
	}, {
		name: 'fixture 2 > test',
		status: 'passed',
		location: { file: 'test/integration/data/testcafe-2.test.js' },
		browser: 'edge',
		tool: 'TestCafe 2 Test Reporting',
		experience: 'TestCafe 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'fixture 2 > test',
		status: 'passed',
		location: { file: 'test/integration/data/testcafe-2.test.js' },
		browser: 'chrome',
		tool: 'TestCafe 2 Test Reporting',
		experience: 'TestCafe 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'fixture 2 > test',
		status: 'passed',
		location: { file: 'test/integration/data/testcafe-2.test.js' },
		browser: 'firefox',
		tool: 'TestCafe 2 Test Reporting',
		experience: 'TestCafe 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'fixture 2 > skipped test',
		status: 'skipped',
		location: { file: 'test/integration/data/testcafe-2.test.js' },
		browser: 'edge',
		tool: 'TestCafe 2 Test Reporting',
		experience: 'TestCafe 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'fixture 2 > skipped test',
		status: 'skipped',
		location: { file: 'test/integration/data/testcafe-2.test.js' },
		browser: 'chrome',
		tool: 'TestCafe 2 Test Reporting',
		experience: 'TestCafe 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'fixture 2 > skipped test',
		status: 'skipped',
		location: { file: 'test/integration/data/testcafe-2.test.js' },
		browser: 'firefox',
		tool: 'TestCafe 2 Test Reporting',
		experience: 'TestCafe 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'fixture 2 > flaky test',
		status: 'passed',
		location: { file: 'test/integration/data/testcafe-2.test.js' },
		browser: 'chrome',
		tool: 'TestCafe 2 Test Reporting',
		experience: 'TestCafe 2 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: 'fixture 2 > flaky test',
		status: 'passed',
		location: { file: 'test/integration/data/testcafe-2.test.js' },
		browser: 'edge',
		tool: 'TestCafe 2 Test Reporting',
		experience: 'TestCafe 2 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: 'fixture 2 > flaky test',
		status: 'passed',
		location: { file: 'test/integration/data/testcafe-2.test.js' },
		browser: 'firefox',
		tool: 'TestCafe 2 Test Reporting',
		experience: 'TestCafe 2 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: 'fixture 2 > failed test',
		status: 'failed',
		location: { file: 'test/integration/data/testcafe-2.test.js' },
		browser: 'firefox',
		tool: 'TestCafe 2 Test Reporting',
		experience: 'TestCafe 2 Test Framework',
		type: 'integration',
		retries: 3
	}, {
		name: 'fixture 2 > failed test',
		status: 'failed',
		location: { file: 'test/integration/data/testcafe-2.test.js' },
		browser: 'chrome',
		tool: 'TestCafe 2 Test Reporting',
		experience: 'TestCafe 2 Test Framework',
		type: 'integration',
		retries: 3
	}, {
		name: 'fixture 2 > failed test',
		status: 'failed',
		location: { file: 'test/integration/data/testcafe-2.test.js' },
		browser: 'edge',
		tool: 'TestCafe 2 Test Reporting',
		experience: 'TestCafe 2 Test Framework',
		type: 'integration',
		retries: 3
	}]
};
