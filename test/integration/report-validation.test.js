import { expect } from 'chai';
import { readFile } from 'fs/promises';

describe('validation', () => {
	it('mocha', async() => {
		let report = await readFile('./d2l-test-report-mocha.json', 'utf8');

		report = JSON.parse(report);

		expect(report.reportVersion).to.eq(1);
	});

	it('playwright', async() => {
		let report = await readFile('./d2l-test-report-playwright.json', 'utf8');

		report = JSON.parse(report);

		expect(report.reportVersion).to.eq(1);
	});
});
