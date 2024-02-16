module.exports = {
	spec: 'test/integration/data/mocha-*.test.js',
	retries: 3,
	reporter: 'src/reporters/mocha.cjs',
	reporterOptions: [
		'reportPath=./d2l-test-report-mocha.json',
		'verbose=true'
	]
};
