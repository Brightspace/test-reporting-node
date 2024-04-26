const { formatErrorAjv, validateReportV1Ajv, validateReportV1ContextAjv, latestReportVersion } = require('./schema.cjs');
const { flatten } = require('./object.cjs');
const fs = require('node:fs');
const { makeRelativeFilePath } = require('./system.cjs');
const { resolve } = require('node:path');

const getReportVersion = (report) => {
	const { reportVersion } = report;

	switch (reportVersion) {
		case null:
		case undefined:
			throw new Error('Unable to determine report version');
		default:
			return reportVersion;
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
		default:
			throw new Error(`Unknown report version '${reportVersion}'`);
	}

	if (errors && errors.length !== 0) {
		throw new Error(formatErrorAjv(dataVar, errors));
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

const injectReportContext = (report, context, override) => {
	const reportVersion = getReportVersion(report);

	switch (reportVersion) {
		case 1:
			return injectReportV1Context(report, context, override);
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

const injectReportLmsInfo = (report, lmsInfo) => {
	const reportVersion = getReportVersion(report);

	switch (reportVersion) {
		case 1:
			return injectReportV1LmsInfo(report, lmsInfo);
		default:
			throw new Error(`Unknown report version '${reportVersion}'`);
	}
};

const upgradeReport = (report) => {
	const reportVersion = getReportVersion(report);

	switch (reportVersion) {
		case 1:
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
		return this._report.reportId;
	}

	getVersionOriginal() {
		return this._reportVersionOriginal;
	}

	getVersion() {
		return this._report.reportVersion;
	}

	getContext() {
		const { summary } = this._report;

		return {
			github: {
				organization: summary.githubOrganization,
				repository: summary.githubRepository,
				workflow: summary.githubWorkflow,
				runId: summary.githubRunId,
				runAttempt: summary.githubRunAttempt
			},
			git: {
				branch: summary.gitBranch,
				sha: summary.gitSha
			}
		};
	}

	toJSON() {
		return this._report;
	}
}

module.exports = { Report };
