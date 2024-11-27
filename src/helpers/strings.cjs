const escapeSpecialCharacters = (str) => {
	return str
		.replace(/[\\]/g, '\\\\')
		.replace(/[\0]/g, '\\0')
		.replace(/[\b]/g, '\\b')
		.replace(/[\n]/g, '\\n')
		.replace(/[\r]/g, '\\r')
		.replace(/[\t]/g, '\\t')
		.replace(/[\v]/g, '\\v')
		.replace(/[\f]/g, '\\f');
};

module.exports = { escapeSpecialCharacters };
