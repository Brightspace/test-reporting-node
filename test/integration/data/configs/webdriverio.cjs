const { join } = require('node:path');
const { mergeReports } = require('../../../../src/helpers/merge-reports.cjs');

exports.config = {
	specs: [
		join(__dirname, '../tests/webdriverio/reporter-1.test.js'),
		join(__dirname, '../tests/webdriverio/reporter-2.test.js'),
		join(__dirname, '../tests/webdriverio/reporter-3.test.js')
	],
	maxInstances: 2,
	capabilities: [{
		browserName: 'chrome',
		'goog:chromeOptions': {
			args: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
		}
	}],
	logLevel: 'error',
	bail: 0,
	waitforTimeout: 10000,
	connectionRetryTimeout: 120000,
	connectionRetryCount: 3,
	framework: 'mocha',
	reporters: [
		'spec',
		[join(__dirname, '../../../../src/reporters/webdriverio.cjs'), {
			reportPath: './d2l-test-report-webdriverio.json',
			reportConfigurationPath: './d2l-test-reporting.config.json',
			verbose: true
		}]
	],
	mochaOpts: {
		ui: 'bdd',
		timeout: 60000,
		retries: 3
	},
	onComplete: function() {
		// Merge all worker reports into a single final report
		mergeReports(
			'./d2l-test-report-webdriverio-*.json',
			'./d2l-test-report-webdriverio.json'
		);
	}
};
