export const testReportV1Partial = {
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
export const testReportV2Partial = {
	version: 2,
	summary: {
		status: 'failed',
		framework: '@web/test-runner',
		count: { passed: 4, failed: 4, skipped: 4, flaky: 0 }
	},
	details: [{
		name: 'reporter tests 1 > test',
		status: 'passed',
		location: { file: 'test/integration/data/web-test-runner-1.test.js' },
		browser: 'chrome',
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'reporter tests 1 > skipped test',
		status: 'skipped',
		location: { file: 'test/integration/data/web-test-runner-1.test.js' },
		browser: 'chrome',
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'reporter tests 1 > failed test',
		status: 'failed',
		location: { file: 'test/integration/data/web-test-runner-1.test.js' },
		browser: 'chrome',
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[group 1] > reporter tests 2 > test',
		status: 'passed',
		location: { file: 'test/integration/data/web-test-runner-2.test.js' },
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter tests 2 > skipped test',
		status: 'skipped',
		location: { file: 'test/integration/data/web-test-runner-2.test.js' },
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter tests 2 > failed test',
		status: 'failed',
		location: { file: 'test/integration/data/web-test-runner-2.test.js' },
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter tests 2 > test',
		status: 'passed',
		location: { file: 'test/integration/data/web-test-runner-2.test.js' },
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter tests 2 > skipped test',
		status: 'skipped',
		location: { file: 'test/integration/data/web-test-runner-2.test.js' },
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter tests 2 > failed test',
		status: 'failed',
		location: { file: 'test/integration/data/web-test-runner-2.test.js' },
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 2] > reporter tests 1 > test',
		status: 'passed',
		location: { file: 'test/integration/data/web-test-runner-1.test.js' },
		browser: 'webkit',
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[group 2] > reporter tests 1 > skipped test',
		status: 'skipped',
		location: { file: 'test/integration/data/web-test-runner-1.test.js' },
		browser: 'webkit',
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[group 2] > reporter tests 1 > failed test',
		status: 'failed',
		location: { file: 'test/integration/data/web-test-runner-1.test.js' },
		browser: 'webkit',
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}]
};
