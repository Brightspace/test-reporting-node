const { createSandbox } = require('sinon');
const { mock } = require('node:test');

const realSetTimeout = setTimeout;

const delay = (ms = 50) => {
	return new Promise(resolve => realSetTimeout(resolve, ms));
};

const fakeNow = 1234567890;

describe('fake timers', () => {
	describe('sinon', () => {
		let sandbox;

		beforeAll(() => {
			sandbox = createSandbox();

			sandbox.useFakeTimers(fakeNow);
		});

		afterAll(() => sandbox.restore());

		test('passed', async() => { await delay(); });

		test('failed', () => { throw new Error('fail'); });
	});

	describe('node', () => {
		beforeAll(() => mock.timers.enable({ apis: ['Date'], now: fakeNow }));

		afterAll(() => mock.timers.reset());

		test('passed', async() => { await delay(); });

		test('failed', () => { throw new Error('fail'); });
	});
});
