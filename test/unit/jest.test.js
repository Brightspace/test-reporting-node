import { describe, it } from 'node:test';
import { expect } from 'chai';
import JestReporter from '../../src/reporters/jest.cjs';

describe('Jest reporter', () => {
	it('sets a v4 test ID for an execution error without test results', () => {
		let reportData;
		const reporter = new JestReporter({}, {
			reportVersion: 4,
			reportWriter: (data) => {
				reportData = data;
			}
		});
		const path = 'test/example.test.cjs';

		reporter.onRunStart({ startTime: Date.now() });
		reporter.onTestResult({ path }, {
			testResults: [],
			testExecError: { message: 'test execution error' }
		});
		reporter.onRunComplete(null, { startTime: Date.now(), success: false });

		const { details } = JSON.parse(reportData);
		const [detail] = details;

		expect(detail.testId).to.eq(`${path}[test execution error]`);
		expect(detail.name).to.eq('test execution error');
		expect(detail.status).to.eq('failed');
	});
});
