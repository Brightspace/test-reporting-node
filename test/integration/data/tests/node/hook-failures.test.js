import { after, afterEach, before, beforeEach, describe, it } from 'node:test';

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

	describe('flaky before all', () => {
		let beforeAllCount = 0;

		before(() => {
			if (beforeAllCount < 2) {
				beforeAllCount++;

				throw new Error('flaky before all');
			}
		});

		it('test with flaky before all', async() => { await delay(); });
	});

	describe('flaky before each', () => {
		let beforeEachCount = 0;

		beforeEach(() => {
			if (beforeEachCount < 2) {
				beforeEachCount++;

				throw new Error('flaky before each');
			}
		});

		it('test with flaky before each', async() => { await delay(); });
	});

	describe('flaky after each', () => {
		let afterEachCount = 0;

		afterEach(() => {
			if (afterEachCount < 2) {
				afterEachCount++;

				throw new Error('flaky after each');
			}
		});

		it('test with flaky after each', async() => { await delay(); });
	});

	describe('flaky after all', () => {
		let afterAllCount = 0;

		after(() => {
			if (afterAllCount < 2) {
				afterAllCount++;

				throw new Error('flaky after all');
			}
		});

		it('test with flaky after all', async() => { await delay(); });
	});
});
