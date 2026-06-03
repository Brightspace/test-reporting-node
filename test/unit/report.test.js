import { createSandbox } from 'sinon';
import { expect } from 'chai';
import { flatten } from '../../src/helpers/object.cjs';
import fs from 'node:fs';
import { latestReportVersion } from '../../src/helpers/schema.cjs';
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
const testDetailsV1 = [{
	name: 'test suite > flaky test',
	location: 'test/test-suite.js',
	tool: 'My Tool',
	experience: 'My Experience',
	type: 'integration',
	started: testStarted,
	duration: 237,
	totalDuration: 549,
	status: 'passed',
	retries: 1
}, {
	name: 'test suite > passing test',
	location: 'test/test-suite.js',
	tool: 'My Tool',
	experience: 'My Experience',
	type: 'integration',
	started: testStarted,
	duration: 237,
	totalDuration: 237,
	status: 'passed',
	retries: 0
}, {
	name: 'test suite > skipped test',
	location: 'test/test-suite.js',
	tool: 'My Tool',
	experience: 'My Experience',
	type: 'integration',
	started: testStarted,
	duration: 0,
	totalDuration: 0,
	status: 'skipped',
	retries: 0
}];
const testDetailsV2 = [{
	name: 'test suite > flaky test',
	location: { file: 'test/test-suite.js' },
	tool: 'My Tool',
	experience: 'My Experience',
	type: 'integration',
	started: testStarted,
	timeout: 30000,
	duration: { final: 237, total: 549 },
	status: 'passed',
	retries: 1
}, {
	name: 'test suite > passing test',
	location: { file: 'test/test-suite.js' },
	tool: 'My Tool',
	experience: 'My Experience',
	type: 'integration',
	started: testStarted,
	timeout: 30000,
	duration: { final: 237, total: 237 },
	status: 'passed',
	retries: 0
}, {
	name: 'test suite > skipped test',
	location: { file: 'test/test-suite.js' },
	tool: 'My Tool',
	experience: 'My Experience',
	type: 'integration',
	started: testStarted,
	timeout: 30000,
	duration: { final: 0, total: 0 },
	status: 'skipped',
	retries: 0
}];
const testDetailsLatest = [{
	name: 'test suite > flaky test',
	location: { file: 'test/test-suite.js' },
	taxonomy: { tool: 'My Tool', type: 'integration' },
	started: testStarted,
	configuration: { timeout: 30000 },
	duration: { final: 237, total: 549 },
	status: 'passed',
	retries: 1
}, {
	name: 'test suite > passing test',
	location: { file: 'test/test-suite.js' },
	taxonomy: { tool: 'My Tool', type: 'integration' },
	started: testStarted,
	configuration: { timeout: 30000 },
	duration: { final: 237, total: 237 },
	status: 'passed',
	retries: 0
}, {
	name: 'test suite > skipped test',
	location: { file: 'test/test-suite.js' },
	taxonomy: { tool: 'My Tool', type: 'integration' },
	started: testStarted,
	configuration: { timeout: 30000 },
	duration: { final: 0, total: 0 },
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
	details: testDetailsV1
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
	version: 2,
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
	details: testDetailsV2
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
const testReportLatestFull = {
	id: '00000000-0000-0000-0000-000000000000',
	version: latestReportVersion,
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
	details: testDetailsLatest
};
const testReportLatestFullOther = {
	...testReportLatestFull,
	summary: {
		...testReportLatestFull.summary,
		...testContextOther
	}
};
const testDetailsLatestFromV1 = testDetailsLatest.map(({ configuration, ...rest }) => rest);
const testReportLatestFromV1Full = {
	...testReportLatestFull,
	details: testDetailsLatestFromV1
};
const testReportLatestFromV1FullOther = {
	...testReportLatestFullOther,
	details: testDetailsLatestFromV1
};
const testReportLatestNoContext = {
	...testReportLatestFull,
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
const testReportLatestPartialContext = {
	...testReportLatestFull,
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

const testDetailsOldV3 = [{
	name: 'test suite > flaky test',
	location: { file: 'test/test-suite.js' },
	tool: 'My Tool',
	experience: 'My Experience',
	type: 'integration',
	started: testStarted,
	config: { timeout: 30000 },
	duration: { final: 237, total: 549 },
	status: 'passed',
	retries: 1
}, {
	name: 'test suite > passing test',
	location: { file: 'test/test-suite.js' },
	tool: 'My Tool',
	experience: 'My Experience',
	type: 'integration',
	started: testStarted,
	config: { timeout: 30000 },
	duration: { final: 237, total: 237 },
	status: 'passed',
	retries: 0
}, {
	name: 'test suite > skipped test',
	location: { file: 'test/test-suite.js' },
	tool: 'My Tool',
	experience: 'My Experience',
	type: 'integration',
	started: testStarted,
	config: { timeout: 30000 },
	duration: { final: 0, total: 0 },
	status: 'skipped',
	retries: 0
}];
const testDetailsOldV3ConfigOnly = testDetailsLatest.map(({ configuration, ...rest }) => ({
	...rest,
	config: configuration
}));
const testReportOldV3Full = {
	id: '00000000-0000-0000-0000-000000000000',
	version: latestReportVersion,
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
	details: testDetailsOldV3
};
const testReportOldV3ConfigOnly = {
	...testReportOldV3Full,
	details: testDetailsOldV3ConfigOnly
};

describe('report', () => {
	let sandbox;

	before(() => sandbox = createSandbox());

	afterEach(() => sandbox.restore());

	describe(`legacy (v1, upgrades to v${latestReportVersion})`, () => {
		const testReportCurrentVersion = 1;

		describe('construction', () => {
			it('don\'t override context', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV1Full));

				let report;

				const wrapper = () => report = (new Report(testReportPath));

				expect(wrapper).to.not.throw();
				expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
				expect(report.getVersion()).to.equal(latestReportVersion);
				expect(report.toJSON()).to.deep.equal(testReportLatestFromV1Full);
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
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFromV1FullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV1FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});

				it('inject context if needed', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV1Full));

					const reportOptions = {
						context: testContextOther
					};
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFromV1Full);
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
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFromV1FullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV1FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});

				it('inject context if needed', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV1NoContext));

					const reportOptions = {
						context: testContextOther
					};
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFromV1FullOther);
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
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFromV1FullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV1FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});

				it('inject context if needed', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV1PartialContext));

					const reportOptions = {
						context: testContextOther
					};
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFromV1FullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV1FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});
			});
		});
	});

	describe(`legacy (v2, upgrades to v${latestReportVersion})`, () => {
		const testReportCurrentVersion = 2;

		describe('construction', () => {
			it('don\'t override context', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV2Full));

				let report;

				const wrapper = () => report = (new Report(testReportPath));

				expect(wrapper).to.not.throw();
				expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
				expect(report.getVersion()).to.equal(latestReportVersion);
				expect(report.toJSON()).to.deep.equal(testReportLatestFull);
				expect(report.toJSON()).to.deep.not.equal(testReportV2Full);
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
					expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV2FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});

				it('inject context if needed', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV2Full));

					const reportOptions = {
						context: testContextOther
					};
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFull);
					expect(report.toJSON()).to.deep.not.equal(testReportV2Full);
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
					expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV2FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});

				it('inject context if needed', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV2NoContext));

					const reportOptions = {
						context: testContextOther
					};
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV2FullOther);
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
					expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV2FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});

				it('inject context if needed', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportV2PartialContext));

					const reportOptions = {
						context: testContextOther
					};
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(testReportCurrentVersion);
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV2FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});
			});
		});
	});

	describe(`latest (v${latestReportVersion}, no upgrade)`, () => {
		describe('construction', () => {
			it('don\'t override context', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportLatestFull));

				let report;

				const wrapper = () => report = (new Report(testReportPath));

				expect(wrapper).to.not.throw();
				expect(report.getVersionOriginal()).to.equal(latestReportVersion);
				expect(report.getVersion()).to.equal(latestReportVersion);
				expect(report.toJSON()).to.deep.equal(testReportLatestFull);
				expect(report.toJSON()).to.deep.not.equal(testReportV2Full);
				expect(report.getContext()).to.deep.equal(testContext);
			});

			describe('full report', () => {
				it('override context', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportLatestFull));

					const reportOptions = {
						context: testContextOther,
						overrideContext: true
					};
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(latestReportVersion);
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV2FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});

				it('inject context if needed', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportLatestFull));

					const reportOptions = { context: testContextOther };
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(latestReportVersion);
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFull);
					expect(report.toJSON()).to.deep.not.equal(testReportV2Full);
					expect(report.getContext()).to.deep.equal(testContext);
				});
			});

			describe('no context', () => {
				it('override context', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportLatestNoContext));

					const reportOptions = {
						context: testContextOther,
						overrideContext: true
					};
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(latestReportVersion);
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV2FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});

				it('inject context if needed', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportLatestNoContext));

					const reportOptions = { context: testContextOther };
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(latestReportVersion);
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV2FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});
			});

			describe('partial context', () => {
				it('override context', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportLatestPartialContext));

					const reportOptions = {
						context: testContextOther,
						overrideContext: true
					};
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(latestReportVersion);
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV2FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});

				it('inject context if needed', () => {
					sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportLatestPartialContext));

					const reportOptions = { context: testContextOther };
					let report;

					const wrapper = () => report = new Report(testReportPath, reportOptions);

					expect(wrapper).to.not.throw();
					expect(report.getVersionOriginal()).to.equal(latestReportVersion);
					expect(report.getVersion()).to.equal(latestReportVersion);
					expect(report.toJSON()).to.deep.equal(testReportLatestFullOther);
					expect(report.toJSON()).to.deep.not.equal(testReportV2FullOther);
					expect(report.getContext()).to.deep.equal(testContextOther);
				});
			});
		});
	});

	describe(`legacy (old v3, cleans to v${latestReportVersion})`, () => {
		it('cleans config to configuration', () => {
			sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportOldV3ConfigOnly));

			let report;

			const wrapper = () => report = new Report(testReportPath);

			expect(wrapper).to.not.throw();
			expect(report.getVersionOriginal()).to.equal(latestReportVersion);
			expect(report.getVersion()).to.equal(latestReportVersion);
			expect(report.toJSON()).to.deep.equal(testReportLatestFull);
		});

		it('cleans flat taxonomy to nested taxonomy', () => {
			sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportOldV3Full));

			let report;

			const wrapper = () => report = new Report(testReportPath);

			expect(wrapper).to.not.throw();

			const details = report.toJSON().details;

			for (const detail of details) {
				expect(detail).to.have.nested.property('taxonomy.tool');
				expect(detail).to.have.nested.property('taxonomy.type');
				expect(detail).to.not.have.property('tool');
				expect(detail).to.not.have.property('type');
			}
		});

		it('strips experience', () => {
			sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportOldV3Full));

			let report;

			const wrapper = () => report = new Report(testReportPath);

			expect(wrapper).to.not.throw();

			for (const detail of report.toJSON().details) {
				expect(detail).to.not.have.property('experience');
			}
		});

		it('cleans all old v3 properties at once', () => {
			sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportOldV3Full));

			let report;

			const wrapper = () => report = new Report(testReportPath);

			expect(wrapper).to.not.throw();
			expect(report.getVersionOriginal()).to.equal(latestReportVersion);
			expect(report.getVersion()).to.equal(latestReportVersion);
			expect(report.toJSON()).to.deep.equal(testReportLatestFull);
		});

		it('preserves already-clean v3 report', () => {
			sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(testReportLatestFull));

			let report;

			const wrapper = () => report = new Report(testReportPath);

			expect(wrapper).to.not.throw();
			expect(report.toJSON()).to.deep.equal(testReportLatestFull);
		});

		it('does not overwrite existing taxonomy', () => {
			const mixedDetails = testDetailsLatest.map((detail) => ({
				...detail,
				tool: 'Stale Tool',
				type: 'stale'
			}));
			const mixedReport = { ...testReportLatestFull, details: mixedDetails };

			sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(mixedReport));

			let report;

			const wrapper = () => report = new Report(testReportPath);

			expect(wrapper).to.not.throw();

			const details = report.toJSON().details;

			for (const detail of details) {
				expect(detail.taxonomy.tool).to.equal('My Tool');
				expect(detail.taxonomy.type).to.equal('integration');
				expect(detail).to.not.have.property('tool');
				expect(detail).to.not.have.property('type');
			}
		});

		it('does not overwrite existing configuration', () => {
			const mixedDetails = testDetailsLatest.map((detail) => ({
				...detail,
				config: { timeout: 99999 }
			}));
			const mixedReport = { ...testReportLatestFull, details: mixedDetails };

			sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(mixedReport));

			let report;

			const wrapper = () => report = new Report(testReportPath);

			expect(wrapper).to.not.throw();

			for (const detail of report.toJSON().details) {
				expect(detail.configuration.timeout).to.equal(30000);
				expect(detail).to.not.have.property('config');
			}
		});
	});
});
