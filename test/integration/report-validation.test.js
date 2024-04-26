import { expect, use } from 'chai';
import chaiSubset from 'chai-subset';
import { getOperatingSystemType } from '../../src/helpers/system.cjs';
import { hasContext } from '../../src/helpers/github.cjs';
import { Report } from '../../src/helpers/report.cjs';
import { testReportV1Partial as testReportV1PartialMocha } from './data/validation/test-report-mocha.js';
import { testReportV1Partial as testReportV1PartialPlaywright } from './data/validation/test-report-playwright.js';
import { testReportV1Partial as testReportV1PartialTestCafe } from './data/validation/test-report-testcafe.js';
import { testReportV1Partial as testReportV1PartialWebTestRunner } from './data/validation/test-report-web-test-runner.js';

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
	name: 'mocha',
	path: './d2l-test-report-mocha.json',
	expected: testReportV1PartialMocha
}, {
	name: 'playwright',
	path: './d2l-test-report-playwright.json',
	expected: testReportV1PartialPlaywright
}, {
	name: '@web/test-runner',
	path: './d2l-test-report-web-test-runner.json',
	expected: testReportV1PartialWebTestRunner
}, {
	name: 'testcafe',
	path: './d2l-test-report-testcafe.json',
	expected: testReportV1PartialTestCafe
}];

describe('report validation', () => {
	for (const reportTest of reportTests) {
		describe(reportTest.name, () => {
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

				report = report.toJSON();

				expect(report).to.containSubset(reportTest.expected);

				const { summary, details } = report;

				expect(summary.operatingSystem).to.eq(getOperatingSystemType());
				expect(summary.totalDuration).to.be.above(0);

				const summaryStarted = new Date(summary.started);

				expect(summaryStarted).to.be.at.most(now);
				expect(summaryStarted).to.be.at.least(nowMinus30Minutes);

				for (const detail of details) {
					const detailStarted = new Date(detail.started);

					expect(detail.duration).to.be.at.least(0);
					expect(detail.totalDuration).to.be.at.least(0);
					expect(detail.totalDuration).to.be.at.least(detail.duration);
					expect(detail.duration).to.be.at.most(summary.totalDuration);
					expect(detail.totalDuration).to.be.at.most(summary.totalDuration);
					expect(detailStarted).to.be.at.most(now);
					expect(detailStarted).to.be.at.least(nowMinus30Minutes);
					expect(detailStarted).to.be.at.least(summaryStarted);
				}
			});
		});
	}
});
