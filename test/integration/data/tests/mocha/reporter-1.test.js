const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

describe('reporter 1', () => {
	let count = 0;

	before(async() => { await delay(250); });

	beforeEach(async() => { await delay(250); });

	it('passed', async() => { await delay(); });

	it.skip('skipped', () => {});

	it('flaky', async() => {
		if (count < 2) {
			await delay();

			count++;

			throw new Error('flaky test failure');
		}

		await delay();
	});

	it('failed', () => { throw new Error('fail'); });

	afterEach(async() => { await delay(250); });

	after(async() => { await delay(250); });
});