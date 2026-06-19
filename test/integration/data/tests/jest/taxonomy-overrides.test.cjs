const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

describe('taxonomy overrides', () => {
	let count = 0;

	beforeAll(async() => { await delay(250); });

	beforeEach(async() => { await delay(250); });

	test('passed', async() => { await delay(); });

	test.skip('skipped', () => {});

	test('flaky', async() => {
		if (count < 2) {
			await delay();

			count++;

			throw new Error('flaky test failure');
		}

		await delay();
	});

	test('failed', () => { throw new Error('fail'); });

	afterEach(async() => { await delay(250); });

	afterAll(async() => { await delay(250); });
});
