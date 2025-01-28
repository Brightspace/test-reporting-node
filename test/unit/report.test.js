import { createSandbox } from 'sinon';
import { expect } from 'chai';
import { flatten } from '../../src/helpers/object.cjs';
import fs from 'node:fs';
import { Report } from '../../src/helpers/report.cjs';
import { resolve } from 'node:path';

const testReportLatestVersion = 2;
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
const testDetails = [{
	name: 'test suite > flaky test',
	location: {
		file: 'test/test-suite.js'
	},
	started: testStarted,
	duration: {
		final: 237,
		total: 549
	},
	status: 'passed',
	retries: 1
}, {
	name: 'test suite > passing test',
	location: {
		file: 'test/test-suite.js'
	},
	started: testStarted,
	duration: {
		final: 237,
		total: 237
	},
	status: 'passed',
	retries: 0
}, {
	name: 'test suite > skipped test',
	location: {
		file: 'test/test-suite.js'
	},
	started: testStarted,
	duration: {
		final: 0,
		total: 0
	},
	status: 'skipped',
	retries: 0
}];
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
	details: testDetails.map(detail => ({
		...detail,
		location: detail.location.file,
		duration: detail.duration.final,
		totalDuration: detail.duration.total
	}))
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
const testReportV2Full = {
	id: '00000000-0000-0000-0000-000000000000',
	version: testReportLatestVersion,
	summary: {
		...testContext,
		operatingSystem: 'linux',
		framework: 'mocha',
		started: testStarted,
		status: 'passed',
		duration: {
			total: 23857
		},
		count: {
			passed: 2,
			failed: 0,
			skipped: 1,
			flaky: 1
		}
	},
	details: testDetails
};
const testReportV2FullOther = {
	...testReportV2Full,
	summary: {
		...testReportV2Full.summary,
		...testContextOther
	}
};
const testReportV2NoContext = {
	...testReportV2Full,
	summary: {
		operatingSystem: 'linux',
		framework: 'mocha',
		started: testStarted,
		duration: {
			total: 23857
		},
		status: 'passed',
		count: {
			passed: 2,
			failed: 0,
			skipped: 1,
			flaky: 1
		}
	}
};
const testReportV2PartialContext = {
	...testReportV2Full,
	summary: {
		github: {
			organization: testContext.github.organization,
			workflow: testContext.github.workflow
		},
		git: {
			branch: testContext.git.branch,
			sha: testContext.git.sha
		},
		operatingSystem: 'linux',
		framework: 'mocha',
		started: testStarted,
		duration: {
			total: 23857
		},
		status: 'passed',
		count: {
			passed: 2,
			failed: 0,
			skipped: 1,
			flaky: 1
		}
	}
};

describe('report', () => {
	let sandbox;

	before(() => sandbox = createSandbox());

	afterEach(() => sandbox.restore());

	describe(`legacy (v1, upgrades to v${testReportLatestVersion})`, () => {
		const testReportCurrentVersion = 1;

		describe('construction', () => {
			it('don\'t override context', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV1Full));

				let report;

				const wrapper = () => report = (new Report(testReportPath));

				expect(wrapper).to.not.throw();
				expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
				expect(report.getVersion()).to.equal(testReportLatestVersion);
				expect(report.toJSON()).to.deep.equal(testReportV2Full);
				expect(report.toJSON()).to.deep.not.equal(testReportV1Full);
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
					expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
					expect(report.getVersion()).to.equal(testReportLatestVersion);
					expect(report.toJSON()).to.deep.equal(testReportV2FullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV1FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});

				it('inject context if needed', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV1Full));

					const reportOptions = { context: testContextOther };
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
					expect(report.getVersion()).to.equal(testReportLatestVersion);
					expect(report.toJSON()).to.deep.equal(testReportV2Full);
					expect(report.toJSON()).to.deep.not.equal(testReportV1Full);
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

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
					expect(report.getVersion()).to.equal(testReportLatestVersion);
					expect(report.toJSON()).to.deep.equal(testReportV2FullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV1FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});

				it('inject context if needed', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV1NoContext));

					const reportOptions = { context: testContextOther };
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
					expect(report.getVersion()).to.equal(testReportLatestVersion);
					expect(report.toJSON()).to.deep.equal(testReportV2FullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV1FullOther);
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

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
					expect(report.getVersion()).to.equal(testReportLatestVersion);
					expect(report.toJSON()).to.deep.equal(testReportV2FullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV1FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});

				it('inject context if needed', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV1PartialContext));

					const reportOptions = { context: testContextOther };
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
					expect(report.getVersion()).to.equal(testReportLatestVersion);
					expect(report.toJSON()).to.deep.equal(testReportV2FullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV1FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});
			});
		});
	});

	describe(`latest (v${testReportLatestVersion}, no upgrade)`, () => {
		describe('construction', () => {
			it('don\'t override context', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV2Full));

				let report;

				const wrapper = () => report = (new Report(testReportPath));

				expect(wrapper).to.not.throw();
				expect(report.getVersionOriginal()).to.equal(testReportLatestVersion);
				expect(report.getVersion()).to.equal(testReportLatestVersion);
				expect(report.toJSON()).to.deep.equal(testReportV2Full);
				expect(report.toJSON()).to.deep.not.equal(testReportV1Full);
				expect(report.getContext()).to.deep.equal(testContext);
			});

			describe('full report', () => {
				it('override context', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV2Full));

					const reportOptions = {
						context: testContextOther,
						overrideContext: true
					};
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportLatestVersion);
					expect(report.getVersion()).to.equal(testReportLatestVersion);
					expect(report.toJSON()).to.deep.equal(testReportV2FullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV1FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});

				it('inject context if needed', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV2Full));

					const reportOptions = { context: testContextOther };
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportLatestVersion);
					expect(report.getVersion()).to.equal(testReportLatestVersion);
					expect(report.toJSON()).to.deep.equal(testReportV2Full);
					expect(report.toJSON()).to.deep.not.equal(testReportV1Full);
					expect(report.getContext()).to.deep.equal(testContext);
				});
			});

			describe('no context', () => {
				it('override context', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV2NoContext));

					const reportOptions = {
						context: testContextOther,
						overrideContext: true
					};
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportLatestVersion);
					expect(report.getVersion()).to.equal(testReportLatestVersion);
					expect(report.toJSON()).to.deep.equal(testReportV2FullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV1FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});

				it('inject context if needed', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV2NoContext));

					const reportOptions = { context: testContextOther };
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportLatestVersion);
					expect(report.getVersion()).to.equal(testReportLatestVersion);
					expect(report.toJSON()).to.deep.equal(testReportV2FullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV1FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});
			});

			describe('partial context', () => {
				it('override context', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV2PartialContext));

					const reportOptions = {
						context: testContextOther,
						overrideContext: true
					};
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportLatestVersion);
					expect(report.getVersion()).to.equal(testReportLatestVersion);
					expect(report.toJSON()).to.deep.equal(testReportV2FullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV1FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});

				it('inject context if needed', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV2PartialContext));

					const reportOptions = { context: testContextOther };
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportLatestVersion);
					expect(report.getVersion()).to.equal(testReportLatestVersion);
					expect(report.toJSON()).to.deep.equal(testReportV2FullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV1FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});
			});
		});
	});
});
