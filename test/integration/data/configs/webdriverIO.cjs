const { join } = require('path');

exports.config = {
	specs: [
		join(__dirname, '../tests/webdriverIO/reporter-1.test.js'),
		join(__dirname, '../tests/webdriverIO/reporter-2.test.js')
	],
	maxInstances: 1,
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
		[join(__dirname, '../../../../src/reporters/webdriverIO.cjs'), {
			reportPath: './d2l-test-report-webdriverIO.json',
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
