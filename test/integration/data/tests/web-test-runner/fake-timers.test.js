import { createSandbox } from 'sinon';

const realSetTimeout = setTimeout;

const delay = (ms = 50) => {
	return new Promise(resolve => realSetTimeout(resolve, ms));
};

const fakeNow = 1234567890;

describe('fake timers', () => {
	let sandbox;

	before(() => {
		sandbox = createSandbox();

		sandbox.useFakeTimers(fakeNow);
	});

	after(() => sandbox.restore());

	it('passed', async() => { await delay(); });

	it('failed', () => { throw new Error('fail'); });
});
