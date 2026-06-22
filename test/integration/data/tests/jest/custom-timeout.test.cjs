const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

describe('custom timeout', () => {
	jest.setTimeout(5000);

	test('suite level timeout', async() => { await delay(); });

	test('test level timeout', async() => { await delay(); }, 10000);
});
