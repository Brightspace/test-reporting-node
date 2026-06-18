import { createSandbox } from 'sinon';
import { test } from '@playwright/test';

const realSetTimeout = setTimeout;

const delay = (ms = 50) => {
	return new Promise(resolve => realSetTimeout(resolve, ms));
};

const fakeNow = 1234567890;

test.describe('fake timers', () => {
	let sandbox;

	test.beforeAll(() => {
		sandbox = createSandbox();

		sandbox.useFakeTimers({ now: fakeNow, shouldClearNativeTimers: true });
	});

	test.afterAll(() => sandbox.restore());

	test('passed', async() => { await delay(); });

	test('failed', () => { throw new Error('fail'); });
});
