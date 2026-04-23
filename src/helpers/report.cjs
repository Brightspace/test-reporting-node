const schema = require('./schema.cjs');
const { flatten } = require('./object.cjs');
const fs = require('node:fs');
const { makeRelativeFilePath } = require('./system.cjs');
const { omit } = require('lodash');
const { resolve } = require('node:path');

const {
	formatErrorAjv,
	validateReportV1Ajv,
	validateReportV2Ajv,
	validateReportV1ContextAjv,
	validateReportV2ContextAjv,
	latestReportVersion
} = schema;

const getReportVersion = (report) => {
	const { reportVersion, version } = report;
	const resolvedVersion = reportVersion ?? version;

	switch (resolvedVersion) {
		case null:
		case undefined:
			throw new Error('Unable to determine report version');
		default:
			return resolvedVersion;
	}
};

const validateReport = (report, dataVar = 'report') => {
	const reportVersion = getReportVersion(report);
	let errors;

	switch (reportVersion) {
		case 1:
			if (!validateReportV1Ajv(report)) {
				errors = validateReportV1Ajv.errors;
			}

			break;
		case 2:
			if (!validateReportV2Ajv(report)) {
				errors = validateReportV2Ajv.errors;
			}

			break;
		default:
			throw new Error(`Unknown report version '${reportVersion}'`);
	}

	if (errors && errors.length !== 0) {
		throw new Error(formatErrorAjv(errors, { dataVar }));
	}
};

const injectReportV1Context = (report, context, override) => {
	const { summary } = report;

	if (!summary) {
		throw new Error('Report is missing needed property \'summary\'');
	}

	if (override || !validateReportV1ContextAjv(summary)) {
		report.summary = {
			...summary,
			...flatten(context)
		};
	}

	return report;
};

const injectReportV2Context = (report, context, override) => {
	const { summary } = report;

	if (!summary) {
		throw new Error('Report is missing needed property \'summary\'');
	}

	if (override || !validateReportV2ContextAjv(summary)) {
		report.summary = {
			...summary,
			...context
		};
	}

	return report;
};

const injectReportContext = (report, context, override) => {
	const reportVersion = getReportVersion(report);

	switch (reportVersion) {
		case 1:
			return injectReportV1Context(report, context, override);
		case 2:
			return injectReportV2Context(report, context, override);
		default:
			throw new Error(`Unknown report version '${reportVersion}'`);
	}
};

const injectReportV1LmsInfo = (report, lmsInfo) => {
	const { summary } = report;

	if (!summary) {
		throw new Error('Report is missing needed property \'summary\'');
	}

	const { buildNumber, instanceUrl } = lmsInfo;

	if (buildNumber) {
		if (!summary.lmsBuildNumber) {
			summary.lmsBuildNumber = buildNumber;
		} else {
			throw new Error('LMS build number already present');
		}
	}

	if (instanceUrl) {
		if (!summary.lmsInstanceUrl) {
			summary.lmsInstanceUrl = instanceUrl;
		} else {
			throw new Error('LMS instance URL already present');
		}
	}

	report.summary = summary;

	return report;
};

const injectReportV2LmsInfo = (report, lmsInfo) => {
	const { summary } = report;

	if (!summary) {
		throw new Error('Report is missing needed property \'summary\'');
	}

	summary.lms = summary.lms ?? {};

	const { buildNumber, instanceUrl } = lmsInfo;

	if (buildNumber) {
		if (!summary.lms.buildNumber) {
			summary.lms.buildNumber = buildNumber;
		} else {
			throw new Error('LMS build number already present');
		}
	}

	if (instanceUrl) {
		if (!summary.lms.instanceUrl) {
			summary.lms.instanceUrl = instanceUrl;
		} else {
			throw new Error('LMS instance URL already present');
		}
	}

	report.summary = summary;

	return report;
};

const injectReportLmsInfo = (report, lmsInfo) => {
	const reportVersion = getReportVersion(report);

	switch (reportVersion) {
		case 1:
			return injectReportV1LmsInfo(report, lmsInfo);
		case 2:
			return injectReportV2LmsInfo(report, lmsInfo);
		default:
			throw new Error(`Unknown report version '${reportVersion}'`);
	}
};

