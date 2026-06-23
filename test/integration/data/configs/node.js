import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import NodeReporter from '../../../../src/reporters/node.js';
import { run } from 'node:test';

const testDirectory = 'test/integration/data/tests/node';
const files = readdirSync(testDirectory)
	.filter(name => name.endsWith('.test.js'))
	.map(name => join(testDirectory, name));

const stream = run({
	files,
	concurrency: true
}).compose(new NodeReporter({
	reportPath: './d2l-test-report-node.json',
	reportConfigurationPath: './test/integration/data/d2l-test-reporting.config.json',
	verbose: true
}));

stream.on('data', () => {});
stream.on('error', () => {});
