import { defineConfig, devices } from '@playwright/test';

const playwrightReporterOptions = {
	reportPath: './d2l-test-report-playwright.json',
	reportConfigurationPath: './test/integration/configs/d2l-test-reporting.config.json'
};

export default defineConfig({
	reporter: [
		['../../../src/reporters/playwright.js', playwrightReporterOptions],
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
		use: devices['Desktop Firefox'],
		testMatch: 'playwright-2.test.js'
	}, {
		name: 'webkit',
		use: devices['Desktop Safari']
	}]
});
