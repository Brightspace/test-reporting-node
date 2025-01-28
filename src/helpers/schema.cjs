const Ajv = require('ajv/dist/2019');
const addFormats = require('ajv-formats');
const addErrors = require('ajv-errors');

const latestReportSchema = require('../../schemas/report/v2.json');
const ajv = new Ajv({
	verbose: true,
	strict: true,
	allErrors: true
});

addErrors(ajv);
addFormats(ajv, ['date-time', 'uri', 'uuid']);

ajv.addSchema(require('../../schemas/report-configuration/v1.json'));
ajv.addSchema(require('../../schemas/report/v1.json'));
ajv.addSchema(latestReportSchema);
ajv.addSchema({
	$schema: 'https://json-schema.org/draft/2019-09/schema',
	$id: '/test-reporting/schemas/report/v1/context/loose.json',
	$ref: '/test-reporting/schemas/report/v1/context.json',
	type: 'object',
	unevaluatedProperties: true
});
ajv.addSchema({
	$schema: 'https://json-schema.org/draft/2019-09/schema',
	$id: '/test-reporting/schemas/report/v2/context/loose.json',
	$ref: '/test-reporting/schemas/report/v2/context.json',
	type: 'object',
	unevaluatedProperties: true
});

const validateReportConfigurationV1Ajv = ajv.getSchema('/test-reporting/schemas/report-configuration/v1.json');
const validateReportV1ContextAjv = ajv.getSchema('/test-reporting/schemas/report/v1/context/loose.json');
const validateReportV2ContextAjv = ajv.getSchema('/test-reporting/schemas/report/v2/context/loose.json');
const validateReportV1Ajv = ajv.getSchema('/test-reporting/schemas/report/v1.json');
const validateReportV2Ajv = ajv.getSchema('/test-reporting/schemas/report/v2.json');
const formatErrorAjv = ajv.errorsText;
const { properties: latestReportSchemaProperties } = latestReportSchema;
const { version: { const: latestReportVersion } } = latestReportSchemaProperties;
const { details: { items: { properties: { browser: { enum: latestSupportedBrowsers } } } } } = latestReportSchemaProperties;

module.exports = {
	formatErrorAjv,
	validateReportConfigurationV1Ajv,
	validateReportV1ContextAjv,
	validateReportV2ContextAjv,
	validateReportV1Ajv,
	validateReportV2Ajv,
	latestReportVersion,
	latestSupportedBrowsers
};
