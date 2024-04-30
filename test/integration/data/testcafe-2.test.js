/* globals fixture */
const delay = () => {
	return new Promise(resolve => setTimeout(resolve, 100));
};

const counts = new Map();

fixture('fixture 2').page('http://127.0.0.1:8080');

test('test', async() => { await delay(); });

test.skip('skipped test', () => {});

// eslint-disable-next-line no-empty-pattern
test('flaky test', async(testController) => {
	const { testRun: { test: { id: testId }, browserConnection: { id: sessionId } } } = testController;

	const id = `${testId}/${sessionId}`;
	const count = counts.get(id) ?? 0;

	if (count < 2) {
		counts.set(id, count + 1);

		await delay();

		throw new Error('flaky test failure');
	}

	await delay();
});

test('failed test', () => { throw new Error('fail'); });
