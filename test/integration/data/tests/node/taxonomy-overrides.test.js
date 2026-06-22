import { describe, it } from 'node:test';

const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

describe('taxonomy overrides', () => {
	it('passed', async() => { await delay(); });

	it('skipped', { skip: true }, () => {});

	it('failed', async() => {
		await delay();

		throw new Error('fail');
	});
});
