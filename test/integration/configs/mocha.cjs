module.exports = {
	spec: 'test/integration/mocha-*.test.js',
	retries: 3,
	reporter: 'src/reporters/mocha.cjs',
	'reporter-option': [
		'reportPath=./d2l-test-report-mocha.json'
	]
};
