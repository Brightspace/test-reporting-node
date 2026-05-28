const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

describe('special characters', () => {
	it(' special/characters "(\n\r\t\b\f)" ', async() => { await delay(); });
});
