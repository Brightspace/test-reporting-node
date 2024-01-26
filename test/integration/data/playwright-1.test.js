import { test } from '@playwright/test';

const delay = () => {
	return new Promise(resolve => setTimeout(resolve, 250));
};

test.describe('reporter tests 1', () => {
	test('test', () => { });

	test.skip('skipped test', () => { });

	// eslint-disable-next-line no-unused-vars
	test('flaky test', async({ page }, testInfo) => {
		if (testInfo.retry < 2) {
			await delay();

			throw new Error('flaky test failure');
		}
	});

	test('failed test', () => { throw new Error('fail'); });
});
