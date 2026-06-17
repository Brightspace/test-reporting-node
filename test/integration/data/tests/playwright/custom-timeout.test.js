import { test } from '@playwright/test';

const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

test.describe.configure({ timeout: 5000 });

test.describe('custom timeout', () => {
	test('suite level timeout', async() => { await delay(); });

	test('test level timeout', async({}, testInfo) => {
		testInfo.setTimeout(10000);

		await delay();
	});
});
