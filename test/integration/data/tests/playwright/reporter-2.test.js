import { test } from '@playwright/test';

const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

test.describe('reporter 2', () => {
	test.beforeAll(async() => { await delay(250); });

	test.beforeEach(async() => { await delay(250); });

	test('passed', async() => { await delay(); });

	test.skip('skipped static', () => {});

	test.fixme('skipped static, fixme', () => {});

	test('skipped dynamic', ({}, testInfo) => {
		testInfo.skip();
	});

	test('skipped dynamic, fixme', ({}, testInfo) => {
		testInfo.fixme();
	});

	test('flaky', async({}, testInfo) => {
		if (testInfo.retry < 2) {
			await delay();

			throw new Error('flaky test failure');
		}

		await delay();
	});

	test('failed', () => { throw new Error('fail'); });

	test.fail('failed static expected', () => { throw new Error('fail'); });

	test('failed dynamic expected', ({}, testInfo) => {
		testInfo.fail();

		throw new Error('fail');
	});

	test.fail('failed static expected, skipped dynamic', ({}, testInfo) => {
		testInfo.skip();

		throw new Error('fail');
	});

	test.fail('failed static expected, skipped dynamic, fixme', ({}, testInfo) => {
		testInfo.fixme();

		throw new Error('fail');
	});

	test(' special/characters "(\n\r\t\b\f)" ', async() => { await delay(); });

	test.afterEach(async() => { await delay(250); });

	test.afterAll(async() => { await delay(250); });
});
