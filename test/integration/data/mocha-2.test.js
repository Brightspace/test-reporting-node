const delay = (ms = 100) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

describe('reporter tests 2', () => {
	let count = 0;

	before(async() => { await delay(1000); });

	beforeEach(async() => { await delay(1000); });

	it('test', async() => { await delay(); });

	it.skip('skipped test', () => {});

	it('flaky test', async() => {
		if (count < 2) {
			await delay();

			count++;

			throw new Error('flaky test failure');
		}

		await delay();
	});

	it('failed test', () => { throw new Error('fail'); });

	afterEach(async() => { await delay(1000); });

	after(async() => { await delay(1000); });
});
