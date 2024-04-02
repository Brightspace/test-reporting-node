import { test } from '@playwright/test';

const delay = (ms = 100) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

test.describe('reporter tests 2', () => {
	test.beforeAll(async() => { await delay(1000); });

	test.beforeEach(async() => { await delay(1000); });

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

	test.afterEach(async() => { await delay(1000); });

	test.afterAll(async() => { await delay(1000); });
});
