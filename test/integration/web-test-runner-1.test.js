describe('reporter tests 1', () => {
	it('test', () => {});

	it.skip('skipped test', () => {});

	it('failed test', () => { throw new Error('fail'); });
});
