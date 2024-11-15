export const testReportV2Partial = {
	version: 2,
	summary: {
		status: 'failed',
		framework: 'playwright',
		count: { passed: 20, failed: 5, skipped: 30, flaky: 5 }
	},
	details: [{
		name: '[chromium] > reporter 1 > skipped static, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 16,
			column: 7
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter 2 > skipped static, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 16,
			column: 7
		},
		browser: 'chromium',
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
		name: '[chromium] > reporter 1 > skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 22,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter 1 > failed dynamic expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 40,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter 1 > skipped static',
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
			line: 36,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 3
	}, {
		name: '[chromium] > reporter 1 > skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 18,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter 1 > failed static expected, skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 52,
			column: 7
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter 2 > skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 18,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[chromium] > reporter 2 > skipped static',
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
		name: '[chromium] > reporter 1 > flaky',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 26,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: '[chromium] > reporter 1 > failed static expected, skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 46,
			column: 7
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter 2 > skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 22,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[chromium] > reporter 2 > failed dynamic expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 40,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[chromium] > reporter 2 > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 36,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 3
	}, {
		name: '[chromium] > reporter 2 > failed static expected, skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 52,
			column: 7
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[chromium] > reporter 2 > flaky',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 26,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 2
	}, {
		name: '[chromium] > reporter 2 > failed static expected, skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 46,
			column: 7
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[firefox] > reporter 2 > skipped static, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 16,
			column: 7
		},
		browser: 'firefox',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
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
		name: '[firefox] > reporter 2 > skipped static',
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
		name: '[firefox] > reporter 2 > skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 18,
			column: 2
		},
		browser: 'firefox',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[firefox] > reporter 2 > skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 22,
			column: 2
		},
		browser: 'firefox',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[firefox] > reporter 2 > failed dynamic expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 40,
			column: 2
		},
		browser: 'firefox',
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
			line: 26,
			column: 2
		},
		browser: 'firefox',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 2
	}, {
		name: '[firefox] > reporter 2 > failed static expected, skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 46,
			column: 7
		},
		browser: 'firefox',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[firefox] > reporter 2 > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 36,
			column: 2
		},
		browser: 'firefox',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 3
	}, {
		name: '[firefox] > reporter 2 > failed static expected, skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 52,
			column: 7
		},
		browser: 'firefox',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter 1 > skipped static, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 16,
			column: 7
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
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
		name: '[webkit] > reporter 1 > skipped static',
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
		name: '[chromium] > reporter 1 > failed static expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 38,
			column: 7
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[webkit] > reporter 1 > skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 18,
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
			line: 36,
			column: 2
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 3
	}, {
		name: '[chromium] > reporter 2 > failed static expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 38,
			column: 7
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter 1 > skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 22,
			column: 2
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[webkit] > reporter 1 > failed static expected, skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 52,
			column: 7
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[webkit] > reporter 2 > skipped static, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 16,
			column: 7
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter 1 > failed dynamic expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 40,
			column: 2
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[webkit] > reporter 1 > flaky',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 26,
			column: 2
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: '[webkit] > reporter 2 > skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 18,
			column: 2
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter 1 > failed static expected, skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 46,
			column: 7
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
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
		name: '[webkit] > reporter 2 > failed dynamic expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 40,
			column: 2
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter 2 > skipped static',
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
		name: '[webkit] > reporter 2 > failed static expected, skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 52,
			column: 7
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter 2 > failed static expected, skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 46,
			column: 7
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter 2 > skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 22,
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
			line: 36,
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
			line: 26,
			column: 2
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 2
	}, {
		name: '[firefox] > reporter 2 > failed static expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 38,
			column: 7
		},
		browser: 'firefox',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter 1 > failed static expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 38,
			column: 7
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[webkit] > reporter 2 > failed static expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 38,
			column: 7
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[chromium] > reporter 1 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 58,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[chromium] > reporter 2 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 58,
			column: 2
		},
		browser: 'chromium',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[firefox] > reporter 2 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 58,
			column: 2
		},
		browser: 'firefox',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}, {
		name: '[webkit] > reporter 1 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-1.test.js',
			line: 58,
			column: 2
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Playwright 1 Test Reporting',
		experience: 'Playwright 1 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: '[webkit] > reporter 2 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/reporter-2.test.js',
			line: 58,
			column: 2
		},
		browser: 'webkit',
		timeout: 30000,
		tool: 'Test Reporting',
		experience: 'Playwright 2 Test Framework',
		type: 'visual diff',
		retries: 0
	}]
};
