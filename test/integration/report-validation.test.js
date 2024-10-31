import { expect, use } from 'chai';
import chaiSubset from 'chai-subset';
import { getOperatingSystemType } from '../../src/helpers/system.cjs';
import { hasContext } from '../../src/helpers/github.cjs';
import { Report } from '../../src/helpers/report.cjs';
import { testReportV2Partial as testReportV2PartialMocha } from './data/validation/test-report-mocha.js';
import { testReportV2Partial as testReportV2PartialPlaywright } from './data/validation/test-report-playwright.js';
import { testReportV2Partial as testReportV2PartialWebTestRunner } from './data/validation/test-report-web-test-runner.js';

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
	expected: testReportV2PartialMocha
}, {
	name: 'playwright',
	path: './d2l-test-report-playwright.json',
	expected: testReportV2PartialPlaywright
}, {
	name: '@web/test-runner',
	path: './d2l-test-report-web-test-runner.json',
	expected: testReportV2PartialWebTestRunner
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

				expect(report.getVersion()).to.eq(2);
				expect(report.getVersionOriginal()).to.eq(2);

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
						expect(detail.duration.total).to.be.gt(0);
						expect(detail.duration.final).to.be.gt(0);
					} else if (detail.status === 'skipped') {
						if (detail.name.includes('dynamic')) {
							expect(detail.duration.final).to.be.gt(0);
							expect(detail.duration.total).to.be.gt(0);
						} else {
							expect(detail.duration.final).to.eq(0);
							expect(detail.duration.total).to.eq(0);
						}
					} else {
						expect(detail.duration.final).to.be.at.least(0);
					}

					expect(detail.duration.total).to.be.at.least(detail.duration.final);
					expect(detail.duration.final).to.be.at.most(detail.duration.total);
					expect(detail.duration.total).to.be.at.most(summary.duration.total);
					expect(detailStarted).to.be.at.most(now);
					expect(detailStarted).to.be.at.least(nowMinus30Minutes);
					expect(detailStarted).to.be.at.least(summaryStarted);
				}
			});
		});
	}
});
