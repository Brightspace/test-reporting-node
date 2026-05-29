import { latestReportVersion } from '../../../../src/helpers/schema.cjs';

export const testReportLatestPartial = {
	version: latestReportVersion,
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
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'reporter 1 > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-1.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'reporter 1 > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-1.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'accessibility' },
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'accessibility' },
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'accessibility' },
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'accessibility' },
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'accessibility' },
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'accessibility' },
		retries: 0
	}, {
		name: '[group 2] > reporter 1 > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-1.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 2] > reporter 1 > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-1.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 2] > reporter 1 > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-1.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'reporter 1 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-1.test.js' },
		browser: 'chrome',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'chromium',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'accessibility' },
		retries: 0
	}, {
		name: '[group 1] > reporter 2 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-2.test.js' },
		browser: 'firefox',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'Test Reporting', type: 'accessibility' },
		retries: 0
	}, {
		name: '[group 2] > reporter 1 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/web-test-runner/reporter-1.test.js' },
		browser: 'webkit',
		configuration: { timeout: 120000 },
		taxonomy: { tool: 'WebTestRunner 1 Test Reporting', type: 'integration' },
		retries: 0
	}]
};
