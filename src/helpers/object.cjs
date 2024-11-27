const flatten = (obj) => {
	const result = {};

	for (const i in obj) {
		if (!Object.prototype.hasOwnProperty.call(obj, i)) {
			continue;
		}

		if ((typeof obj[i]) === 'object' && !Array.isArray(obj[i])) {
			const flatObject = flatten(obj[i]);

			for (const x in flatObject) {
				if (!Object.prototype.hasOwnProperty.call(flatObject, x)) {
					continue;
				}

				const key = `${i}${x.charAt(0).toUpperCase()}${x.substring(1)}`;

				result[key] = flatObject[x];
			}
		} else {
			result[i] = obj[i];
		}
	}

	return result;
};

module.exports = { flatten };