const upgradeReportV1ToV2 = (report) => {
	const { reportId, summary, details } = report;
	const {
		githubOrganization,
		githubRepository,
		githubWorkflow,
		githubRunId,
		githubRunAttempt,
		gitBranch,
		gitSha,
		totalDuration,
		countPassed,
		countFailed,
		countSkipped,
		countFlaky,
		lmsBuildNumber,
		lmsInstanceUrl
	} = summary;
	const summaryCommon = omit(
		summary,
		[
			'githubOrganization',
			'githubRepository',
			'githubWorkflow',
			'githubRunId',
			'githubRunAttempt',
			'gitBranch',
			'gitSha',
			'totalDuration',
			'countPassed',
			'countFailed',
			'countSkipped',
			'countFlaky',
			'lmsBuildNumber',
			'lmsInstanceUrl'
		]
	);

	const summaryUpgraded = {
		...summaryCommon,
		github: {
			organization: githubOrganization,
			repository: githubRepository,
			workflow: githubWorkflow,
			runId: githubRunId,
			runAttempt: githubRunAttempt
		},
		git: {
			branch: gitBranch,
			sha: gitSha
		},
		count: {
			passed: countPassed,
			failed: countFailed,
			skipped: countSkipped,
			flaky: countFlaky
		},
		duration: {
			total: totalDuration
		}
	};

	if (lmsBuildNumber) {
		summaryUpgraded.lms = summaryUpgraded.lms ?? {};
		summaryUpgraded.lms.buildNumber = lmsBuildNumber;
	}

	if (lmsInstanceUrl) {
		summaryUpgraded.lms = summaryUpgraded.lms ?? {};
		summaryUpgraded.lms.instanceUrl = lmsInstanceUrl;
	}

	return {
		id: reportId,
		version: 2,
		summary: summaryUpgraded,
		details: details.map((detail) => {
			const { location, duration, totalDuration } = detail;
			const detailCommon = omit(detail, ['totalDuration']);

			return {
				...detailCommon,
				location: {
					file: location
				},
				duration: {
					total: totalDuration,
					final: duration
				}
			};
		})
	};
};

const upgradeReport = (report) => {
	const reportVersion = getReportVersion(report);

	switch (reportVersion) {
		case 1:
			return upgradeReportV1ToV2(report);
		case 2:
			return report;
		default:
			throw new Error(`Unknown report version: ${reportVersion}`);
	}
};

class Report {
	constructor(path, { context, lmsInfo, overrideContext = false } = {}) {
		let report;

		try {
			path = resolve(path);

			const contents = fs.readFileSync(path, 'utf8');

			report = JSON.parse(contents);
		} catch {
			throw new Error(`Unable to read/parse report at path ${path}`);
		}

		if (context) {
			report = injectReportContext(report, context, overrideContext);
		}

		if (lmsInfo) {
			report = injectReportLmsInfo(report, lmsInfo);
		}

		const reportVersionOriginal = getReportVersion(report);

		validateReport(report, `report (v${reportVersionOriginal})`);

		this._reportVersionOriginal = reportVersionOriginal;

		if (reportVersionOriginal < latestReportVersion) {
			report = upgradeReport(report);

			const reportVersionUpgraded = getReportVersion(report);

			validateReport(report, `report (v${reportVersionUpgraded})`);
		} else if (reportVersionOriginal > latestReportVersion) {
			throw new Error(`Unsupported report version specified: ${reportVersionOriginal}`);
		}

		this._report = report;
		this._reportPath = makeRelativeFilePath(path);
	}

	getPath() {
		return this._reportPath;
	}

	getId() {
		return this._report.id;
	}

	getVersionOriginal() {
		return this._reportVersionOriginal;
	}

	getVersion() {
		return this._report.version;
	}

	getContext() {
		const { summary: { github, git } } = this._report;

		return { github, git };
	}

	toJSON() {
		return this._report;
	}
}

module.exports = { Report };
