import { latestReportVersion } from '../../../../src/helpers/schema.cjs';

export const testReportLatestPartial = {
	version: latestReportVersion,
	summary: {
		status: 'failed',
		framework: 'mocha',
		count: { passed: 10, failed: 6, skipped: 2, flaky: 2 }
	},
	details: [{
		name: 'custom timeout > suite level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/custom-timeout.test.js' },
		config: { timeout: 5000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'custom timeout > test level timeout',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/custom-timeout.test.js' },
		config: { timeout: 10000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'reporter 1 > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/reporter-1.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Mocha 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'reporter 1 > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/mocha/reporter-1.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Mocha 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'reporter 1 > flaky',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/reporter-1.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Mocha 1 Test Reporting', type: 'ui' },
		retries: 2
	}, {
		name: 'reporter 1 > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/mocha/reporter-1.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Mocha 1 Test Reporting', type: 'ui' },
		retries: 3
	}, {
		name: 'reporter 2 > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/reporter-2.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'reporter 2 > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/mocha/reporter-2.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'reporter 2 > flaky',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/reporter-2.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 2
	}, {
		name: 'reporter 2 > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/mocha/reporter-2.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 3
	}, {
		name: 'reporter 1 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/reporter-1.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Mocha 1 Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'reporter 2 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/reporter-2.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Test Reporting', type: 'integration' },
		retries: 0
	}, {
		name: 'hook failures > before all failure > test with before all failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > before each failure > test with before each failure',
		status: 'failed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > after each failure > test with after each failure',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > after all failure > test with after all failure',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > flaky before all > test with flaky before all',
		status: 'failed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > flaky before each > test with flaky before each',
		status: 'failed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > flaky after each > test with flaky after each',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}, {
		name: 'hook failures > flaky after all > test with flaky after all',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/hook-failures.test.js' },
		config: { timeout: 2000 },
		taxonomy: { tool: 'Mocha Hook Failures Test Reporting', type: 'ui' },
		retries: 0
	}]
};
