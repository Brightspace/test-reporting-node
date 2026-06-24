import { createSandbox } from 'sinon';
import { mock } from 'node:test';
import { test } from '@playwright/test';

const realSetTimeout = setTimeout;

const delay = (ms = 50) => {
	return new Promise(resolve => realSetTimeout(resolve, ms));
};

const fakeNow = 1234567890;

test.describe('fake timers', () => {
	test.describe('sinon', () => {
		let sandbox;

		test.beforeAll(() => {
			sandbox = createSandbox();

			sandbox.useFakeTimers({ now: fakeNow, shouldClearNativeTimers: true });
		});

		test.afterAll(() => sandbox.restore());

		test('passed', async() => { await delay(); });

		test('failed', () => { throw new Error('fail'); });
	});

	test.describe('node', () => {
		test.beforeAll(() => mock.timers.enable({ apis: ['Date'], now: fakeNow }));

		test.afterAll(() => mock.timers.reset());

		test('passed', async() => { await delay(); });

		test('failed', () => { throw new Error('fail'); });
	});
});
