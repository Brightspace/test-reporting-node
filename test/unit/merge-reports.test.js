import { afterEach, describe, it } from 'node:test';
import { expect } from 'chai';
import fs from 'node:fs';
import { mergeReports } from '../../src/helpers/merge-reports.cjs';
import os from 'node:os';
import path from 'node:path';

describe('merge reports', () => {
	let directory;

	afterEach(() => {
		if (directory) fs.rmSync(directory, { recursive: true, force: true });
	});

	it('rebases each report location to the output directory', () => {
		directory = fs.mkdtempSync(path.join(os.tmpdir(), 'merge-reports-'));
		const first = path.join(directory, 'first');
		const second = path.join(directory, 'second');
		const invalid = path.join(directory, 'invalid');
		const output = path.join(directory, 'output');
		for (const dir of [first, second, invalid, output]) fs.mkdirSync(dir);

		const report = (details, passed) => ({
			version: 3,
			summary: { count: { passed }, duration: { total: passed } },
			details
		});
		const absolute = path.join(directory, 'absolute.test.js');
		fs.writeFileSync(path.join(first, 'report.json'), JSON.stringify(report([
			{ name: 'first', location: { file: 'test/first.test.js', line: 12, column: 3 } },
			{ name: 'absolute', location: { file: absolute } },
			{ name: 'missing' }
		], 1)));
		fs.writeFileSync(path.join(second, 'report.json'), JSON.stringify(report([
			{ name: 'second', location: { file: '../shared/second.test.js' } },
			{ name: 'legacy', location: 'test/legacy.test.js' }
		], 2)));
		fs.writeFileSync(path.join(invalid, 'report.json'), 'null');
		const outputPath = path.join(output, 'merged.json');
		const pattern = path.join(directory, '*', 'report.json').replaceAll('\\', '/');
		const merged = mergeReports(pattern, outputPath);
		const details = Object.fromEntries(merged.details.map(detail => [detail.name, detail]));

		expect(details.first.location).to.deep.equal({ file: '../first/test/first.test.js', line: 12, column: 3 });
		expect(details.second.location.file).to.equal('../shared/second.test.js');
		expect(details.legacy.location).to.equal('../second/test/legacy.test.js');
		expect(details.absolute.location.file).to.equal(absolute);
		expect(details.missing).not.to.have.property('location');
		expect(merged.summary.count.passed).to.equal(3);
		expect(merged.summary.duration.total).to.equal(3);
		expect(JSON.parse(fs.readFileSync(outputPath, 'utf8'))).to.deep.equal(merged);
		expect(fs.existsSync(path.join(first, 'report.json'))).to.equal(false);
		expect(fs.existsSync(path.join(second, 'report.json'))).to.equal(false);
	});
});
