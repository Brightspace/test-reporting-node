export const testReportV1Partial = {
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
		name: '[chromium] > reporter 1 > skipped',
		status: 'skipped',
		location: 'test/integration/data/tests/playwright/reporter-1.test.js',
		browser: 'chromium',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter 2 > skipped',
		status: 'skipped',
		location: 'test/integration/data/tests/playwright/reporter-2.test.js',
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[firefox] > reporter 2 > skipped',
		status: 'skipped',
		location: 'test/integration/data/tests/playwright/reporter-2.test.js',
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[chromium] > reporter 1 > passed',
		status: 'passed',
		location: 'test/integration/data/tests/playwright/reporter-1.test.js',
		browser: 'chromium',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter 2 > passed',
		status: 'passed',
		location: 'test/integration/data/tests/playwright/reporter-2.test.js',
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[chromium] > reporter 1 > failed',
		status: 'failed',
		location: 'test/integration/data/tests/playwright/reporter-1.test.js',
		browser: 'chromium',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 3
	}, {
		name: '[firefox] > reporter 2 > passed',
		status: 'passed',
		location: 'test/integration/data/tests/playwright/reporter-2.test.js',
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter 1 > skipped',
		status: 'skipped',
		location: 'test/integration/data/tests/playwright/reporter-1.test.js',
		browser: 'webkit',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter 2 > failed',
		status: 'failed',
		location: 'test/integration/data/tests/playwright/reporter-2.test.js',
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 3
	}, {
		name: '[firefox] > reporter 2 > failed',
		status: 'failed',
		location: 'test/integration/data/tests/playwright/reporter-2.test.js',
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 3
	}, {
		name: '[webkit] > reporter 1 > passed',
		status: 'passed',
		location: 'test/integration/data/tests/playwright/reporter-1.test.js',
		browser: 'webkit',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[webkit] > reporter 1 > failed',
		status: 'failed',
		location: 'test/integration/data/tests/playwright/reporter-1.test.js',
		browser: 'webkit',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 3
	}, {
		name: '[chromium] > reporter 1 > flaky',
		status: 'passed',
		location: 'test/integration/data/tests/playwright/reporter-1.test.js',
		browser: 'chromium',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: '[chromium] > reporter 2 > flaky',
		status: 'passed',
		location: 'test/integration/data/tests/playwright/reporter-2.test.js',
		browser: 'chromium',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 2
	}, {
		name: '[webkit] > reporter 1 > flaky',
		status: 'passed',
		location: 'test/integration/data/tests/playwright/reporter-1.test.js',
		browser: 'webkit',
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: '[webkit] > reporter 2 > skipped',
		status: 'skipped',
		location: 'test/integration/data/tests/playwright/reporter-2.test.js',
		browser: 'webkit',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[firefox] > reporter 2 > flaky',
		status: 'passed',
		location: 'test/integration/data/tests/playwright/reporter-2.test.js',
		browser: 'firefox',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 2
	}, {
		name: '[webkit] > reporter 2 > passed',
		status: 'passed',
		location: 'test/integration/data/tests/playwright/reporter-2.test.js',
		browser: 'webkit',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter 2 > failed',
		status: 'failed',
		location: 'test/integration/data/tests/playwright/reporter-2.test.js',
		browser: 'webkit',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 3
	}, {
		name: '[webkit] > reporter 2 > flaky',
		status: 'passed',
		location: 'test/integration/data/tests/playwright/reporter-2.test.js',
		browser: 'webkit',
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 2
	}]
};
export const testReportV2Partial = {
	version: 2,
	summary: {
		status: 'failed',
		framework: 'playwright',
		count: {
			passed: 5,
			failed: 5,
			skipped: 5,
			flaky: 5
		}
	},
	details: [{
		name: '[chromium] > reporter 1 > skipped',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 14,
			column: 7
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter 2 > skipped',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 14,
			column: 7
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[firefox] > reporter 2 > skipped',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 14,
			column: 7
		},
		browser: 'firefox',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[chromium] > reporter 1 > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 12,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter 2 > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 12,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[chromium] > reporter 1 > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 27,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 3
	}, {
		name: '[firefox] > reporter 2 > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 12,
			column: 2
		},
		browser: 'firefox',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter 1 > skipped',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 14,
			column: 7
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter 2 > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 27,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 3
	}, {
		name: '[firefox] > reporter 2 > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 27,
			column: 2
		},
		browser: 'firefox',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 3
	}, {
		name: '[webkit] > reporter 1 > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 12,
			column: 2
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[webkit] > reporter 1 > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 27,
			column: 2
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 3
	}, {
		name: '[chromium] > reporter 1 > flaky',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 17,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: '[chromium] > reporter 2 > flaky',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 17,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 2
	}, {
		name: '[webkit] > reporter 1 > flaky',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 17,
			column: 2
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: '[webkit] > reporter 2 > skipped',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 14,
			column: 7
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[firefox] > reporter 2 > flaky',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 17,
			column: 2
		},
		browser: 'firefox',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 2
	}, {
		name: '[webkit] > reporter 2 > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 12,
			column: 2
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter 2 > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 27,
			column: 2
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 3
	}, {
		name: '[webkit] > reporter 2 > flaky',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 17,
			column: 2
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 2
	}]
};
