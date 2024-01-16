const { relative, sep: platformSeparator, resolve } = require('path');
const { join } = require('path/posix');
const { readFileSync, writeFileSync } = require('fs');
const { type } = require('os');

const defaultReportPath = './d2l-test-report.json';
const defaultConfigurationPath = './d2l-test-reporting.config.json';
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

const determineReportPath = (reportPath) => {
	return resolve(reportPath ?? defaultReportPath);
};

const getConfiguration = (configurationPath) => {
	if (configurationPath) {
		configurationPath = resolve(configurationPath);

		try {
			const configurationData = readFileSync(configurationPath, 'utf8');

			return JSON.parse(configurationData);
		} catch {
			throw new Error(`Unable to read/parse configuration at path ${configurationPath}`);
		}
	}

	configurationPath = resolve(defaultConfigurationPath);

	let configurationData;

	try {
		configurationData = readFileSync(configurationPath, 'utf8');
	} catch {
		return {};
	}

	try {
		return JSON.parse(configurationData);
	} catch {
		throw new Error(`Unable to read/parse configuration at path ${defaultConfigurationPath}`);
	}
};

const getMetaData = (configuration, callback, location) => {
	const metadata = {};

	for (const override of configuration.overrides ?? []) {
		const { pattern, type, tool, experience } = override;

		if (callback(location, pattern)) {
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

const writeReport = (reportPath, report)=> {
	writeFileSync(reportPath, JSON.stringify(report, memberPriority), 'utf8');
};

module.exports = {
	getOperatingSystem,
	makeLocation,
	determineReportPath,
	getConfiguration,
	getMetaData,
	writeReport
};
