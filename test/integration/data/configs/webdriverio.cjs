const { join } = require('node:path');

exports.config = {
	specs: [
		join(__dirname, '../tests/webdriverio/reporter-1.test.js'),
		join(__dirname, '../tests/webdriverio/reporter-2.test.js')
	],
	maxInstances: 1,
	specFileRetries: 0,
	capabilities: [{
		browserName: 'chrome',
		maxInstances: 1,
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
	}
};
