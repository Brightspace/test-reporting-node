module.exports = {
	src: './test/integration/data/testcafe-*.test.js',
	browsers: ['chrome:headless', 'firefox:headless', 'edge:headless'],
	baseUrl: 'http://localhost:8080',
	color: true,
	concurrency: 1,
	quarantineMode: {
		successThreshold: 1,
		attemptLimit: 4
	},
	reporter: [
		'spec',
		{
			name: 'custom',
			output: './d2l-test-report-testcafe.json'
		}
	]
};
