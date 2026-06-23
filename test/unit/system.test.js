import { afterEach, beforeEach, describe, it, mock } from 'node:test';
import { getNow, getNowISOString, getOperatingSystemType, makeRelativeFilePath } from '../../src/helpers/system.cjs';
import { expect } from 'chai';
import os from 'node:os';
import { join } from 'node:path';

describe('system', () => {
	afterEach(() => {
		mock.reset();
		mock.timers.reset();
	});

	describe('os type', () => {
		it('linux', () => {
			mock.method(os, 'type', () => 'Linux');

			expect(getOperatingSystemType()).to.eq('linux');
		});

		it('macos', () => {
			mock.method(os, 'type', () => 'Darwin');

			expect(getOperatingSystemType()).to.eq('macos');
		});

		it('windows', () => {
			mock.method(os, 'type', () => 'Windows_NT');

			expect(getOperatingSystemType()).to.eq('windows');
		});

		it('unknown throws', () => {
			mock.method(os, 'type', () => 'FreeBSD');

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

	describe('now', () => {
		const fakeNow = 1234567890;

		beforeEach(() => mock.timers.enable({ apis: ['Date'], now: fakeNow }));

		it('date', () => {
			expect(getNow().getTime()).to.be.greaterThan(fakeNow);
		});

		it('iso string', () => {
			expect(Date.parse(getNowISOString())).to.be.greaterThan(fakeNow);
		});
	});
});
