export const testReportV2Partial = {
	version: 2,
	summary: {
		status: 'failed',
		framework: 'mocha',
		count: { passed: 4, failed: 2, skipped: 2, flaky: 2 }
	},
	details: [{
		name: 'reporter 1 > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/reporter-1.test.js' },
		timeout: 2000,
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: 'reporter 1 > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/mocha/reporter-1.test.js' },
		timeout: 2000,
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: 'reporter 1 > flaky',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/reporter-1.test.js' },
		timeout: 2000,
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 2
	}, {
		name: 'reporter 1 > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/mocha/reporter-1.test.js' },
		timeout: 2000,
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 3
	}, {
		name: 'reporter 2 > passed',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/reporter-2.test.js' },
		timeout: 2000,
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'reporter 2 > skipped',
		status: 'skipped',
		location: { file: 'test/integration/data/tests/mocha/reporter-2.test.js' },
		timeout: 2000,
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'reporter 2 > flaky',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/reporter-2.test.js' },
		timeout: 2000,
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: 'reporter 2 > failed',
		status: 'failed',
		location: { file: 'test/integration/data/tests/mocha/reporter-2.test.js' },
		timeout: 2000,
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 3
	}, {
		name: 'reporter 1 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/reporter-1.test.js' },
		timeout: 2000,
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: 'reporter 2 > special/characters "(\\n\\r\\t\\b\\f)"',
		status: 'passed',
		location: { file: 'test/integration/data/tests/mocha/reporter-2.test.js' },
		timeout: 2000,
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 0
	}]
};
