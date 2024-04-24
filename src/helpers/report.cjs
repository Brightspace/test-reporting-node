const { formatErrorAjv, validateReportV1Ajv } = require('./schema.cjs');

const validateReport = (report) => {
	if (!validateReportV1Ajv(report)) {
		const { errors } = validateReportV1Ajv;

		throw new Error(formatErrorAjv('report', errors));
	}
};

module.exports = { validateReport };
