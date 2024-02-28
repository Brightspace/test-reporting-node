import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	reporter: [
		['list'],
		[
			'../../../../src/reporters/playwright.js',
			{
				reportPath: './d2l-test-report-playwright.json',
				verbose: true
			}
		]
	],
	retries: 3,
	fullyParallel: true,
	testDir: '../',
	testMatch: 'playwright-*.test.js',
	use: devices['Desktop Chrome'],
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
		use: devices['Desktop Firefox'],
		dependencies: ['setup']
	}, {
		name: 'webkit',
		use: devices['Desktop Safari'],
		dependencies: ['setup']
	}]
});
