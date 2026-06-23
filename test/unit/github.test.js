import { afterEach, describe, it } from 'node:test';
import { getContext, hasContext } from '../../src/helpers/github.cjs';
import { env } from 'node:process';
import { expect } from 'chai';

const originalEnv = { ...env };
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

const setEnv = (values) => {
	for (const key of Object.keys(env)) {
		delete env[key];
	}

	Object.assign(env, values);
};

describe('github', () => {
	afterEach(() => setEnv(originalEnv));

	describe('has context', () => {
		it('false outside actions', () => {
			setEnv({});

			expect(hasContext()).to.be.false;
		});

		it('true in actions', () => {
			setEnv({ 'GITHUB_ACTIONS': '1' });

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

		it('throws outside actions', () => {
			setEnv({});

			expect(getContext).to.throw('GitHub context unavailable');
		});

		it('on pull request', () => {
			setEnv({
				...commonEnvironment,
				'GITHUB_HEAD_REF': 'test/branch'
			});

			const context = getContext();

			expect(expectedResult).to.deep.eq(context);
		});

		it('on branch', () => {
			setEnv({
				...commonEnvironment,
				'GITHUB_REF': 'test/branch'
			});

			const context = getContext();

			expect(expectedResult).to.deep.eq(context);
		});

		it('strips prefix', () => {
			setEnv({
				...commonEnvironment,
				'GITHUB_REF': 'refs/heads/test/branch'
			});

			const context = getContext();

			expect(context.git.branch).to.eq('test/branch');
		});

		it('strips prefix (case-insensitive)', () => {
			setEnv({
				...commonEnvironment,
				'GITHUB_REF': 'Refs/Heads/test/branch'
			});

			const context = getContext();

			expect(context.git.branch).to.eq('test/branch');
		});

		it('prefers head ref', () => {
			setEnv({
				...commonEnvironment,
				'GITHUB_HEAD_REF': 'pr/branch',
				'GITHUB_REF': 'refs/heads/main'
			});

			const context = getContext();

			expect(context.git.branch).to.eq('pr/branch');
		});
	});
});
