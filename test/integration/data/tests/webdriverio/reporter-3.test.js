const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

describe('reporter 3', () => {
	before(async() => { await delay(250); });

	beforeEach(async() => { await delay(250); });

	it('passed 1', async() => { await delay(); });

	it('passed 2', async() => { await delay(); });

	it('passed 3', async() => { await delay(); });

	it('passed 4', async() => { await delay(); });

	afterEach(async() => { await delay(250); });

	after(async() => { await delay(250); });
});
