module.exports = {
	spec: 'test/integration/data/mocha-*.test.js',
	retries: 3,
	reporter: 'src/reporters/mocha.cjs',
	'reporter-option': [
		'reportPath=./d2l-test-report-mocha.json',
		'reportConfigurationPath=./test/integration/data/config/d2l-test-reporting.json'
	]
};
