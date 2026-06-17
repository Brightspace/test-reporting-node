import { latestReportVersion } from '../../../../src/helpers/schema.cjs';

export const testReportLatestPartial = {
	version: latestReportVersion,
	summary: {
		status: 'failed',
		framework: '@web/test-runner',
		count: { passed: 32, failed: 20, skipped: 8, flaky: 0 }
	},
	details: [{
		name: 'custom timeout > suite level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/custom-timeout.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'custom timeout > test level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/custom-timeout.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'fake timers > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/fake-timers.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'fake timers > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/fake-timers.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'hook failures > before all failure > test with before all failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > before each failure > test with before each failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > after each failure > test with after each failure',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > after all failure > test with after all failure',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'special characters > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/special-characters.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'statuses > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/statuses.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'statuses > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/statuses.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'statuses > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/statuses.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'taxonomy overrides > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/taxonomy-overrides.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'taxonomy overrides > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/taxonomy-overrides.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'taxonomy overrides > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/taxonomy-overrides.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > custom timeout > suite level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/custom-timeout.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > custom timeout > test level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/custom-timeout.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > custom timeout > suite level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/custom-timeout.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > custom timeout > test level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/custom-timeout.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > fake timers > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/fake-timers.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > fake timers > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/fake-timers.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > fake timers > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/fake-timers.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > fake timers > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/fake-timers.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > hook failures > before all failure > test with before all failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 1] > hook failures > before each failure > test with before each failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 1] > hook failures > after each failure > test with after each failure',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 1] > hook failures > after all failure > test with after all failure',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 1] > hook failures > before all failure > test with before all failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 1] > hook failures > before each failure > test with before each failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 1] > hook failures > after each failure > test with after each failure',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 1] > hook failures > after all failure > test with after all failure',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 1] > special characters > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/special-characters.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > special characters > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/special-characters.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > statuses > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/statuses.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 1] > statuses > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/statuses.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 1] > statuses > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/statuses.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 1] > statuses > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/statuses.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 1] > statuses > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/statuses.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 1] > statuses > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/statuses.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 1] > taxonomy overrides > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/taxonomy-overrides.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > taxonomy overrides > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/taxonomy-overrides.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > taxonomy overrides > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/taxonomy-overrides.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > taxonomy overrides > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/taxonomy-overrides.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > taxonomy overrides > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/taxonomy-overrides.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > taxonomy overrides > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/taxonomy-overrides.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 2] > custom timeout > suite level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/custom-timeout.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 2] > custom timeout > test level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/custom-timeout.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 2] > fake timers > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/fake-timers.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 2] > fake timers > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/fake-timers.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 2] > hook failures > before all failure > test with before all failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 2] > hook failures > before each failure > test with before each failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 2] > hook failures > after each failure > test with after each failure',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 2] > hook failures > after all failure > test with after all failure',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/hook-failures.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 2] > special characters > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/special-characters.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 2] > statuses > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/statuses.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 2] > statuses > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/statuses.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 2] > statuses > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/statuses.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: '[group 2] > taxonomy overrides > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/taxonomy-overrides.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 2] > taxonomy overrides > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/taxonomy-overrides.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 2] > taxonomy overrides > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/taxonomy-overrides.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}]
};
