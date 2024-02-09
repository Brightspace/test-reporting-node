const { formatErrorAjv, validateReportAjv } = require('./schema.cjs');

const validateReport = (report) => {
	if (!validateReportAjv(report)) {
		const { errors } = validateReportAjv;

		throw new Error(formatErrorAjv('report', errors));
	}
};

module.exports = { validateReport };
