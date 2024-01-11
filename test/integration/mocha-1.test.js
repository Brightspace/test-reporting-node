const delay = () => {
	return new Promise(resolve => setTimeout(resolve, 250));
};

describe('reporter tests 1', () => {
	let count = 0;

	it('test', () => { });

	it.skip('skipped test', () => { });

	it('flaky test that succeeds eventually', async() => {
		if (count < 2) {
			await delay();

			count++;

			throw new Error('flaky test failure');
		}
	});

	it('failed test', () => { throw new Error('fail'); });
});
