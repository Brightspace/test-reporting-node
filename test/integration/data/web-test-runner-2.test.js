const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

describe('reporter tests 2', () => {
	before(async() => { await delay(250); });

	beforeEach(async() => { await delay(250); });

	it('test', async() => { await delay(); });

	it.skip('skipped test', () => {});

	it('failed test', () => { throw new Error('fail'); });

	afterEach(async() => { await delay(250); });

	after(async() => { await delay(250); });
});
