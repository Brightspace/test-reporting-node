import { test } from '@playwright/test';

const delay = () => {
	return new Promise(resolve => setTimeout(resolve, 100));
};

test.describe('reporter tests 2', () => {
	test('test', () => {});

	test.skip('skipped test', () => {});

	// eslint-disable-next-line no-empty-pattern
	test('flaky test', async({}, testInfo) => {
		if (testInfo.retry < 2) {
			await delay();

			throw new Error('flaky test failure');
		}
	});

	test('failed test', () => { throw new Error('fail'); });
});
