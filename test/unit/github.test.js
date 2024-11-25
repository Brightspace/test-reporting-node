/* global process */

import { getContext, hasContext } from '../../src/helpers/github.cjs';
import { createSandbox } from 'sinon';
import { expect } from 'chai';

const validContext = {
	github: {
		organization: 'TestOrganization',
		repository: 'test-repository',
		workflow: 'test-workflow.yml',
		runId: 12345,
		runAttempt: 1
	},
	git: {
		branch: 'test/branch',
		sha: '0000000000000000000000000000000000000000'
	}
};

describe('github', () => {
	let sandbox;

	before(() => sandbox = createSandbox());

	afterEach(() => sandbox.restore());

	describe('has context', () => {
		it('not in github actions', () => {
			sandbox.stub(process, 'env').value({});

			expect(hasContext()).to.be.false;
		});

		it('in github actions', () => {
			sandbox.stub(process, 'env').value({ 'GITHUB_ACTIONS': '1' });

			expect(hasContext()).to.be.true;
		});
	});

	describe('get context', () => {
		const expectedResult = validContext;
		const commonEnvironment = {
			'GITHUB_ACTIONS': '1',
			'GITHUB_REPOSITORY': 'TestOrganization/test-repository',
			'GITHUB_WORKFLOW_REF': 'TestOrganization/test-repository/.github/workflows/test-workflow.yml@refs/heads/test/branch',
			'GITHUB_RUN_ID': '12345',
			'GITHUB_RUN_ATTEMPT': '1',
			'GITHUB_SHA': '0000000000000000000000000000000000000000'
		};

		describe('in github actions', () => {
			it('on pull request', () => {
				sandbox.stub(process, 'env').value({
					...commonEnvironment,
					'GITHUB_HEAD_REF': 'test/branch'
				});

				const context = getContext();

				expect(expectedResult).to.deep.eq(context);
			});

			it('on branch', () => {
				sandbox.stub(process, 'env').value({
					...commonEnvironment,
					'GITHUB_REF': 'test/branch'
				});

				const context = getContext();

				expect(expectedResult).to.deep.eq(context);
			});
		});

		it('not in github actions', () => {
			sandbox.stub(process, 'env').value({});

			expect(getContext).to.throw('GitHub context unavailable');
		});
	});
});
