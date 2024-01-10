const { relative, sep: platformSeparator } = require('path');
const { join } = require('path/posix');
const { type } = require('os');

const memberPriority = [
	'reportId',
	'reportVersion',
	'summary',
	'details',
	'githubOrganization',
	'githubRepository',
	'githubWorkflow',
	'githubRunId',
	'githubRunAttempt',
	'gitBranch',
	'gitSha',
	'name',
	'status',
	'lmsInstance',
	'lmsBuild',
	'location',
	'browser',
	'framework',
	'operatingSystem',
	'started',
	'totalDuration',
	'duration',
	'tool',
	'experience',
	'type',
	'countPassed',
	'countFailed',
	'countSkipped',
	'countFlaky',
	'retries'
];

const generateReportOutput = (report) => {
	return JSON.stringify(report, memberPriority);
};

const getOperatingSystem = () => {
	switch (type()) {
		case 'Linux':
			return 'linux';
		case 'Darwin':
			return 'macos';
		case 'Windows_NT':
			return 'windows';
		default:
			throw new Error('Unknown operating system');
	}
};

const makeLocation = (filePath) => {
	const path = relative(process.cwd(), filePath);
	const pathParts = path.split(platformSeparator);

	return join(...pathParts);
};

module.exports = { generateReportOutput, getOperatingSystem, makeLocation };
