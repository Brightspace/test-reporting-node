const Ajv = require('ajv/dist/2019');
const addFormats = require('ajv-formats');

const ajv = new Ajv({
	verbose: true,
	strict: true,
	allErrors: false,
	schemas: [
		require('../../schemas/report/v1.json'),
		require('../../schemas/report-configuration/v1.json')
	]
});

addFormats(ajv, ['date-time', 'uri', 'uuid']);

ajv.addSchema({
	$schema: 'https://json-schema.org/draft/2019-09/schema',
	$id: '/test-reporting/schemas/report/v1/context/strict.json',
	$ref: '/test-reporting/schemas/report/v1/context.json',
	type: 'object',
	unevaluatedProperties: false
});

ajv.addSchema({
	$schema: 'https://json-schema.org/draft/2019-09/schema',
	$id: '/test-reporting/schemas/report/v1/context/loose.json',
	$ref: '/test-reporting/schemas/report/v1/context.json',
	type: 'object',
	unevaluatedProperties: true
});

const validateReportV1ContextLooseAjv = ajv.getSchema('/test-reporting/schemas/report/v1/context/loose.json');
const validateReportV1ContextStrictAjv = ajv.getSchema('/test-reporting/schemas/report/v1/context/strict.json');
const validateReportV1Ajv = ajv.getSchema('/test-reporting/schemas/report/v1.json');
const validateReportConfigurationV1Ajv = ajv.getSchema('/test-reporting/schemas/report-configuration/v1.json');

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
	validateReportV1ContextLooseAjv,
	validateReportV1ContextStrictAjv,
	validateReportV1Ajv,
	validateReportConfigurationV1Ajv
};
