import { createWriteStream, readdirSync } from 'node:fs';
import { join } from 'node:path';
import NodeReporter from '../../../../src/reporters/node.js';
import { run } from 'node:test';
import { spec } from 'node:test/reporters';

const testDirectory = 'test/integration/data/tests/node';
const files = readdirSync(testDirectory)
	.filter(name => name.endsWith('.test.js'))
	.map(name => join(testDirectory, name));
const reporterOptions = {
	reportConfigurationPath: './test/integration/data/d2l-test-reporting.config.json',
	verbose: true
};
const testStream = run({ files, concurrency: true });

testStream
	.compose(new NodeReporter(reporterOptions))
	.pipe(createWriteStream('./d2l-test-report-node.json'));

testStream
	.compose(new spec())
	.pipe(process.stdout);
