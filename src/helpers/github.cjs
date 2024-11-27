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
		github: {
			organization: owner,
			repository: repo,
			workflow: workflowPath.replace(workflowRegex, ''),
			runId: parseInt(GITHUB_RUN_ID, 10),
			runAttempt: parseInt(GITHUB_RUN_ATTEMPT, 10)
		},
		git: {
			branch: branchRef.replace(/^refs\/heads\//i, ''),
			sha: GITHUB_SHA
		}
	};
};

module.exports = { getContext, hasContext };
