import { latestReportVersion } from '../../../../src/helpers/schema.cjs';

export const testReportLatestPartial = {
	version: latestReportVersion,
	summary: {
		status: 'failed',
		framework: 'node',
		count: { passed: 9, failed: 12, skipped: 2, flaky: 0 }
	},
	details: [{
		name: 'custom timeout > suite level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/node/custom-timeout.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'custom timeout > test level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/node/custom-timeout.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'fake timers > sinon > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/node/fake-timers.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'fake timers > sinon > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/node/fake-timers.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'fake timers > node > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/node/fake-timers.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'fake timers > node > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/node/fake-timers.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'hook failures > before all failure > test with before all failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/node/hook-failures.test.js' },
		taxonomy: { tool: 'Node Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > before each failure > test with before each failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/node/hook-failures.test.js' },
		taxonomy: { tool: 'Node Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > after each failure > test with after each failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/node/hook-failures.test.js' },
		taxonomy: { tool: 'Node Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > after all failure > test with after all failure',
		status: 'passed',
		location: { file: 'test/integration/data/tests/node/hook-failures.test.js' },
		taxonomy: { tool: 'Node Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > flaky before all > test with flaky before all',
		status: 'failed',
		location: { file: 'test/integration/data/tests/node/hook-failures.test.js' },
		taxonomy: { tool: 'Node Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > flaky before each > test with flaky before each',
		status: 'failed',
		location: { file: 'test/integration/data/tests/node/hook-failures.test.js' },
		taxonomy: { tool: 'Node Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > flaky after each > test with flaky after each',
		status: 'failed',
		location: { file: 'test/integration/data/tests/node/hook-failures.test.js' },
		taxonomy: { tool: 'Node Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > flaky after all > test with flaky after all',
		status: 'passed',
		location: { file: 'test/integration/data/tests/node/hook-failures.test.js' },
		taxonomy: { tool: 'Node Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'special characters > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/node/special-characters.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'statuses > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/node/statuses.test.js' },
		taxonomy: { tool: 'Node 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'statuses > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/node/statuses.test.js' },
		taxonomy: { tool: 'Node 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'statuses > flaky',
		status: 'failed',
		location: { file: 'test/integration/data/tests/node/statuses.test.js' },
		taxonomy: { tool: 'Node 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'statuses > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/node/statuses.test.js' },
		taxonomy: { tool: 'Node 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'taxonomy overrides > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/node/taxonomy-overrides.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'taxonomy overrides > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/node/taxonomy-overrides.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'taxonomy overrides > flaky',
		status: 'failed',
		location: { file: 'test/integration/data/tests/node/taxonomy-overrides.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'taxonomy overrides > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/node/taxonomy-overrides.test.js' },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}]
};
