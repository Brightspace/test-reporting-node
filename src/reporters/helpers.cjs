const { relative, sep: platformSeparator, resolve } = require('node:path');
const { join } = require('node:path/posix');
const { minimatch } = require('minimatch');
const { readFileSync, writeFileSync } = require('node:fs');
const { type } = require('node:os');

const defaultReportPath = './d2l-test-report.json';
const defaultConfigurationPath = './d2l-test-reporting.config.json';
const reportMemberPriority = [
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

const determineReportPath = (path) => {
	return resolve(path ?? defaultReportPath);
};

const getReportConfiguration = (path) => {
	if (path) {
		path = resolve(path);

		try {
			const contents = readFileSync(path, 'utf8');

			return JSON.parse(contents);
		} catch {
			throw new Error(`Unable to read/parse configuration at path ${path}`);
		}
	}

	path = resolve(defaultConfigurationPath);

	let contents;

	try {
		contents = readFileSync(path, 'utf8');
	} catch {
		return {};
	}

	try {
		return JSON.parse(contents);
	} catch {
		throw new Error(`Unable to read/parse configuration at path ${path}`);
	}
};

const getReportOptions = (configuration, location) => {
	const metadata = {};

	for (const override of configuration.overrides ?? []) {
		const { pattern, type, tool, experience } = override;

		if (minimatch(location, pattern)) {
			metadata.type = type;
			metadata.tool = tool;
			metadata.experience = experience;

			break;
		}
	}

	metadata.type = metadata.type ?? configuration.type;
	metadata.tool = metadata.tool ?? configuration.tool;
	metadata.experience = metadata.experience ?? configuration.experience;

	return metadata;
};

const writeReport = (reportPath, report) => {
	writeFileSync(reportPath, JSON.stringify(report, reportMemberPriority), 'utf8');
};

module.exports = {
	getOperatingSystem,
	makeLocation,
	determineReportPath,
	getReportConfiguration,
	getReportOptions,
	writeReport
};
