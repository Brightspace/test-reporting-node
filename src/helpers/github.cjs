const { formatErrorAjv, validateReportV1ContextLooseAjv, validateReportV1ContextStrictAjv } = require('./schema.cjs');

const hasContext = () => {
	const { env: { GITHUB_ACTIONS } } = process;

	return !!GITHUB_ACTIONS;
};

const getContext = () => {
	if (!hasContext()) {
		throw new Error('GitHub context unavailable');
	}

	const { env: {
		GITHUB_REPOSITORY,
		GITHUB_WORKFLOW_REF,
		GITHUB_RUN_ID,
		GITHUB_RUN_ATTEMPT,
		GITHUB_HEAD_REF,
		GITHUB_REF,
		GITHUB_SHA
	} } = process;
	const [owner, repo] = GITHUB_REPOSITORY.split('/');
	const [workflowPath] = GITHUB_WORKFLOW_REF.split('@');
	const workflowRegex = new RegExp(`^${owner}/${repo}/.github/workflows/`);
	const branchRef = GITHUB_HEAD_REF || GITHUB_REF;

	return {
		githubOrganization: owner,
		githubRepository: repo,
		githubWorkflow: workflowPath.replace(workflowRegex, ''),
		githubRunId: parseInt(GITHUB_RUN_ID, 10),
		githubRunAttempt: parseInt(GITHUB_RUN_ATTEMPT, 10),
		gitBranch: branchRef.replace(/^refs\/heads\//i, ''),
		gitSha: GITHUB_SHA
	};
};

const validateContext = (context, strict = false) => {
	const validateContextAjv = strict ?
		validateReportV1ContextStrictAjv :
		validateReportV1ContextLooseAjv;

	if (!validateContextAjv(context)) {
		const { errors } = validateContextAjv;

		throw new Error(formatErrorAjv('github context', errors));
	}
};

module.exports = { getContext, hasContext, validateContext };
