import { getContext, GitHubActionsUnavailableError, hasContext } from '../src/helpers/github.cjs';
import { createSandbox } from 'sinon';
import { expect } from 'chai';

describe('github', () => {
	let sandbox;

	before(() => sandbox = createSandbox());

	afterEach(() => sandbox.restore());

	describe('has context', () => {
		it('true', () => {
			sandbox.stub(process, 'env').value({ 'GITHUB_ACTIONS': '1' });

			expect(hasContext()).to.be.true;
		});

		it('false', () => {
			sandbox.stub(process, 'env').value({});

			expect(hasContext()).to.be.false;
		});
	});

	describe('get context', () => {
		const expectedResult = {
			githubOrganization: 'TestOrganization',
			githubRepository: 'test-repository',
			githubWorkflow: 'test-workflow.yml',
			githubRunId: 12345,
			githubRunAttempt: 1,
			gitBranch: 'test/branch',
			gitSha: '0000000000000000000000000000000000000000'
		};

		it('pull request', () => {
			sandbox.stub(process, 'env').value({
				'GITHUB_ACTIONS': '1',
				'GITHUB_REPOSITORY': 'TestOrganization/test-repository',
				'GITHUB_WORKFLOW_REF': 'TestOrganization/test-repository/.github/workflows/test-workflow.yml@refs/heads/test/branch',
				'GITHUB_RUN_ID': '12345',
				'GITHUB_RUN_ATTEMPT': '1',
				'GITHUB_HEAD_REF': 'test/branch',
				'GITHUB_SHA': '0000000000000000000000000000000000000000'
			});

			const context = getContext();

			expect(expectedResult).to.deep.eq(context);
		});

		it('branch', () => {
			sandbox.stub(process, 'env').value({
				'GITHUB_ACTIONS': '1',
				'GITHUB_REPOSITORY': 'TestOrganization/test-repository',
				'GITHUB_WORKFLOW_REF': 'TestOrganization/test-repository/.github/workflows/test-workflow.yml@refs/heads/test/branch',
				'GITHUB_RUN_ID': '12345',
				'GITHUB_RUN_ATTEMPT': '1',
				'GITHUB_REF': 'test/branch',
				'GITHUB_SHA': '0000000000000000000000000000000000000000'
			});

			const context = getContext();

			expect(expectedResult).to.deep.eq(context);
		});

		describe('fails', () => {
			it('not in github actions', () => {
				sandbox.stub(process, 'env').value({});

				try {
					getContext();
				} catch (err) {
					expect(err).instanceOf(GitHubActionsUnavailableError);

					return;
				}

				throw new Error('failed');
			});
		});
	});
});
