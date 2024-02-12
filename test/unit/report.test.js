import { expect } from 'chai';
import { validateReport } from '../../src/helpers/report.cjs';

const validReport = {
	reportId: '00000000-0000-0000-0000-000000000000',
	reportVersion: 1,
	summary: {
		githubOrganization: 'TestOrganization',
		githubRepository: 'test-repository',
		githubWorkflow: 'test-workflow.yml',
		githubRunId: 12345,
		githubRunAttempt: 1,
		gitBranch: 'test/branch',
		gitSha: '0000000000000000000000000000000000000000',
		operatingSystem: 'linux',
		framework: 'mocha',
		started: (new Date()).toISOString(),
		totalDuration: 23857,
		status: 'passed',
		countPassed: 2,
		countFailed: 0,
		countSkipped: 1,
		countFlaky: 1
	},
	details: [{
		name: 'test suite > flaky test',
		location: 'test/test-suite.js',
		started: (new Date()).toISOString(),
		duration: 237,
		totalDuration: 549,
		status: 'passed',
		retries: 1
	}, {
		name: 'test suite > passing test',
		location: 'test/test-suite.js',
		started: (new Date()).toISOString(),
		duration: 237,
		totalDuration: 237,
		status: 'passed',
		retries: 0
	}, {
		name: 'test suite > skipped test',
		location: 'test/test-suite.js',
		started: (new Date()).toISOString(),
		duration: 0,
		totalDuration: 0,
		status: 'skipped',
		retries: 0
	}]
};

describe('report', () => {
	describe('validate', () => {
		it('succeeds', () => {
			const wrapper = () => validateReport(validReport);

			expect(wrapper).to.not.throw();
		});

		describe('fails', () => {
			it('invalid', () => {
				const wrapper = () => validateReport({});

				expect(wrapper).to.throw('report does not conform to schema');
			});

			it('extra properties', () => {
				const extraProperties = {
					...validReport,
					test: 'test'
				};

				const wrapper = () => validateReport(extraProperties);

				expect(wrapper).to.throw('report does not conform to schema');
			});
		});
	});
});
