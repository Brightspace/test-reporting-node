import { test } from '@playwright/test';

const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

test.describe('reporter 2', () => {
	test.beforeAll(async() => { await delay(250); });

	test.beforeEach(async() => { await delay(250); });

	test('passed', async() => { await delay(); });

	test.skip('skipped', () => {});

	// eslint-disable-next-line no-empty-pattern
	test('flaky', async({}, testInfo) => {
		if (testInfo.retry < 2) {
			await delay();

			throw new Error('flaky test failure');
		}

		await delay();
	});

	test('failed', () => { throw new Error('fail'); });

	test.afterEach(async() => { await delay(250); });

	test.afterAll(async() => { await delay(250); });
});
