const Ajv = require('ajv/dist/2019');
const addFormats = require('ajv-formats');

const latestReportSchema = require('../../schemas/report/v2.json');
const ajv = new Ajv({
	verbose: true,
	strict: true,
	allErrors: false,
	schemas: [
		require('../../schemas/report-configuration/v1.json'),
		require('../../schemas/report/v1.json'),
		latestReportSchema
	]
});

addFormats(ajv, ['date-time', 'uri', 'uuid']);

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
const { properties: latestReportSchemaProperties } = latestReportSchema;
const { version: { const: latestReportVersion } } = latestReportSchemaProperties;
const { details: { items: { properties: { browser: { enum: latestSupportedBrowsers } } } } } = latestReportSchemaProperties;

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
	validateReportConfigurationV1Ajv,
	validateReportV1ContextAjv,
	validateReportV2ContextAjv,
	validateReportV1Ajv,
	validateReportV2Ajv,
	latestReportVersion,
	latestSupportedBrowsers
};
