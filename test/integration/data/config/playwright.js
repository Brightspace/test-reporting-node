import { defineConfig, devices } from '@playwright/test';

const playwrightReporterOptions = {
	reportPath: './d2l-test-report-playwright.json',
	reportConfigurationPath: './test/integration/data/config/d2l-test-reporting.json',
	verbose: true
};

const deviceTypeChrome = devices['Desktop Chrome'];
const deviceTypeFirefox = devices['Desktop Firefox'];
const deviceTypeSafari = devices['Desktop Safari'];

export default defineConfig({
	reporter: [
		['../../../../src/reporters/playwright.js', playwrightReporterOptions],
		['list']
	],
	retries: 3,
	fullyParallel: true,
	testDir: '../',
	testMatch: 'playwright-*.test.js',
	use: deviceTypeChrome,
	globalSetup: '../playwright.global.setup.js',
	globalTeardown: '../playwright.global.teardown.js',
	projects: [{
		name: 'setup',
		testMatch: 'playwright.setup.js',
		teardown: 'teardown'
	}, {
		name: 'teardown',
		testMatch: 'playwright.teardown.js'
	}, {
		name: 'chromium',
		dependencies: ['setup']
	}, {
		name: 'firefox',
		testMatch: 'playwright-2.test.js',
		use: deviceTypeFirefox,
		dependencies: ['setup'],
		metadata: {
			browserType: deviceTypeFirefox.defaultBrowserType
		}
	}, {
		name: 'webkit',
		use: deviceTypeSafari,
		dependencies: ['setup'],
		metadata: {
			browserType: deviceTypeSafari.defaultBrowserType
		}
	}]
});
