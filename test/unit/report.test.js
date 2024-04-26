import { createSandbox } from 'sinon';
import { expect } from 'chai';
import { flatten } from '../../src/helpers/object.cjs';
import fs from 'node:fs';
import { Report } from '../../src/helpers/report.cjs';
import { resolve } from 'node:path';

const testReportPath = resolve('./test-report.json');
const testContext = {
	github: {
		organization: 'TestOrganization',
		repository: 'test-repository',
		workflow: 'test-workflow.yml',
		runId: 123465,
		runAttempt: 1
	},
	git: {
		branch: 'test/branch',
		sha: '0000000000000000000000000000000000000000'
	}
};
const testContextOther = {
	github: {
		organization: 'TestOrganizationOther',
		repository: 'test-repository-other',
		workflow: 'test-workflow-other.yml',
		runId: 67890,
		runAttempt: 2
	},
	git: {
		branch: 'test/branch/other',
		sha: '1111111111111111111111111111111111111111'
	}
};
const testStarted = (new Date()).toISOString();
const testReportV1Full = {
	reportId: '00000000-0000-0000-0000-000000000000',
	reportVersion: 1,
	summary: {
		...flatten(testContext),
		operatingSystem: 'linux',
		framework: 'mocha',
		started: testStarted,
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
		started: testStarted,
		duration: 237,
		totalDuration: 549,
		status: 'passed',
		retries: 1
	}, {
		name: 'test suite > passing test',
		location: 'test/test-suite.js',
		started: testStarted,
		duration: 237,
		totalDuration: 237,
		status: 'passed',
		retries: 0
	}, {
		name: 'test suite > skipped test',
		location: 'test/test-suite.js',
		started: testStarted,
		duration: 0,
		totalDuration: 0,
		status: 'skipped',
		retries: 0
	}]
};
const testReportV1FullOther = {
	...testReportV1Full,
	summary: {
		...testReportV1Full.summary,
		...flatten(testContextOther)
	}
};
const testReportV1NoContext = {
	...testReportV1Full,
	summary: {
		operatingSystem: 'linux',
		framework: 'mocha',
		started: testStarted,
		totalDuration: 23857,
		status: 'passed',
		countPassed: 2,
		countFailed: 0,
		countSkipped: 1,
		countFlaky: 1
	}
};
const testReportV1PartialContext = {
	...testReportV1Full,
	summary: {
		githubOrganization: testContext.github.organization,
		githubWorkflow: testContext.github.workflow,
		gitBranch: testContext.git.branch,
		gitSha: testContext.git.sha,
		operatingSystem: 'linux',
		framework: 'mocha',
		started: testStarted,
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
			sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV1Full));

			let report;

			const wrapper = () => report = (new Report(testReportPath));

			expect(wrapper).to.not.throw();
			expect(report.toJSON()).to.deep.equal(testReportV1Full);
			expect(report.getContext()).to.deep.equal(testContext);
		});

		describe('full report', () => {
			it('override context', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV1Full));

				const reportOptions = {
					context: testContextOther,
					overrideContext: true
				};
				let report;

				const wrapper = () => report = new Report(testReportPath, reportOptions);

				expect(wrapper).to.not.throw();
				expect(report.toJSON()).to.deep.equal(testReportV1FullOther);
				expect(report.getContext()).to.deep.equal(testContextOther);
			});

			it('inject context if needed', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV1Full));

				const reportOptions = { context: testContextOther };
				let report;

				const wrapper = () => report = (new Report(testReportPath, reportOptions));

				expect(wrapper).to.not.throw();
				expect(report.toJSON()).to.deep.equal(testReportV1Full);
				expect(report.getContext()).to.deep.equal(testContext);
			});
		});

		describe('no context', () => {
			it('override context', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV1NoContext));

				const reportOptions = {
					context: testContextOther,
					overrideContext: true
				};
				let report;

				const wrapper = () => report = (new Report(testReportPath, reportOptions));

				expect(wrapper).to.not.throw();
				expect(report.toJSON()).to.deep.equal(testReportV1FullOther);
				expect(report.getContext()).to.deep.equal(testContextOther);
			});

			it('inject context if needed', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV1NoContext));

				const reportOptions = { context: testContextOther };
				let report;

				const wrapper = () => report = (new Report(testReportPath, reportOptions));

				expect(wrapper).to.not.throw();
				expect(report.toJSON()).to.deep.equal(testReportV1FullOther);
				expect(report.getContext()).to.deep.equal(testContextOther);
			});
		});

		describe('partial context', () => {
			it('override context', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV1PartialContext));

				const reportOptions = {
					context: testContextOther,
					overrideContext: true
				};
				let report;

				const wrapper = () => report = (new Report(testReportPath, reportOptions));

				expect(wrapper).to.not.throw();
				expect(report.toJSON()).to.deep.equal(testReportV1FullOther);
				expect(report.getContext()).to.deep.equal(testContextOther);
			});

			it('inject context if needed', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV1PartialContext));

				const reportOptions = { context: testContextOther };
				let report;

				const wrapper = () => report = (new Report(testReportPath, reportOptions));

				expect(wrapper).to.not.throw();
				expect(report.toJSON()).to.deep.equal(testReportV1FullOther);
				expect(report.getContext()).to.deep.equal(testContextOther);
			});
		});
	});
});
