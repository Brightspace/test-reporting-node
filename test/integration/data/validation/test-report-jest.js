import { latestReportVersion } from '../../../../src/helpers/schema.cjs';

export const testReportLatestPartial = {
	version: latestReportVersion,
	summary: {
		status: 'failed',
		framework: 'jest',
		count: { passed: 8, failed: 11, skipped: 2, flaky: 0 }
	},
	details: [{
		name: 'hook failures > before all failure > test with before all failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/jest/hook-failures.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Jest Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > before each failure > test with before each failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/jest/hook-failures.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Jest Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: 'hook failures > after each failure > test with after each failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/jest/hook-failures.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Jest Hook Failures Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: 'fake timers > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/jest/fake-timers.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'fake timers > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/jest/fake-timers.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 3
	}, {
		name: 'special characters > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/jest/special-characters.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'custom timeout > suite level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/jest/custom-timeout.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'custom timeout > test level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/jest/custom-timeout.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'hook failures > after all failure > test with after all failure',
		status: 'passed',
		location: { file: 'test/integration/data/tests/jest/hook-failures.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Jest Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > flaky before all > test with flaky before all',
		status: 'failed',
		location: { file: 'test/integration/data/tests/jest/hook-failures.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Jest Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > flaky before each > test with flaky before each',
		status: 'failed',
		location: { file: 'test/integration/data/tests/jest/hook-failures.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Jest Hook Failures Test Reporting', type: 'ui' },
		retries: 2
	}, {
		name: 'hook failures > flaky after each > test with flaky after each',
		status: 'failed',
		location: { file: 'test/integration/data/tests/jest/hook-failures.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Jest Hook Failures Test Reporting', type: 'ui' },
		retries: 2
	}, {
		name: 'hook failures > flaky after all > test with flaky after all',
		status: 'passed',
		location: { file: 'test/integration/data/tests/jest/hook-failures.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Jest Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'statuses > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/jest/statuses.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Jest 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'taxonomy overrides > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/jest/taxonomy-overrides.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'statuses > flaky',
		status: 'failed',
		location: { file: 'test/integration/data/tests/jest/statuses.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Jest 1 Test Reporting', type: 'ui' },
		retries: 2
	}, {
		name: 'taxonomy overrides > flaky',
		status: 'failed',
		location: { file: 'test/integration/data/tests/jest/taxonomy-overrides.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 2
	}, {
		name: 'statuses > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/jest/statuses.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Jest 1 Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: 'taxonomy overrides > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/jest/taxonomy-overrides.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 3
	}, {
		name: 'statuses > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/jest/statuses.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Jest 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'taxonomy overrides > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/jest/taxonomy-overrides.test.cjs' },
		configuration: { timeout: 5000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}]
};
