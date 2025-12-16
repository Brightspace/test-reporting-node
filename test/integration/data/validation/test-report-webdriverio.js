import { getOperatingSystemType } from '../../../../src/helpers/system.cjs';

const platform = getOperatingSystemType();

export const testReportV2Partial = {
	version: 2,
	summary: {
		status: 'passed',
		framework: 'webdriverio',
		count: { passed: 10, failed: 0, skipped: 1, flaky: 1 }
	},
	details: [{
		name: `[${platform}] > reporter 2 > passed`,
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-2.test.js' },
		tool: 'Test Reporting',
		experience: 'WebdriverIO 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: `[${platform}] > reporter 2 > skipped`,
		status: 'skipped',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-2.test.js' },
		tool: 'Test Reporting',
		experience: 'WebdriverIO 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: `[${platform}] > reporter 2 > flaky`,
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-2.test.js' },
		tool: 'Test Reporting',
		experience: 'WebdriverIO 2 Test Framework',
		type: 'integration',
		retries: 2
	}, {
		name: `[${platform}] > reporter 2 > special/characters "(\\n\\r\\t\\b\\f)"`,
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-2.test.js' },
		tool: 'Test Reporting',
		experience: 'WebdriverIO 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: `[${platform}] > reporter 2 > passed 2`,
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-2.test.js' },
		tool: 'Test Reporting',
		experience: 'WebdriverIO 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: `[${platform}] > reporter 2 > passed 3`,
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-2.test.js' },
		tool: 'Test Reporting',
		experience: 'WebdriverIO 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: `[${platform}] > reporter 2 > passed 4`,
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-2.test.js' },
		tool: 'Test Reporting',
		experience: 'WebdriverIO 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: `[${platform}] > reporter 2 > passed with timeout`,
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-2.test.js' },
		tool: 'Test Reporting',
		experience: 'WebdriverIO 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: `[${platform}] > reporter 3 > passed 1`,
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-3.test.js' },
		tool: 'Test Reporting',
		experience: 'WebdriverIO 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: `[${platform}] > reporter 3 > passed 2`,
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-3.test.js' },
		tool: 'Test Reporting',
		experience: 'WebdriverIO 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: `[${platform}] > reporter 3 > passed 3`,
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-3.test.js' },
		tool: 'Test Reporting',
		experience: 'WebdriverIO 2 Test Framework',
		type: 'integration',
		retries: 0
	}, {
		name: `[${platform}] > reporter 3 > passed 4`,
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-3.test.js' },
		tool: 'Test Reporting',
		experience: 'WebdriverIO 2 Test Framework',
		type: 'integration',
		retries: 0
	}]
};
