import { getContext, hasContext, validateContext } from '../../src/helpers/github.cjs';
import { createSandbox } from 'sinon';
import { expect } from 'chai';

const validContext = {
	githubOrganization: 'TestOrganization',
	githubRepository: 'test-repository',
	githubWorkflow: 'test-workflow.yml',
	githubRunId: 12345,
	githubRunAttempt: 1,
	gitBranch: 'test/branch',
	gitSha: '0000000000000000000000000000000000000000'
};

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
		const expectedResult = validContext;
		const commonEnvironment = {
			'GITHUB_ACTIONS': '1',
			'GITHUB_REPOSITORY': 'TestOrganization/test-repository',
			'GITHUB_WORKFLOW_REF': 'TestOrganization/test-repository/.github/workflows/test-workflow.yml@refs/heads/test/branch',
			'GITHUB_RUN_ID': '12345',
			'GITHUB_RUN_ATTEMPT': '1',
			'GITHUB_SHA': '0000000000000000000000000000000000000000'
		};

		it('pull request', () => {
			sandbox.stub(process, 'env').value({
				...commonEnvironment,
				'GITHUB_HEAD_REF': 'test/branch'
			});

			const context = getContext();

			expect(expectedResult).to.deep.eq(context);
		});

		it('branch', () => {
			sandbox.stub(process, 'env').value({
				...commonEnvironment,
				'GITHUB_REF': 'test/branch'
			});

			const context = getContext();

			expect(expectedResult).to.deep.eq(context);
		});

		describe('fails', () => {
			it('not in github actions', () => {
				sandbox.stub(process, 'env').value({});

				expect(getContext).to.throw('GitHub context unavailable');
			});
		});
	});

	describe('validate context', () => {
		const validContextExtraProperties = {
			...validContext,
			test: 'test'
		};

		it('strict', () => {
			const wrapper = () => validateContext(validContext, true);

			expect(wrapper).to.not.throw();
		});

		it('loose', () => {
			const wrapper = () => validateContext(validContextExtraProperties);

			expect(wrapper).to.not.throw();
		});

		describe('fails', () => {
			it('strict with extra properties', () => {
				const wrapper = () => validateContext(validContextExtraProperties, true);

				expect(wrapper).to.throw('github context does not conform to schema');
			});
		});
	});
});
