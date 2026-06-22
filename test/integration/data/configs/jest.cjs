const { join } = require('node:path');

const reporterPath = join(__dirname, '../../../../src/reporters/jest.cjs');

module.exports = {
	rootDir: '../../../../',
	testEnvironment: 'node',
	testTimeout: 5000,
	testLocationInResults: true,
	testMatch: ['<rootDir>/test/integration/data/tests/jest/*.test.cjs'],
	reporters: [
		'default',
		[reporterPath, {
			reportPath: './d2l-test-report-jest.json',
			reportConfigurationPath: './test/integration/data/d2l-test-reporting.config.json',
			verbose: true
		}]
	],
	setupFilesAfterEnv: ['<rootDir>/test/integration/data/tests/jest/setup.cjs']
};
