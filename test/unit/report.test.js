import { createSandbox } from 'sinon';
import { expect } from 'chai';
import { flatten } from '../../src/helpers/object.cjs';
import fs from 'node:fs';
import { Report } from '../../src/helpers/report.cjs';
import { resolve } from 'node:path';

const reportPath = resolve('./test-report.json');
const reportOverrideContext = {
	github: {
		organization: 'TestOrganizationOther',
		repository: 'test-repository-other',
		workflow: 'test-workflow-other.yml',
		runId: 67890,
		runAttempt: 2
	},
	git: {
		branch: 'test/branch/other',
		sha: '0000000000000000000000000000000000000000'
	}
};
const reportStarted = (new Date()).toISOString();
const reportFull = {
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
		started: reportStarted,
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
		started: reportStarted,
		duration: 237,
		totalDuration: 549,
		status: 'passed',
		retries: 1
	}, {
		name: 'test suite > passing test',
		location: 'test/test-suite.js',
		started: reportStarted,
		duration: 237,
		totalDuration: 237,
		status: 'passed',
		retries: 0
	}, {
		name: 'test suite > skipped test',
		location: 'test/test-suite.js',
		started: reportStarted,
		duration: 0,
		totalDuration: 0,
		status: 'skipped',
		retries: 0
	}]
};
const reportFullOverridden = {
	...reportFull,
	summary: {
		...reportFull.summary,
		...flatten(reportOverrideContext)
	}
};
const reportNoContext = {
	...reportFull,
	summary: {
		operatingSystem: 'linux',
		framework: 'mocha',
		started: reportStarted,
		totalDuration: 23857,
		status: 'passed',
		countPassed: 2,
		countFailed: 0,
		countSkipped: 1,
		countFlaky: 1
	}
};
const reportPartialContext = {
	...reportFull,
	summary: {
		githubOrganization: 'TestOrganization',
		githubWorkflow: 'test-workflow.yml',
		gitBranch: 'test/branch',
		gitSha: '0000000000000000000000000000000000000000',
		operatingSystem: 'linux',
		framework: 'mocha',
		started: reportStarted,
		totalDuration: 23857,
		status: 'passed',
		countPassed: 2,
		countFailed: 0,
		countSkipped: 1,
		countFlaky: 1
	}
};

describe('report', () => {
	let sandbox;

	before(() => sandbox = createSandbox());

	afterEach(() => sandbox.restore());

	describe('construction', () => {
		it('don\'t override context', () => {
			sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(reportFull));

			let report;

			const wrapper = () => report = (new Report(reportPath));

			expect(wrapper).to.not.throw();
			expect(report.toJSON()).to.deep.equal(reportFull);
		});

		describe('full report', () => {
			it('override context', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(reportFull));

				const reportOptions = {
					context: reportOverrideContext,
					overrideContext: true
				};
				let report;

				const wrapper = () => report = new Report(reportPath, reportOptions);

				expect(wrapper).to.not.throw();
				expect(report.toJSON()).to.deep.equal(reportFullOverridden);
			});

			it('inject context if needed', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(reportFull));

				const reportOptions = { context: reportOverrideContext };
				let report;

				const wrapper = () => report = (new Report(reportPath, reportOptions));

				expect(wrapper).to.not.throw();
				expect(report.toJSON()).to.deep.equal(reportFull);
			});
		});

		describe('no context', () => {
			it('override context', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(reportNoContext));

				const reportOptions = {
					context: reportOverrideContext,
					overrideContext: true
				};
				let report;

				const wrapper = () => report = (new Report(reportPath, reportOptions));

				expect(wrapper).to.not.throw();
				expect(report.toJSON()).to.deep.equal(reportFullOverridden);
			});

			it('inject context if needed', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(reportNoContext));

				const reportOptions = { context: reportOverrideContext };
				let report;

				const wrapper = () => report = (new Report(reportPath, reportOptions));

				expect(wrapper).to.not.throw();
				expect(report.toJSON()).to.deep.equal(reportFullOverridden);
			});
		});

		describe('partial context', () => {
			it('override context', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(reportPartialContext));

				const reportOptions = {
					context: reportOverrideContext,
					overrideContext: true
				};
				let report;

				const wrapper = () => report = (new Report(reportPath, reportOptions));

				expect(wrapper).to.not.throw();
				expect(report.toJSON()).to.deep.equal(reportFullOverridden);
			});

			it('inject context if needed', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(reportPartialContext));

				const reportOptions = { context: reportOverrideContext };
				let report;

				const wrapper = () => report = (new Report(reportPath, reportOptions));

				expect(wrapper).to.not.throw();
				expect(report.toJSON()).to.deep.equal(reportFullOverridden);
			});
		});
	});
});