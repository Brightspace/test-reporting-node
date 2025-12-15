const { relative, sep: platformSeparator } = require('node:path');
const { join } = require('node:path/posix');
const { type } = require('node:os');

const getOperatingSystemType = () => {
	switch (type()) {
		case 'Linux':
			return 'linux';
		case 'Darwin':
			return 'macos';
		case 'Windows_NT':
			return 'windows';
		default:
			throw new Error('Unknown operating system');
	}
};

const makeRelativeFilePath = (filePath) => {
	if (filePath.startsWith('file://')) {
		filePath = filePath.replace('file://', '');
	} else if (filePath.startsWith('file:')) {
		filePath = filePath.replace('file:', '');
	}

	const path = relative(process.cwd(), filePath);
	const pathParts = path.split(platformSeparator);

	return join(...pathParts);
};

module.exports = { getOperatingSystemType, makeRelativeFilePath };
