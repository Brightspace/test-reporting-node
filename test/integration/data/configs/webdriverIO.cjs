module.exports = {
	spec: 'test/integration/data/tests/webdriverIO/*.test.js',
	retries: 3,
	reporter: 'src/reporters/webdriverIO.cjs',
	reporterOptions: [
		'reportPath=./d2l-test-report-webdriverIO.json',
		'verbose=true'
	]
};
