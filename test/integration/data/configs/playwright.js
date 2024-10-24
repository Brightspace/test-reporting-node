import { defineConfig, devices } from '@playwright/test';

const playwrightReporterOptions = {
	reportPath: './d2l-test-report-playwright.json',
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
	testDir: '../tests/playwright/',
	testMatch: '*.test.js',
	use: deviceTypeChrome,
	globalSetup: '../tests/playwright/global.setup.js',
	globalTeardown: '../tests/playwright/global.teardown.js',
	projects: [{
		name: 'setup',
		testMatch: 'setup.js',
		teardown: 'teardown'
	}, {
		name: 'teardown',
		testMatch: 'teardown.js'
	}, {
		name: 'chromium',
		dependencies: ['setup']
	}, {
		name: 'firefox',
		testMatch: 'reporter-2.test.js',
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
