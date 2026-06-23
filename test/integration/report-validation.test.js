import { describe, it } from 'node:test';
import { existsSync } from 'node:fs';
import { expect, use } from 'chai';
import chaiSubset from 'chai-subset';
import { getOperatingSystemType } from '../../src/helpers/system.cjs';
import { hasContext } from '../../src/helpers/github.cjs';
import { latestReportVersion } from '../../src/helpers/schema.cjs';
import { Report } from '../../src/helpers/report.cjs';
import { testReportLatestPartial as testReportLatestPartialJest } from './data/validation/test-report-jest.js';
import { testReportLatestPartial as testReportLatestPartialMocha } from './data/validation/test-report-mocha.js';
import { testReportLatestPartial as testReportLatestPartialNodeTest } from './data/validation/test-report-node.js';
import { testReportLatestPartial as testReportLatestPartialPlaywright } from './data/validation/test-report-playwright.js';
import { testReportLatestPartial as testReportLatestPartialWebTestRunner } from './data/validation/test-report-web-test-runner.js';
import { testReportLatestPartial as testReportLatestPartialWebdriverIO } from './data/validation/test-report-webdriverio.js';

use(chaiSubset);

const testContext = {
	github: {
		organization: 'TestOrganization',
		repository: 'test-repository',
		workflow: 'test-workflow.yml',
		runId: 12345,
		runAttempt: 1
	},
	git: {
		branch: 'test/branch',
		sha: '0000000000000000000000000000000000000000'
	}
};
const reportTests = [{
	name: 'jest',
	version: latestReportVersion,
	path: './d2l-test-report-jest.json',
	expected: testReportLatestPartialJest
}, {
	name: 'mocha',
	version: latestReportVersion,
	path: './d2l-test-report-mocha.json',
	expected: testReportLatestPartialMocha
}, {
	name: 'node',
	version: latestReportVersion,
	path: './d2l-test-report-node.json',
	expected: testReportLatestPartialNodeTest
}, {
	name: 'playwright',
	version: latestReportVersion,
	path: './d2l-test-report-playwright.json',
	expected: testReportLatestPartialPlaywright
}, {
	name: '@web/test-runner',
	version: latestReportVersion,
	path: './d2l-test-report-web-test-runner.json',
	expected: testReportLatestPartialWebTestRunner
}, {
	name: 'webdriverio',
	version: latestReportVersion,
	path: './d2l-test-report-webdriverio.json',
	expected: testReportLatestPartialWebdriverIO
}];

describe('report validation', () => {
	for (const reportTest of reportTests) {
		describe(reportTest.name, () => {
			it('exists', () => {
				expect(existsSync(reportTest.path)).to.be.true;
			});

			it('schema', () => {
				if (!hasContext()) {
					new Report(reportTest.path, { context: testContext });
				} else {
					new Report(reportTest.path);
				}
			});

			it('contents', () => {
				let report;

				if (!hasContext()) {
					report = new Report(reportTest.path, { context: testContext });
				} else {
					report = new Report(reportTest.path);
				}

				const now = new Date();
				const nowMinus30Minutes = new Date(now);

				nowMinus30Minutes.setMinutes(now.getMinutes() - 30);

				expect(report.getVersion()).to.eq(reportTest.version);
				expect(report.getVersionOriginal()).to.eq(reportTest.version);

				report = report.toJSON();

				expect(report).to.containSubset(reportTest.expected);

				const { summary, details } = report;

				expect(summary.operatingSystem).to.eq(getOperatingSystemType());
				expect(summary.duration.total).to.be.above(0);

				const summaryStarted = new Date(summary.started);

				expect(summaryStarted).to.be.at.most(now);
				expect(summaryStarted).to.be.at.least(nowMinus30Minutes);

				for (const detail of details) {
					const detailStarted = new Date(detail.started);

					if (['passed', 'flaky'].includes(detail.status)) {
						expect(detail.duration.final).to.be.at.least(0);
						expect(detail.duration.total).to.be.at.least(detail.duration.final);
					} else if (detail.status === 'skipped') {
						if (detail.name.includes('dynamic')) {
							expect(detail.duration.final).to.be.at.least(0);
							expect(detail.duration.total).to.be.at.least(detail.duration.final);
						} else {
							expect(detail.duration.final).to.eq(0);
							expect(detail.duration.total).to.eq(0);
						}
					} else {
						expect(detail.duration.final).to.be.at.least(0);
						expect(detail.duration.total).to.be.at.least(detail.duration.final);
					}

					expect(detail.duration.total).to.be.at.most(summary.duration.total);
					expect(detailStarted).to.be.at.most(now);
					expect(detailStarted).to.be.at.least(nowMinus30Minutes);
					expect(detailStarted).to.be.at.least(summaryStarted);
				}
			});
		});
	}});
