const os = require('node:os');
const { relative, sep: platformSeparator } = require('node:path');
const { join } = require('node:path/posix');
const { fileURLToPath } = require('node:url');

const getOperatingSystemType = () => {
	switch (os.type()) {
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
	if (filePath.startsWith('file:')) {
		filePath = fileURLToPath(filePath);
	}

	const relativePath = relative(process.cwd(), filePath);
	const pathParts = relativePath.split(platformSeparator);

	return join(...pathParts);
};

module.exports = { getOperatingSystemType, makeRelativeFilePath };
