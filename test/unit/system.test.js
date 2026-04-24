import { getOperatingSystemType, makeRelativeFilePath } from '../../src/helpers/system.cjs';
import { createSandbox } from 'sinon';
import { expect } from 'chai';
import os from 'node:os';
import { join } from 'node:path';

describe('system', () => {
	let sandbox;

	before(() => sandbox = createSandbox());

	afterEach(() => sandbox.restore());

	describe('os type', () => {
		it('linux', () => {
			sandbox.stub(os, 'type').returns('Linux');

			expect(getOperatingSystemType()).to.eq('linux');
		});

		it('macos', () => {
			sandbox.stub(os, 'type').returns('Darwin');

			expect(getOperatingSystemType()).to.eq('macos');
		});

		it('windows', () => {
			sandbox.stub(os, 'type').returns('Windows_NT');

			expect(getOperatingSystemType()).to.eq('windows');
		});

		it('unknown throws', () => {
			sandbox.stub(os, 'type').returns('FreeBSD');

			expect(getOperatingSystemType).to.throw('Unknown operating system');
		});
	});

	describe('relative path', () => {
		it('absolute path', () => {
			const absolute = join(process.cwd(), 'src', 'helpers', 'file.js');

			expect(makeRelativeFilePath(absolute)).to.eq('src/helpers/file.js');
		});

		it('file url', () => {
			const fileUrl = new URL(`file://${process.cwd().replace(/\\/g, '/')}/src/file.js`).href;

			expect(makeRelativeFilePath(fileUrl)).to.eq('src/file.js');
		});
	});
});
