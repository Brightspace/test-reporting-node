const Ajv = require('ajv/dist/2019');
const addFormats = require('ajv-formats');

const nonEmptyNoPaddingStringSchema = {
	$id: '/test-reporting/non-empty-no-padding-string',
	type: 'string',
	minLength: 1,
	pattern: '^(?!\\s).+(?<!\\s)$'
};
const contextSchema = {
	$id: '/test-reporting/context',
	$defs: {
		gitHubPattern: {
			type: 'string',
			pattern: '[A-Za-z0-9_.-]+'
		}
	},
	type: 'object',
	properties: {
		githubOrganization: { $ref: '#/$defs/gitHubPattern' },
		githubRepository: { $ref: '#/$defs/gitHubPattern' },
		githubWorkflow: { $ref: '/test-reporting/non-empty-no-padding-string' },
		githubRunId: {
			type: 'integer',
			minimum: 0
		},
		githubRunAttempt: {
			type: 'integer',
			minimum: 1
		},
		gitBranch: { $ref: '/test-reporting/non-empty-no-padding-string' },
		gitSha: {
			type: 'string',
			minLength: 40,
			maxLength: 40,
			pattern: '[A-Fa-f0-9]+'
		}
	},
	required: [
		'githubOrganization',
		'githubRepository',
		'githubWorkflow',
		'githubRunId',
		'githubRunAttempt',
		'gitBranch',
		'gitSha'
	]
};
const contextSchemaLoose = {
	$id: '/test-reporting/context-loose',
	$ref: '/test-reporting/context',
	type: 'object',
	unevaluatedProperties: true
};
const contextSchemaStrict = {
	$id: '/test-reporting/context-strict',
	$ref: '/test-reporting/context',
	type: 'object',
	unevaluatedProperties: false
};
const reportSchema = {
	$id: '/test-reporting/report',
	type: 'object',
	properties: {
		reportId: {
			type: 'string',
			format: 'uuid'
		},
		reportVersion: {
			type: 'integer',
			const: 1
		},
		summary: {
			type: 'object',
			$ref: '/test-reporting/context',
			properties: {
				lmsBuild: {
					type: 'string',
					pattern: '([0-9]{2}\\.){3}[0-9]{5}'
				},
				lmsInstance: {
					type: 'string',
					format: 'uri'
				},
				operatingSystem: {
					type: 'string',
					enum: ['windows', 'linux', 'mac']
				},
				framework: { $ref: '/test-reporting/non-empty-no-padding-string' },
				started: {
					type: 'string',
					format: 'date-time'
				},
				totalDuration: {
					type: 'integer',
					minimum: 0
				},
				status: {
					type: 'string',
					enum: ['passed', 'failed']
				},
				countPassed: {
					type: 'integer',
					minimum: 0
				},
				countFailed: {
					type: 'integer',
					minimum: 0
				},
				countSkipped: {
					type: 'integer',
					minimum: 0
				},
				countFlaky: {
					type: 'integer',
					minimum: 0
				}
			},
			required: [
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
			unevaluatedProperties: false
		},
		details: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					name: { $ref: '/test-reporting/non-empty-no-padding-string' },
					location: { $ref: '/test-reporting/non-empty-no-padding-string' },
					started: { type: 'string', format: 'date-time' },
					duration: {
						type: 'integer',
						minimum: 0
					},
					totalDuration: {
						type: 'integer',
						minimum: 0
					},
					status: { type: 'string', enum: ['passed', 'failed', 'skipped'] },
					tool: { $ref: '/test-reporting/non-empty-no-padding-string' },
					experience: { $ref: '/test-reporting/non-empty-no-padding-string' },
					type: { $ref: '/test-reporting/non-empty-no-padding-string' },
					browser: { type: 'string', enum: ['chromium', 'chrome', 'firefox', 'webkit'] },
					retries: {
						type: 'integer',
						minimum: 0
					}
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
			},
			minItems: 1,
			uniqueItems: true
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

const ajv = new Ajv({
	verbose: true,
	strict: true,
	schemas: [
		nonEmptyNoPaddingStringSchema,
		contextSchema,
		contextSchemaStrict,
		contextSchemaLoose,
		reportSchema
	]
});

addFormats(ajv, ['date-time', 'uri', 'uuid']);

const validateContextLooseAjv = ajv.getSchema('/test-reporting/context-loose');
const validateContextStrictAjv = ajv.getSchema('/test-reporting/context-strict');
const validateReportAjv = ajv.getSchema('/test-reporting/report');

module.exports = {
	ajv,
	validateContextLooseAjv,
	validateContextStrictAjv,
	validateReportAjv
};
