const { createSandbox } = require('sinon');

const realSetTimeout = setTimeout;

const delay = (ms = 50) => {
	return new Promise(resolve => realSetTimeout(resolve, ms));
};

const fakeNow = 1234567890;

describe('fake timers', () => {
	let sandbox;

	beforeAll(() => {
		sandbox = createSandbox();

		sandbox.useFakeTimers(fakeNow);
	});

	afterAll(() => sandbox.restore());

	test('passed', async() => { await delay(); });

	test('failed', () => { throw new Error('fail'); });
});
