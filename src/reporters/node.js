import { createRequire } from 'node:module';
import { Transform } from 'node:stream';

const require = createRequire(import.meta.url);

const { ReportBuilder } = require('../helpers/report-builder.cjs');
const { escapeSpecialCharacters } = require('../helpers/strings.cjs');
const { getNow, getNowISOString } = require('../helpers/system.cjs');

class NodeTestLogger {
	info(message) {
		const lines = `${message}`.split(/\r?\n/u);

		for (const line of lines) {
			console.log(`[D2L Reporter] ${line}`);
		}
	}

	warning(message) {
		console.warn(`[D2L Reporter] ${message}`);
	}

	error(message) {
		console.error(`[D2L Reporter] ${message}`);
	}

	location(message, location) {
		this.info(`${message}: ${location}`);
	}
}

const sanitizeName = (name) => {
	return escapeSpecialCharacters(`${name}`).trim();
};

const makeDetailId = (file, name) => {
	return `${file}[${name}]`;
};

const getOptionsFromEnvironment = () => {
	const {
		D2L_TEST_REPORTING_REPORT_PATH,
		D2L_TEST_REPORTING_REPORT_CONFIGURATION_PATH,
		D2L_TEST_REPORTING_VERBOSE
	} = process.env;
	const options = {};

	if (D2L_TEST_REPORTING_REPORT_PATH) {
		options.reportPath = D2L_TEST_REPORTING_REPORT_PATH;
	}

	if (D2L_TEST_REPORTING_REPORT_CONFIGURATION_PATH) {
		options.reportConfigurationPath = D2L_TEST_REPORTING_REPORT_CONFIGURATION_PATH;
	}

	if (D2L_TEST_REPORTING_VERBOSE) {
		options.verbose = ['1', 'true', 'yes'].includes(D2L_TEST_REPORTING_VERBOSE.trim().toLowerCase());
	}

	return options;
};

class NodeTestReporter extends Transform {
	#anyFailure;
	#logger;
	#nameStacks;
	#report;
	#runStarted;
	#startTimes;
	#summary;

	constructor(options = {}) {
		super({ objectMode: true });

		this.#logger = new NodeTestLogger();
		this.#nameStacks = new Map();
		this.#startTimes = new Map();
		this.#anyFailure = false;
		this.#report = null;

		try {
			this.#report = new ReportBuilder('node', this.#logger, options);
		} catch ({ message }) {
			this.#logger.error('Failed to initialize D2L test report builder, report will not be generated');
			this.#logger.error(message);

			return;
		}

		this.#runStarted = getNow();
		this.#summary = this.#report
			.getSummary()
			.addContext()
			.setStarted(this.#runStarted.toISOString());
	}

	#getNameStack(file) {
		if (!this.#nameStacks.has(file)) {
			this.#nameStacks.set(file, []);
		}

		return this.#nameStacks.get(file);
	}

	#buildFullName(file, name, nesting) {
		const nameStack = this.#getNameStack(file);

		nameStack[nesting] = sanitizeName(name);
		nameStack.length = nesting + 1;

		return nameStack.join(' > ');
	}

	#handleStart(data) {
		const { name, nesting, file } = data;

		if (!file || this.#report.ignoreFilePath(file)) {
			return;
		}

		const fullName = this.#buildFullName(file, name, nesting);

		this.#startTimes.set(makeDetailId(file, fullName), getNowISOString());
	}

	#handleResult(type, data) {
		const { name, nesting, file, line, column, details = {}, skip, todo } = data;

		if (type === 'test:fail') {
			this.#anyFailure = true;
		}

		if (details.type === 'suite') {
			return;
		}

		if (!file || this.#report.ignoreFilePath(file)) {
			return;
		}

		const fullName = this.#buildFullName(file, name, nesting);
		const id = makeDetailId(file, fullName);
		const started = this.#startTimes.get(id) ?? getNowISOString();
		const detail = this.#report
			.getDetail(id)
			.setName(fullName)
			.setLocationFile(file)
			.setStarted(started);

		if (typeof line === 'number') {
			detail.setLocationLine(line);
		}

		if (typeof column === 'number') {
			detail.setLocationColumn(column);
		}

		const isSkipped = (skip !== undefined && skip !== false) || (todo !== undefined && todo !== false);

		if (isSkipped) {
			detail
				.setSkipped()
				.setDurationFinal(0)
				.setDurationTotal(0);

			return;
		}

		const duration = Math.max(0, Math.round(details.duration_ms ?? 0));

		detail.addDuration(duration);

		if (type === 'test:pass') {
			detail.setPassed();
		} else {
			detail.setFailed();
		}
	}

	_transform({ type, data }, encoding, callback) {
		if (!this.#report) {
			callback();

			return;
		}

		if (type === 'test:start') {
			this.#handleStart(data);
		} else if (type === 'test:pass' || type === 'test:fail') {
			this.#handleResult(type, data);
		}

		callback();
	}

	_flush(callback) {
		if (!this.#report) {
			this.#logger.error('D2L test report was not generated due to initialization failure');

			callback();

			return;
		}

		const durationTotal = Math.max(1, getNow() - this.#runStarted);

		this.#summary.setDurationTotal(durationTotal);

		if (this.#anyFailure) {
			this.#summary.setFailed();
		} else {
			this.#summary.setPassed();
		}

		this.#report
			.finalize()
			.save();

		callback();
	}
}

export const reporter = (options = {}) => {
	return new NodeTestReporter(options);
};

export default new NodeTestReporter(getOptionsFromEnvironment());
