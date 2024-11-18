const escapeSpecialCharacters = (str) => {
	return str
		.replace(/[\\]/g, '\\\\')
		.replace(/[\b]/g, '\\b')
		.replace(/[\f]/g, '\\f')
		.replace(/[\n]/g, '\\n')
		.replace(/[\r]/g, '\\r')
		.replace(/[\t]/g, '\\t');
};

module.exports = { escapeSpecialCharacters };