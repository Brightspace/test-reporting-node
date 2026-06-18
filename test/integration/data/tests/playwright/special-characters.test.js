import { test } from '@playwright/test';

const delay = (ms = 50) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

test.describe('special characters', () => {
	test(' special/characters "(\n\r\t\b\f)" ', async() => { await delay(); });
});
