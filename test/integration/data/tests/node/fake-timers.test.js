import { after, before, describe, it } from 'node:test';
import { createSandbox } from 'sinon';

const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

const fakeNow = 1234567890;

describe('fake timers', () => {
	let sandbox;

	before(() => {
		sandbox = createSandbox();

		sandbox.useFakeTimers({ now: fakeNow, toFake: ['Date'] });
	});

	after(() => sandbox.restore());

	it('passed', async() => { await delay(); });

	it('failed', () => { throw new Error('fail'); });
});
