const { ajv: { errorsText }, validateReportAjv } = require('./schema.cjs');

const validateReport = (report) => {
	if (!validateReportAjv(report)) {
		const { errors } = validateReportAjv;
		const message = errorsText(errors, { dataVar: 'report' });

		throw new Error(`Report does not conform to schema: ${message}`);
	}
};

module.exports = { validateReport };
