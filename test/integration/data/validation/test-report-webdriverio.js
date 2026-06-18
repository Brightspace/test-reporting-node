import { getOperatingSystemType } from '../../../../src/helpers/system.cjs';

const platform = getOperatingSystemType();

import { latestReportVersion } from '../../../../src/helpers/schema.cjs';

export const testReportLatestPartial = {
	version: latestReportVersion,
	summary: {
		status: 'failed',
		framework: 'webdriverio',
		count: { passed: 10, failed: 7, skipped: 2, flaky: 2 }
	},
	details: [{
		name: `[${platform}] > taxonomy overrides > passed`,
		browser: 'chrome',
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/taxonomy-overrides.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: `[${platform}] > taxonomy overrides > skipped`,
		browser: 'chrome',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/webdriverio/taxonomy-overrides.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: `[${platform}] > taxonomy overrides > flaky`,
		browser: 'chrome',
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/taxonomy-overrides.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 2
	}, {
		name: `[${platform}] > taxonomy overrides > failed`,
		browser: 'chrome',
		status: 'failed',
		location: { file: 'test/integration/data/tests/webdriverio/taxonomy-overrides.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 3
	}, {
		name: `[${platform}] > statuses > passed`,
		browser: 'chrome',
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/statuses.test.js' },
		taxonomy: { tool: 'WebdriverIO 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: `[${platform}] > statuses > skipped`,
		browser: 'chrome',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/webdriverio/statuses.test.js' },
		taxonomy: { tool: 'WebdriverIO 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: `[${platform}] > statuses > flaky`,
		browser: 'chrome',
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/statuses.test.js' },
		taxonomy: { tool: 'WebdriverIO 1 Test Reporting', type: 'ui' },
		retries: 2
	}, {
		name: `[${platform}] > statuses > failed`,
		browser: 'chrome',
		status: 'failed',
		location: { file: 'test/integration/data/tests/webdriverio/statuses.test.js' },
		taxonomy: { tool: 'WebdriverIO 1 Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: `[${platform}] > special characters > special/characters "(\\n\\r\\t\\b\\f)"`,
		browser: 'chrome',
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/special-characters.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: `[${platform}] > hook failures > before all failure > test with before all failure`,
		browser: 'chrome',
		status: 'failed',
		location: { file: 'test/integration/data/tests/webdriverio/hook-failures.test.js' },
		taxonomy: { tool: 'WebdriverIO Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: `[${platform}] > hook failures > before each failure > test with before each failure`,
		browser: 'chrome',
		status: 'failed',
		location: { file: 'test/integration/data/tests/webdriverio/hook-failures.test.js' },
		taxonomy: { tool: 'WebdriverIO Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: `[${platform}] > hook failures > after each failure > test with after each failure`,
		browser: 'chrome',
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/hook-failures.test.js' },
		taxonomy: { tool: 'WebdriverIO Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: `[${platform}] > hook failures > after all failure > test with after all failure`,
		browser: 'chrome',
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/hook-failures.test.js' },
		taxonomy: { tool: 'WebdriverIO Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: `[${platform}] > hook failures > flaky before all > test with flaky before all`,
		browser: 'chrome',
		status: 'failed',
		location: { file: 'test/integration/data/tests/webdriverio/hook-failures.test.js' },
		taxonomy: { tool: 'WebdriverIO Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: `[${platform}] > hook failures > flaky before each > test with flaky before each`,
		browser: 'chrome',
		status: 'failed',
		location: { file: 'test/integration/data/tests/webdriverio/hook-failures.test.js' },
		taxonomy: { tool: 'WebdriverIO Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: `[${platform}] > hook failures > flaky after each > test with flaky after each`,
		browser: 'chrome',
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/hook-failures.test.js' },
		taxonomy: { tool: 'WebdriverIO Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: `[${platform}] > hook failures > flaky after all > test with flaky after all`,
		browser: 'chrome',
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/hook-failures.test.js' },
		taxonomy: { tool: 'WebdriverIO Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: `[${platform}] > fake timers > passed`,
		browser: 'chrome',
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/fake-timers.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: `[${platform}] > fake timers > failed`,
		browser: 'chrome',
		status: 'failed',
		location: { file: 'test/integration/data/tests/webdriverio/fake-timers.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 3
	}, {
		name: `[${platform}] > custom timeout > suite level timeout`,
		browser: 'chrome',
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/custom-timeout.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: `[${platform}] > custom timeout > test level timeout`,
		browser: 'chrome',
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/custom-timeout.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}]
};
