const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ verbose: true });

addFormats(ajv, ['date-time', 'uri', 'uuid']);

const nonEmptyStringPattern = '^(?!\\s).+(?<!\\s)$';
const gitHubPattern = '[A-Za-z0-9_.-]+';
const contextProperties = {
	githubOrganization: { type: 'string', pattern: gitHubPattern },
	githubRepository: { type: 'string', pattern: gitHubPattern },
	githubWorkflow: { type: 'string', pattern: nonEmptyStringPattern },
	githubRunId: { type: 'integer', minimum: 0 },
	githubRunAttempt: { type: 'integer', minimum: 1 },
	gitBranch: { type: 'string', pattern: nonEmptyStringPattern },
	gitSha: { type: 'string', pattern: '([A-Fa-f0-9]{40})' }
};
const contextSchema = {
	type: 'object',
	properties: contextProperties,
	required: Object.keys(contextProperties)
};
const contextSchemaLoose = {
	...contextSchema,
	additionalProperties: true
};
const contextSchemaStrict = {
	...contextSchema,
	additionalProperties: false
};
const reportSchema = {
	type: 'object',
	properties: {
		reportId: { type: 'string', format: 'uuid' },
		reportVersion: { type: 'integer', const: 1 },
		summary: {
			type: 'object',
			properties: {
				...contextProperties,
				lmsBuild: { type: 'string', pattern: '([0-9]{2}\\.){3}[0-9]{5}' },
				lmsInstance: { type: 'string', format: 'uri' },
				operatingSystem: { type: 'string', enum: ['windows', 'linux', 'mac'] },
				framework: { type: 'string', pattern: nonEmptyStringPattern },
				started: { type: 'string', format: 'date-time' },
				totalDuration: { type: 'integer', minimum: 0 },
				status: { type: 'string', enum: ['passed', 'failed'] },
				countPassed: { type: 'integer', minimum: 0 },
				countFailed: { type: 'integer', minimum: 0 },
				countSkipped: { type: 'integer', minimum: 0 },
				countFlaky: { type: 'integer', minimum: 0 }
			},
			required: [
				...Object.keys(contextProperties),
				'operatingSystem',
				'framework',
				'started',
				'totalDuration',
				'status',
				'countPassed',
				'countFailed',
				'countSkipped',
				'countFlaky'
			],
			additionalProperties: false
		},
		details: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					name: { type: 'string', pattern: nonEmptyStringPattern },
					location: { type: 'string', pattern: nonEmptyStringPattern },
					started: { type: 'string', format: 'date-time' },
					duration: { type: 'integer', minimum: 0 },
					totalDuration: { type: 'integer', minimum: 0 },
					status: { type: 'string', enum: ['passed', 'failed', 'skipped'] },
					tool: { type: 'string', pattern: nonEmptyStringPattern },
					experience: { type: 'string', pattern: nonEmptyStringPattern },
					type: { type: 'string', pattern: nonEmptyStringPattern },
					browser: { type: 'string', enum: ['chromium', 'chrome', 'firefox', 'webkit'] },
					retries: { type: 'integer', minimum: 0 }
				},
				required: [
					'name',
					'location',
					'started',
					'duration',
					'totalDuration',
					'status',
					'retries'
				],
				additionalProperties: false
			}
		}
	},
	required: [
		'reportId',
		'reportVersion',
		'summary',
		'details'
	],
	additionalProperties: false
};

const validateContextLooseAjv = ajv.compile(contextSchemaLoose);
const validateContextStrictAjv = ajv.compile(contextSchemaStrict);
const validateReportAjv = ajv.compile(reportSchema);

module.exports = {
	ajv,
	validateContextLooseAjv,
	validateContextStrictAjv,
	validateReportAjv
};
