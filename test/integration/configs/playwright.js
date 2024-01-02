import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	reporter: [
		['../../../src/reporters/playwright.js', { reportPath: './d2l-test-report-playwright.json' }],
		['list']
	],
	retries: 3,
	fullyParallel: true,
	testDir: '../',
	testMatch: 'playwright-*.test.js',
	projects: [{
		name: 'chromium',
		use: devices['Desktop Chrome']
	}, {
		name: 'firefox',
		use: devices['Desktop Firefox']
	}, {
		name: 'webkit',
		use: devices['Desktop Safari']
	}]
});
