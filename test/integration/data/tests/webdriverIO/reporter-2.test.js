const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

describe('reporter 2', () => {
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

	it(' special/characters "(\n\r\t\b\f)" ', async() => { await delay(); });

	it('passed 2', async() => { await delay(); });

	it('passed 3', async() => { await delay(); });

	it('passed 4', async() => { await delay(); });

	it('passed with timeout', async function() { 
		this.timeout(5000);
		await delay(); 
	});

	afterEach(async() => { await delay(250); });

	after(async() => { await delay(250); });
});
