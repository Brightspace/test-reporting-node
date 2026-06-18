import { test } from '@playwright/test';

const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

test.describe('hook failures', () => {
	test.describe('before all failure', () => {
		test.beforeAll(() => { throw new Error('before all hook failure'); });

		test('test with before all failure', async() => { await delay(); });
	});

	test.describe('before each failure', () => {
		test.beforeEach(() => { throw new Error('before each hook failure'); });

		test('test with before each failure', async() => { await delay(); });
	});

	test.describe('after each failure', () => {
		test.afterEach(() => { throw new Error('after each hook failure'); });

		test('test with after each failure', async() => { await delay(); });
	});

	test.describe('after all failure', () => {
		test.afterAll(() => { throw new Error('after all hook failure'); });

		test('test with after all failure', async() => { await delay(); });
	});

	test.describe('flaky before all', () => {
		let beforeAllCount = 0;

		test.beforeAll(() => {
			if (beforeAllCount < 2) {
				beforeAllCount++;

				throw new Error('flaky before all');
			}
		});

		test('test with flaky before all', async() => { await delay(); });
	});

	test.describe('flaky before each', () => {
		let beforeEachCount = 0;

		test.beforeEach(() => {
			if (beforeEachCount < 2) {
				beforeEachCount++;

				throw new Error('flaky before each');
			}
		});

		test('test with flaky before each', async() => { await delay(); });
	});

	test.describe('flaky after each', () => {
		let afterEachCount = 0;

		test.afterEach(() => {
			if (afterEachCount < 2) {
				afterEachCount++;

				throw new Error('flaky after each');
			}
		});

		test('test with flaky after each', async() => { await delay(); });
	});

	test.describe('flaky after all', () => {
		let afterAllCount = 0;

		test.afterAll(() => {
			if (afterAllCount < 2) {
				afterAllCount++;

				throw new Error('flaky after all');
			}
		});

		test('test with flaky after all', async() => { await delay(); });
	});
});
