import { createSandbox } from 'sinon';
import { mock } from 'node:test';

const realSetTimeout = setTimeout;

const delay = (ms = 50) => {
	return new Promise(resolve => realSetTimeout(resolve, ms));
};

const fakeNow = 1234567890;

describe('fake timers', () => {
	describe('sinon', () => {
		let sandbox;

		before(() => {
			sandbox = createSandbox();

			sandbox.useFakeTimers(fakeNow);
		});

		after(() => sandbox.restore());

		it('passed', async() => { await delay(); });

		it('failed', () => { throw new Error('fail'); });
	});

	describe('node', () => {
		before(() => mock.timers.enable({ apis: ['Date'], now: fakeNow }));

		after(() => mock.timers.reset());

		it('passed', async() => { await delay(); });

		it('failed', () => { throw new Error('fail'); });
	});
});
