const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

describe('hook failures', () => {
	describe('before all failure', () => {
		before(() => { throw new Error('before all hook failure'); });

		it('test with before all failure', async() => { await delay(); });
	});

	describe('before each failure', () => {
		beforeEach(() => { throw new Error('before each hook failure'); });

		it('test with before each failure', async() => { await delay(); });
	});

	describe('after each failure', () => {
		afterEach(() => { throw new Error('after each hook failure'); });

		it('test with after each failure', async() => { await delay(); });
	});

	describe('after all failure', () => {
		after(() => { throw new Error('after all hook failure'); });

		it('test with after all failure', async() => { await delay(); });
	});
});
