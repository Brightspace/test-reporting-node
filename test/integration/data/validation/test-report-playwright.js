import { latestReportVersion } from '../../../../src/helpers/schema.cjs';

export const testReportLatestPartial = {
	version: latestReportVersion,
	summary: {
		status: 'failed',
		framework: 'playwright',
		count: { passed: 27, failed: 36, skipped: 21, flaky: 6 }
	},
	details: [{
		name: '[chromium] > hook failures > before each failure > test with before each failure',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 17,
			column: 3
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[chromium] > custom timeout > suite level timeout',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/custom-timeout.test.js',
			line: 10,
			column: 2
		},
		browser: 'chromium',
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[chromium] > hook failures > flaky before each > test with flaky before each',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 57,
			column: 3
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[chromium] > fake timers > sinon > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/fake-timers.test.js',
			line: 27,
			column: 3
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 3
	}, {
		name: '[chromium] > fake timers > node > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/fake-timers.test.js',
			line: 37,
			column: 3
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 3
	}, {
		name: '[chromium] > hook failures > before all failure > test with before all failure',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 11,
			column: 3
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[chromium] > custom timeout > test level timeout',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/custom-timeout.test.js',
			line: 12,
			column: 2
		},
		browser: 'chromium',
		configuration: { timeout: 10000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[chromium] > hook failures > after each failure > test with after each failure',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 23,
			column: 3
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[chromium] > fake timers > sinon > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/fake-timers.test.js',
			line: 25,
			column: 3
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[chromium] > fake timers > node > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/fake-timers.test.js',
			line: 35,
			column: 3
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[chromium] > hook failures > flaky after each > test with flaky after each',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 71,
			column: 3
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[chromium] > hook failures > flaky before all > test with flaky before all',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 43,
			column: 3
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[chromium] > hook failures > after all failure > test with after all failure',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 29,
			column: 3
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[chromium] > hook failures > flaky after all > test with flaky after all',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 85,
			column: 3
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[chromium] > special characters > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/special-characters.test.js',
			line: 8,
			column: 2
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[chromium] > statuses > skipped static, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 20,
			column: 7
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[chromium] > statuses > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 16,
			column: 2
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[chromium] > statuses > skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 26,
			column: 2
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[chromium] > statuses > failed static expected, skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 56,
			column: 7
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[chromium] > taxonomy overrides > skipped',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/taxonomy-overrides.test.js',
			line: 18,
			column: 7
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[chromium] > statuses > failed dynamic expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 44,
			column: 2
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[chromium] > statuses > skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 22,
			column: 2
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[chromium] > statuses > skipped static',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 18,
			column: 7
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[chromium] > taxonomy overrides > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/taxonomy-overrides.test.js',
			line: 16,
			column: 2
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[chromium] > statuses > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 40,
			column: 2
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[firefox] > custom timeout > test level timeout',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/custom-timeout.test.js',
			line: 12,
			column: 2
		},
		browser: 'firefox',
		configuration: { timeout: 10000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[firefox] > custom timeout > suite level timeout',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/custom-timeout.test.js',
			line: 10,
			column: 2
		},
		browser: 'firefox',
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[firefox] > fake timers > sinon > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/fake-timers.test.js',
			line: 27,
			column: 3
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 3
	}, {
		name: '[firefox] > fake timers > node > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/fake-timers.test.js',
			line: 37,
			column: 3
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 3
	}, {
		name: '[firefox] > hook failures > before each failure > test with before each failure',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 17,
			column: 3
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[chromium] > statuses > flaky',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 30,
			column: 2
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 2
	}, {
		name: '[chromium] > statuses > failed static expected, skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 50,
			column: 7
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[chromium] > taxonomy overrides > flaky',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/taxonomy-overrides.test.js',
			line: 20,
			column: 2
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 2
	}, {
		name: '[chromium] > taxonomy overrides > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/taxonomy-overrides.test.js',
			line: 30,
			column: 2
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 3
	}, {
		name: '[firefox] > fake timers > sinon > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/fake-timers.test.js',
			line: 25,
			column: 3
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[firefox] > fake timers > node > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/fake-timers.test.js',
			line: 35,
			column: 3
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[firefox] > hook failures > flaky before each > test with flaky before each',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 57,
			column: 3
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[firefox] > hook failures > after each failure > test with after each failure',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 23,
			column: 3
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[firefox] > hook failures > flaky after each > test with flaky after each',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 71,
			column: 3
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[firefox] > hook failures > before all failure > test with before all failure',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 11,
			column: 3
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[firefox] > hook failures > after all failure > test with after all failure',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 29,
			column: 3
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[firefox] > hook failures > flaky before all > test with flaky before all',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 43,
			column: 3
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[firefox] > hook failures > flaky after all > test with flaky after all',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 85,
			column: 3
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[firefox] > statuses > skipped static, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 20,
			column: 7
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[firefox] > special characters > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/special-characters.test.js',
			line: 8,
			column: 2
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[firefox] > statuses > skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 26,
			column: 2
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[firefox] > statuses > skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 22,
			column: 2
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[firefox] > statuses > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 16,
			column: 2
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[firefox] > taxonomy overrides > skipped',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/taxonomy-overrides.test.js',
			line: 18,
			column: 7
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[firefox] > statuses > skipped static',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 18,
			column: 7
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[chromium] > statuses > failed static expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 42,
			column: 7
		},
		browser: 'chromium',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[firefox] > statuses > failed dynamic expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 44,
			column: 2
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[firefox] > statuses > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 40,
			column: 2
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[firefox] > statuses > flaky',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 30,
			column: 2
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 2
	}, {
		name: '[webkit] > custom timeout > suite level timeout',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/custom-timeout.test.js',
			line: 10,
			column: 2
		},
		browser: 'webkit',
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[webkit] > custom timeout > test level timeout',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/custom-timeout.test.js',
			line: 12,
			column: 2
		},
		browser: 'webkit',
		configuration: { timeout: 10000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[firefox] > taxonomy overrides > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/taxonomy-overrides.test.js',
			line: 16,
			column: 2
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[webkit] > fake timers > sinon > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/fake-timers.test.js',
			line: 25,
			column: 3
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[webkit] > fake timers > node > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/fake-timers.test.js',
			line: 35,
			column: 3
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[webkit] > hook failures > before each failure > test with before each failure',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 17,
			column: 3
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[firefox] > statuses > failed static expected, skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 50,
			column: 7
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[firefox] > taxonomy overrides > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/taxonomy-overrides.test.js',
			line: 30,
			column: 2
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 3
	}, {
		name: '[firefox] > statuses > failed static expected, skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 56,
			column: 7
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[webkit] > fake timers > sinon > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/fake-timers.test.js',
			line: 27,
			column: 3
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 3
	}, {
		name: '[webkit] > fake timers > node > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/fake-timers.test.js',
			line: 37,
			column: 3
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 3
	}, {
		name: '[firefox] > taxonomy overrides > flaky',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/taxonomy-overrides.test.js',
			line: 20,
			column: 2
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 2
	}, {
		name: '[webkit] > hook failures > flaky before each > test with flaky before each',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 57,
			column: 3
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[webkit] > hook failures > after each failure > test with after each failure',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 23,
			column: 3
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[webkit] > hook failures > flaky after each > test with flaky after each',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 71,
			column: 3
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[webkit] > hook failures > before all failure > test with before all failure',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 11,
			column: 3
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[webkit] > hook failures > after all failure > test with after all failure',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 29,
			column: 3
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[webkit] > hook failures > flaky before all > test with flaky before all',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 43,
			column: 3
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[webkit] > hook failures > flaky after all > test with flaky after all',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/hook-failures.test.js',
			line: 85,
			column: 3
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[webkit] > statuses > skipped static, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 20,
			column: 7
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[webkit] > special characters > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/special-characters.test.js',
			line: 8,
			column: 2
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[webkit] > statuses > skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 22,
			column: 2
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[webkit] > taxonomy overrides > skipped',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/taxonomy-overrides.test.js',
			line: 18,
			column: 7
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[webkit] > statuses > failed dynamic expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 44,
			column: 2
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[webkit] > statuses > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 16,
			column: 2
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[webkit] > statuses > skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 26,
			column: 2
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[webkit] > statuses > skipped static',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 18,
			column: 7
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[firefox] > statuses > failed static expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 42,
			column: 7
		},
		browser: 'firefox',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[webkit] > statuses > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 40,
			column: 2
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: '[webkit] > statuses > failed static expected, skipped dynamic',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 50,
			column: 7
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[webkit] > taxonomy overrides > flaky',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/taxonomy-overrides.test.js',
			line: 20,
			column: 2
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 2
	}, {
		name: '[webkit] > statuses > failed static expected, skipped dynamic, fixme',
		status: 'skipped',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 56,
			column: 7
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[webkit] > statuses > flaky',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 30,
			column: 2
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 2
	}, {
		name: '[webkit] > taxonomy overrides > failed',
		status: 'failed',
		location: {
			file: 'test/integration/data/tests/playwright/taxonomy-overrides.test.js',
			line: 30,
			column: 2
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 3
	}, {
		name: '[webkit] > taxonomy overrides > passed',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/taxonomy-overrides.test.js',
			line: 16,
			column: 2
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[webkit] > statuses > failed static expected',
		status: 'passed',
		location: {
			file: 'test/integration/data/tests/playwright/statuses.test.js',
			line: 42,
			column: 7
		},
		browser: 'webkit',
		configuration: { timeout: 30000 },
		taxonomy: { tool: 'Playwright 1 Test Reporting', type: 'ui' },
		retries: 0
	}]
};
