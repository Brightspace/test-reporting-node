import { defineConfig, devices } from '@playwright/test';

const playwrightReporterOptions = {
	reportPath: './d2l-test-report-playwright.json',
	reportConfigurationPath: './test/integration/data/config/d2l-test-reporting.json'
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
	projects: [{
		name: 'chromium'
	}, {
		name: 'firefox',
		testMatch: 'playwright-2.test.js',
		use: deviceTypeFirefox,
		metadata: {
			browserType: deviceTypeFirefox.defaultBrowserType
		}
	}, {
		name: 'webkit',
		use: deviceTypeSafari,
		metadata: {
			browserType: deviceTypeSafari.defaultBrowserType
		}
	}]
});
