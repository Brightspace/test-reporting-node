import { hasContext } from '../../src/helpers/github.cjs';
import { readFile } from 'node:fs/promises';
import { validateReport } from '../../src/helpers/report.cjs';

const dummyContext = {
	githubOrganization: 'TestOrganization',
	githubRepository: 'test-repository',
	githubWorkflow: 'test-workflow.yml',
	githubRunId: 12345,
	githubRunAttempt: 1,
	gitBranch: 'test/branch',
	gitSha: '0000000000000000000000000000000000000000'
};

describe('report validation', () => {
	it('mocha', async() => {
		let report = await readFile('./d2l-test-report-mocha.json', 'utf8');

		report = JSON.parse(report);

		if (!hasContext()) {
			report.summary = {
				...report.summary,
				...dummyContext
			};
		}

		validateReport(report);
	});

	it('playwright', async() => {
		let report = await readFile('./d2l-test-report-playwright.json', 'utf8');

		report = JSON.parse(report);

		if (!hasContext()) {
			report.summary = {
				...report.summary,
				...dummyContext
			};
		}

		validateReport(report);
	});
});
