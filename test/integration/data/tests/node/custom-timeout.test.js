import { describe, it } from 'node:test';

const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

describe('custom timeout', { timeout: 5000 }, () => {
	it('suite level timeout', async() => { await delay(); });

	it('test level timeout', { timeout: 10000 }, async() => { await delay(); });
});
