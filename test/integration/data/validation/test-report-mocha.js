export const testReportV1Partial = {
	reportVersion: 1,
	summary: {
		status: 'failed',
		framework: 'mocha',
		countPassed: 2,
		countFailed: 2,
		countSkipped: 2,
		countFlaky: 2
	},
	details: [{
		name: 'reporter tests 1 > test',
		status: 'passed',
		location: 'test/integration/data/mocha-1.test.js',
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: 'reporter tests 1 > skipped test',
		status: 'skipped',
		location: 'test/integration/data/mocha-1.test.js',
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: 'reporter tests 1 > flaky test',
		status: 'passed',
		location: 'test/integration/data/mocha-1.test.js',
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 2
	}, {
		name: 'reporter tests 1 > failed test',
		status: 'failed',
		location: 'test/integration/data/mocha-1.test.js',
		tool: 'Mocha 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 3
	}, {
		name: 'reporter tests 2 > test',
		status: 'passed',
		location: 'test/integration/data/mocha-2.test.js',
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'reporter tests 2 > skipped test',
		status: 'skipped',
		location: 'test/integration/data/mocha-2.test.js',
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: 'reporter tests 2 > flaky test',
		status: 'passed',
		location: 'test/integration/data/mocha-2.test.js',
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: 'reporter tests 2 > failed test',
		status: 'failed',
		location: 'test/integration/data/mocha-2.test.js',
		tool: 'Test Reporting',
		experience: 'Mocha 2 Test Framework',
		type: 'integration',
		retries: 3
	}]
};
