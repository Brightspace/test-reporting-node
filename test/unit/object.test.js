import { expect } from 'chai';
import { flatten } from '../../src/helpers/object.cjs';

describe('object', () => {
	describe('flatten', () => {
		it('flat object unchanged', () => {
			const result = flatten({ a: 1, b: 'two' });

			expect(result).to.deep.eq({ a: 1, b: 'two' });
		});

		it('nested object', () => {
			const result = flatten({
				github: {
					organization: 'TestOrg',
					repository: 'test-repo'
				}
			});

			expect(result).to.deep.eq({
				githubOrganization: 'TestOrg',
				githubRepository: 'test-repo'
			});
		});

		it('deeply nested', () => {
			const result = flatten({
				a: { b: { c: 'value' } }
			});

			expect(result).to.deep.eq({ aBC: 'value' });
		});

		it('preserves arrays', () => {
			const result = flatten({ items: [1, 2, 3] });

			expect(result).to.deep.eq({ items: [1, 2, 3] });
		});

		it('mixed flat and nested', () => {
			const result = flatten({
				name: 'test',
				github: { organization: 'Org' }
			});

			expect(result).to.deep.eq({
				name: 'test',
				githubOrganization: 'Org'
			});
		});

		it('empty object', () => {
			const result = flatten({});

			expect(result).to.deep.eq({});
		});

		it('skips inherited properties', () => {
			const proto = { inherited: 'skip' };
			const obj = Object.create(proto);

			obj.own = 'keep';

			const result = flatten(obj);

			expect(result).to.deep.eq({ own: 'keep' });
		});

		it('skips inherited in nested', () => {
			const innerProto = { inherited: 'skip' };
			const inner = Object.create(innerProto);

			inner.own = 'keep';

			const result = flatten({ parent: inner });

			expect(result).to.deep.eq({ parentOwn: 'keep' });
		});

		it('skips inherited on flattened result', () => {
			Object.defineProperty(Object.prototype, '__flattenTest', {
				value: 'skip',
				enumerable: true,
				configurable: true,
				writable: true
			});

			try {
				const result = flatten({ parent: { own: 'keep' } });

				expect(result).to.deep.eq({ parentOwn: 'keep' });
			} finally {
				delete Object.prototype.__flattenTest;
			}
		});
	});
});
