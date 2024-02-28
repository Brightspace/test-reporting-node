import base from '@playwright/test';

export const test = base.extend({
	_annotateBrowser: [
		async({ browser }, use, testInfo) => {
			const browserName = browser.browserType().name();

			testInfo.annotations.push({ type: 'browser', description: browserName });

			await use();
		}, {
			scope: 'test',
			auto: true
		}]
});

export const setup = base.extend({
	_annotateSetup: [
		// eslint-disable-next-line no-empty-pattern
		async({}, use, testInfo) => {
			testInfo.annotations.push({ type: 'setup' });

			await use();
		}, {
			scope: 'test',
			auto: true
		}]
});

export const teardown = base.extend({
	_annotateTeardown: [
		// eslint-disable-next-line no-empty-pattern
		async({}, use, testInfo) => {
			testInfo.annotations.push({ type: 'teardown' });

			await use();
		}, {
			scope: 'test',
			auto: true
		}]
});
