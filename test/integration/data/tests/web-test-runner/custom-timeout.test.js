const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

describe('custom timeout', function() {
	this.timeout(5000);

	it('suite level timeout', async() => { await delay(); });

	it('test level timeout', async function() {
		this.timeout(10000);

		await delay();
	});
});
