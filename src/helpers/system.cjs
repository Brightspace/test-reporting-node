const os = require('node:os');
const { relative, sep: platformSeparator } = require('node:path');
const { join } = require('node:path/posix');
const { fileURLToPath } = require('node:url');

// Captured at module load so reporter timestamps survive sinon.useFakeTimers,
// which reassigns globalThis.Date but does not mutate the original constructor
const RealDate = Date;

const getNow = () => {
	return new RealDate();
};

const getNowISOString = () => {
	return new RealDate().toISOString();
};

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

module.exports = {
	getNow,
	getNowISOString,
	getOperatingSystemType,
	makeRelativeFilePath
};
