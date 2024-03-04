const Ajv = require('ajv/dist/2019');
const addFormats = require('ajv-formats');

const nonEmptyUnpaddedStringSchema = {
	$id: '/testReporting/nonEmptyUnpaddedString',
	type: 'string',
	minLength: 1,
	pattern: '^(?!\\s).+(?<!\\s)$'
};
const contextSchema = {
	$id: '/testReporting/context',
	$defs: {
		gitHubAllowedCharactersString: {
			type: 'string',
			minLength: 1,
			pattern: '[A-Za-z0-9_.-]+'
		}
	},
	type: 'object',
	properties: {
		githubOrganization: { $ref: '#/$defs/gitHubAllowedCharactersString' },
		githubRepository: { $ref: '#/$defs/gitHubAllowedCharactersString' },
		githubWorkflow: { $ref: '/testReporting/nonEmptyUnpaddedString' },
		gitBranch: { $ref: '/testReporting/nonEmptyUnpaddedString' },
		githubRunId: {
			type: 'integer',
			minimum: 0
		},
		githubRunAttempt: {
			type: 'integer',
			minimum: 1
		},
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
	$id: '/testReporting/contextLoose',
	$ref: '/testReporting/context',
	type: 'object',
	unevaluatedProperties: true
};
const contextSchemaStrict = {
	$id: '/testReporting/contextStrict',
	$ref: '/testReporting/context',
	type: 'object',
	unevaluatedProperties: false
};
const reportSchema = {
	$id: '/testReporting/report',
	type: 'object',
	unevaluatedProperties: false,
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
			$ref: '/testReporting/context',
			type: 'object',
			unevaluatedProperties: false,
			properties: {
				framework: { $ref: '/testReporting/nonEmptyUnpaddedString' },
				lmsBuildNumber: {
					type: 'string',
					pattern: '([0-9]{2}\\.){2}[0-9]{1,2}\\.[0-9]{5}'
				},
				lmsInstanceUrl: {
					type: 'string',
					format: 'uri'
				},
				operatingSystem: {
					type: 'string',
					enum: [
						'windows',
						'linux',
						'mac'
					]
				},
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
					enum: [
						'passed',
						'failed'
					]
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
			]
		},
		details: {
			type: 'array',
			minItems: 1,
			uniqueItems: true,
			items: {
				type: 'object',
				unevaluatedProperties: false,
				properties: {
					name: { $ref: '/testReporting/nonEmptyUnpaddedString' },
					location: { $ref: '/testReporting/nonEmptyUnpaddedString' },
					tool: { $ref: '/testReporting/nonEmptyUnpaddedString' },
					experience: { $ref: '/testReporting/nonEmptyUnpaddedString' },
					type: { $ref: '/testReporting/nonEmptyUnpaddedString' },
					started: {
						type: 'string',
						format: 'date-time'
					},
					duration: {
						type: 'integer',
						minimum: 0
					},
					totalDuration: {
						type: 'integer',
						minimum: 0
					},
					status: {
						type: 'string',
						enum: [
							'passed',
							'failed',
							'skipped'
						]
					},
					browser: {
						type: 'string',
						enum: [
							'chromium',
							'chrome',
							'firefox',
							'webkit',
							'safari',
							'edge'
						]
					},
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
				]
			}
		}
	},
	required: [
		'reportId',
		'reportVersion',
		'summary',
		'details'
	]
};
const reportConfigurationSchema = {
	$id: '/testReporting/reportConfiguration',
	$ref: '#/$defs/taxonomyObject',
	$defs: {
		taxonomyObject: {
			type: 'object',
			properties: {
				type: { $ref: '/testReporting/nonEmptyUnpaddedString' },
				tool: { $ref: '/testReporting/nonEmptyUnpaddedString' },
				experience: { $ref: '/testReporting/nonEmptyUnpaddedString' }
			}
		}
	},
	type: 'object',
	unevaluatedProperties: false,
	properties: {
		ignorePatterns: {
			type: 'array',
			minItems: 1,
			uniqueItems: true,
			items: { $ref: '/testReporting/nonEmptyUnpaddedString' }
		},
		overrides: {
			type: 'array',
			minItems: 1,
			uniqueItems: true,
			items: {
				type: 'object',
				unevaluatedProperties: false,
				minProperties: 2,
				$ref: '#/$defs/taxonomyObject',
				properties: {
					pattern: { $ref: '/testReporting/nonEmptyUnpaddedString' }
				},
				required: [
					'pattern'
				]
			}
		}
	},
	allOf: [
		{
			if: {
				properties: {
					type: { const: null }
				}
			},
			then: {
				properties: {
					overrides: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								type: { $ref: '#/$defs/taxonomyObject/properties/type' }
							},
							required: [
								'type'
							]
						}
					}
				}
			}
		},
		{
			if: {
				properties: {
					tool: { const: null }
				}
			},
			then: {
				properties: {
					overrides: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								tool: { $ref: '#/$defs/taxonomyObject/properties/tool' }
							},
							required: [
								'tool'
							]
						}
					}
				}
			}
		},
		{
			if: {
				properties: {
					experience: { const: null }
				}
			},
			then: {
				properties: {
					overrides: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								experience: { $ref: '#/$defs/taxonomyObject/properties/experience' }
							},
							required: [
								'experience'
							]
						}
					}
				}
			}
		},
		{
			if: {
				properties: {
					type: { const: null },
					tool: { const: null },
					experience: { const: null }
				}
			},
			then: {
				required: [
					'overrides'
				]
			}
		}
	]
};

const ajv = new Ajv({
	verbose: true,
	strict: true,
	allErrors: false,
	schemas: [
		nonEmptyUnpaddedStringSchema,
		contextSchema,
		contextSchemaStrict,
		contextSchemaLoose,
		reportSchema,
		reportConfigurationSchema
	]
});

addFormats(ajv, ['date-time', 'uri', 'uuid']);

const validateContextLooseAjv = ajv.getSchema('/testReporting/contextLoose');
const validateContextStrictAjv = ajv.getSchema('/testReporting/contextStrict');
const validateReportAjv = ajv.getSchema('/testReporting/report');
const validateReportConfigurationAjv = ajv.getSchema('/testReporting/reportConfiguration');

const formatErrorAjv = (dataVar, errors) => {
	const { instancePath, message: ajvMessage, parentSchema: { type }, data } = errors[0];
	const formattedData = JSON.stringify(data, null, 2);
	const sanitizedInstancePath = instancePath === '' ? '/' : instancePath;
	const errorMessageParts = [
		`${dataVar} does not conform to schema`,
		`Details: the ${type} at '${sanitizedInstancePath}' ${ajvMessage}`
	];

	if (formattedData.includes('\n')) {
		errorMessageParts.push(`Current value:\n\n${formattedData}\n`);
	} else {
		errorMessageParts.push(`Current value: ${formattedData}`);
	}

	return errorMessageParts.join('\n');
};

module.exports = {
	formatErrorAjv,
	validateContextLooseAjv,
	validateContextStrictAjv,
	validateReportAjv,
	validateReportConfigurationAjv
};
