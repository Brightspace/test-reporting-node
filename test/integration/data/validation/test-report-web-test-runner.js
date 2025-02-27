export const testReportV2Partial = {
	version: 2,
	summary: {
		status: 'failed',
		framework: '@web/test-runner',
		count: { passed: 8, failed: 4, skipped: 4, flaky: 0 }
	},
	details: [{
		name: 'reporter 1 > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-1.test.js' },
		browser: 'chrome',
		timeout: 120000,
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'reporter 1 > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-1.test.js' },
		browser: 'chrome',
		timeout: 120000,
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'reporter 1 > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-1.test.js' },
		browser: 'chrome',
		timeout: 120000,
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'chromium',
		timeout: 120000,
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'chromium',
		timeout: 120000,
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'chromium',
		timeout: 120000,
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'firefox',
		timeout: 120000,
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'firefox',
		timeout: 120000,
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'firefox',
		timeout: 120000,
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 2] > reporter 1 > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-1.test.js' },
		browser: 'webkit',
		timeout: 120000,
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[group 2] > reporter 1 > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-1.test.js' },
		browser: 'webkit',
		timeout: 120000,
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[group 2] > reporter 1 > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-1.test.js' },
		browser: 'webkit',
		timeout: 120000,
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'reporter 1 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-1.test.js' },
		browser: 'chrome',
		timeout: 120000,
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'chromium',
		timeout: 120000,
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'firefox',
		timeout: 120000,
		tool: 'Test Reporting',
		experience: 'WebTestRunner 2 Test Framework',
		type: 'accessibility',
		retries: 0
	}, {
		name: '[group 2] > reporter 1 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-1.test.js' },
		browser: 'webkit',
		timeout: 120000,
		tool: 'WebTestRunner 1 Test Reporting',
		experience: 'WebTestRunner 1 Test Framework',
		type: 'integration',
		retries: 0
	}]
};
