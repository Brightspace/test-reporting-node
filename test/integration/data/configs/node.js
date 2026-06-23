import { createWriteStream, readdirSync } from 'node:fs';
import { join } from 'node:path';
import NodeReporter from '../../../../src/reporters/node.js';
import { run } from 'node:test';

const testDirectory = 'test/integration/data/tests/node';
const files = readdirSync(testDirectory)
	.filter(name => name.endsWith('.test.js'))
	.map(name => join(testDirectory, name));
const reporterOptions = {
	reportConfigurationPath: './test/integration/data/d2l-test-reporting.config.json',
	verbose: true
};

run({ files, concurrency: true })
	.compose(new NodeReporter(reporterOptions))
	.pipe(createWriteStream('./d2l-test-report-node.json'));
