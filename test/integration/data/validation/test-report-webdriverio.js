import { getOperatingSystemType } from '../../../../src/helpers/system.cjs';

const platform = getOperatingSystemType();

export const testReportV2Partial = {
	version: 2,
	summary: {
		status: 'passed',
		framework: 'webdriverio',
		count: { passed: 8, failed: 1, skipped: 2, flaky: 2 }
	},
	details: [{
		name: `[${platform}] > reporter 1 > passed`,
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-1.test.js' },
		tool: 'WebdriverIO 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: `[${platform}] > reporter 1 > skipped`,
		status: 'skipped',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-1.test.js' },
		tool: 'WebdriverIO 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: `[${platform}] > reporter 1 > flaky`,
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-1.test.js' },
		tool: 'WebdriverIO 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 2
	}, {
		name: `[${platform}] > reporter 1 > failed`,
		status: 'failed',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-1.test.js' },
		tool: 'WebdriverIO 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
		name: `[${platform}] > reporter 1 > special/characters "(\\n\\r\\t\\b\\f)"`,
		status: 'passed',
		location: { file: 'test/integration/data/tests/webdriverio/reporter-1.test.js' },
		tool: 'WebdriverIO 1 Test Reporting',
		experience: 'Test Framework',
		type: 'ui',
		retries: 0
	}, {
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
	}]
};
