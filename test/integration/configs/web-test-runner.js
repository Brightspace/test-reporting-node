import { defaultReporter } from '@web/test-runner';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { reporter } from '../../../src/reporters/web-test-runner.js';

export default {
	reporters: [
		defaultReporter(),
		reporter({
			reportPath: './d2l-test-report-web-test-runner.json',
			reportConfigurationPath: './test/integration/configs/d2l-test-reporting.config.json'
		})
	],
	files: 'test/integration/web-test-runner-1.test.js',
	groups: [{
		name: 'group 1',
		files: 'test/integration/web-test-runner-2.test.js',
		browsers: [
			playwrightLauncher({ product: 'chromium' }),
			playwrightLauncher({ product: 'firefox' })
		]
	}, {
		name: 'group 2',
		browsers: [
			playwrightLauncher({ product: 'webkit' })
		]
	}]
};
