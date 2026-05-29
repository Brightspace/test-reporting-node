import { latestReportVersion } from '../../../../src/helpers/schema.cjs';

export const testReportLatestPartial = {
	version: latestReportVersion,
	summary: {
		status: 'failed',
		framework: 'mocha',
		count: { passed: 9, failed: 6, skipped: 2, flaky: 2 }
	},
	details: [{
		name: 'custom timeout > suite level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/custom-timeout.test.js' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'custom timeout > test level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/custom-timeout.test.js' },
		configuration: { timeout: 10000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'hook failures > before all failure > test with before all failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > before each failure > test with before each failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > after each failure > test with after each failure',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > after all failure > test with after all failure',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > flaky before all > test with flaky before all',
		status: 'failed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > flaky before each > test with flaky before each',
		status: 'failed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > flaky after each > test with flaky after each',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > flaky after all > test with flaky after all',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'special characters > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/special-characters.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'statuses > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/statuses.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Mocha 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'statuses > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/mocha/statuses.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Mocha 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'statuses > flaky',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/statuses.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Mocha 1 Test Reporting', type: 'ui' },
		retries: 2
	}, {
		name: 'statuses > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/mocha/statuses.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Mocha 1 Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: 'taxonomy overrides > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/taxonomy-overrides.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'taxonomy overrides > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/mocha/taxonomy-overrides.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'taxonomy overrides > flaky',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/taxonomy-overrides.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 2
	}, {
		name: 'taxonomy overrides > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/mocha/taxonomy-overrides.test.js' },
		configuration: { timeout: 2000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 3
	}]
};
