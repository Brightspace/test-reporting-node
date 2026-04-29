import { expect } from 'chai';
import { escapeSpecialCharacters } from '../../src/helpers/strings.cjs';

describe('strings', () => {
	describe('escape special characters', () => {
		it('no-op', () => {
			expect(escapeSpecialCharacters('hello world')).to.eq('hello world');
		});

		it('backslash', () => {
			expect(escapeSpecialCharacters('path\\to\\file')).to.eq('path\\\\to\\\\file');
		});

		it('newline', () => {
			expect(escapeSpecialCharacters('line1\nline2')).to.eq('line1\\nline2');
		});

		it('carriage return', () => {
			expect(escapeSpecialCharacters('line1\rline2')).to.eq('line1\\rline2');
		});

		it('tab', () => {
			expect(escapeSpecialCharacters('col1\tcol2')).to.eq('col1\\tcol2');
		});

		it('null', () => {
			expect(escapeSpecialCharacters('before\0after')).to.eq('before\\0after');
		});

		it('backspace', () => {
			expect(escapeSpecialCharacters('before\bafter')).to.eq('before\\bafter');
		});

		it('vertical tab', () => {
			expect(escapeSpecialCharacters('before\vafter')).to.eq('before\\vafter');
		});

		it('form feed', () => {
			expect(escapeSpecialCharacters('before\fafter')).to.eq('before\\fafter');
		});

		it('mixed', () => {
			expect(escapeSpecialCharacters('a\nb\tc')).to.eq('a\\nb\\tc');
		});

		it('empty', () => {
			expect(escapeSpecialCharacters('')).to.eq('');
		});
	});
});
