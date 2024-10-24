import { defaultReporter } from '@web/test-runner';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';
import { reporter } from '../../../../src/reporters/web-test-runner.js';

export default {
	reporters: [
		defaultReporter(),
		reporter({
			reportPath: './d2l-test-report-web-test-runner.json',
			verbose: true
		})
	],
	files: [
		'./test/integration/data/tests/web-test-runner/reporter-1.test.js',
		'./test/integration/data/tests/web-test-runner/reporter-3.test.js'
	],
	groups: [{
		name: 'group 1',
		files: './test/integration/data/tests/web-test-runner/reporter-2.test.js',
		browsers: [
			puppeteerLauncher({ launchOptions: { headless: 'new' } }),
			playwrightLauncher({ product: 'firefox' })
		]
	}, {
		name: 'group 2',
		browsers: [
			playwrightLauncher({ product: 'webkit' })
		]
	}]
};
