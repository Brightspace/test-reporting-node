import { afterEach, before, beforeEach, describe, it } from 'node:test';
import { createSandbox } from 'sinon';
import { expect } from 'chai';
import fs from 'node:fs';
import { ReportConfiguration } from '../../src/helpers/report-configuration.cjs';

const configPath = './d2l-test-reporting.config.json';

describe('report configuration', () => {
	let sandbox;
	let logger;

	before(() => sandbox = createSandbox());

	beforeEach(() => {
		logger = {
			info: sandbox.spy(),
			warning: sandbox.spy(),
			error: sandbox.spy(),
			location: sandbox.spy()
		};
	});

	afterEach(() => sandbox.restore());

	const loadConfig = (config) => {
		sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(config));

		return new ReportConfiguration(configPath, logger);
	};

	const warningMessages = () => logger.warning.getCalls().map(call => call.args[0]);

	describe('legacy (v1, upgrades to v2)', () => {
		describe('top-level', () => {
			it('strips experience', () => {
				const config = loadConfig({
					type: 'integration',
					tool: 'Test Reporting',
					experience: 'Test Framework'
				});

				expect(config.toJSON()).to.deep.equal({
					type: 'integration',
					tool: 'Test Reporting'
				});
			});

			it('warns when experience stripped', () => {
				loadConfig({
					type: 'integration',
					tool: 'Test Reporting',
					experience: 'Test Framework'
				});

				expect(warningMessages().some(msg => msg.includes('\'experience\' is no longer supported'))).to.be.true;
			});
		});

		describe('overrides', () => {
			it('strips experience', () => {
				const config = loadConfig({
					type: 'integration',
					tool: 'Test Reporting',
					overrides: [{
						pattern: '**/special.test.js',
						tool: 'Special Tool',
						experience: 'Special Experience'
					}]
				});
				const { overrides } = config.toJSON();

				expect(overrides).to.have.lengthOf(1);
				expect(overrides[0]).to.deep.equal({
					pattern: '**/special.test.js',
					tool: 'Special Tool'
				});
			});

			it('warns when experience stripped', () => {
				loadConfig({
					type: 'integration',
					tool: 'Test Reporting',
					overrides: [{
						pattern: '**/special.test.js',
						tool: 'Special Tool',
						experience: 'Special Experience'
					}]
				});

				expect(warningMessages().some(msg => msg.includes('**/special.test.js') && msg.includes('\'experience\''))).to.be.true;
			});

			it('throws for override with only pattern after experience removed', () => {
				expect(() => loadConfig({
					type: 'integration',
					tool: 'Test Reporting',
					overrides: [{
						pattern: '**/special.test.js',
						experience: 'Special Experience'
					}]
				})).to.throw(/report configuration/);
			});

			it('warns before throwing when experience stripped leaves empty override', () => {
				expect(() => loadConfig({
					type: 'integration',
					tool: 'Test Reporting',
					overrides: [{
						pattern: '**/special.test.js',
						experience: 'Special Experience'
					}]
				})).to.throw();

				expect(warningMessages().some(msg => msg.includes('**/special.test.js') && msg.includes('\'experience\''))).to.be.true;
			});
		});

		it('preserves valid v2 config', () => {
			const input = {
				type: 'integration',
				tool: 'Test Reporting',
				overrides: [{
					pattern: '**/special.test.js',
					tool: 'Special Tool'
				}]
			};
			const config = loadConfig(input);

			expect(config.toJSON()).to.deep.equal(input);
			expect(logger.warning.called).to.be.false;
		});
	});

	describe('validation', () => {
		describe('throws', () => {
			it('for invalid config', () => {
				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify({}));

				expect(() => new ReportConfiguration(configPath, logger)).to.throw(/report configuration/);
			});

			it('when unparseable', () => {
				sandbox.stub(fs, 'readFileSync').returns('not json');

				expect(() => new ReportConfiguration(configPath, logger)).to.throw('Unable to read/parse');
			});
		});

		it('empty without config file', () => {
			sandbox.stub(fs, 'readFileSync').throws(new Error('ENOENT'));

			const config = new ReportConfiguration(undefined, logger);

			expect(config.toJSON()).to.deep.equal({});
		});
	});

	describe('default logger', () => {
		const legacyConfig = {
			type: 'integration',
			tool: 'Test Reporting',
			experience: 'Test Framework'
		};

		for (const logger of [null, undefined]) {
			it(`uses when logger is \`${logger}\``, () => {
				const warn = sandbox.stub(console, 'warn');

				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(legacyConfig));

				expect(() => new ReportConfiguration(configPath, logger)).to.not.throw();
				expect(warn.calledWithMatch(/'experience' is no longer supported/)).to.be.true;
			});
		}
	});

	describe('taxonomy', () => {
		it('lowercases type', () => {
			const config = loadConfig({ type: 'UI', tool: 'My Tool' });

			expect(config.getTaxonomy('test/example.test.js')).to.deep.equal({
				type: 'ui',
				tool: 'My Tool'
			});
		});

		it('applies matching override', () => {
			const config = loadConfig({
				type: 'integration',
				tool: 'Default Tool',
				overrides: [{
					pattern: '**/special.test.js',
					type: 'UI',
					tool: 'Special Tool'
				}]
			});

			expect(config.getTaxonomy('test/special.test.js')).to.deep.equal({
				type: 'ui',
				tool: 'Special Tool'
			});
		});

		it('normalizes leading ./', () => {
			const config = loadConfig({
				type: 'integration',
				tool: 'Default Tool',
				overrides: [{
					pattern: './test/**/*.test.js',
					type: 'UI',
					tool: 'Special Tool'
				}]
			});

			expect(config.getTaxonomy('test/special.test.js')).to.deep.equal({
				type: 'ui',
				tool: 'Special Tool'
			});
		});

		it('omits experience', () => {
			const config = loadConfig({
				type: 'integration',
				tool: 'Test Reporting',
				experience: 'Test Framework'
			});

			expect(config.getTaxonomy('test/example.test.js')).to.not.have.property('experience');
		});

		describe('completeness', () => {
			it('true when type and tool resolve', () => {
				const config = loadConfig({ type: 'integration', tool: 'Test Reporting' });

				expect(config.hasTaxonomy('test/example.test.js')).to.be.true;
			});

			it('false when tool missing', () => {
				const config = loadConfig({
					type: 'integration',
					overrides: [{
						pattern: '**/special.test.js',
						tool: 'Special Tool'
					}]
				});

				expect(config.hasTaxonomy('test/example.test.js')).to.be.false;
			});
		});
	});

	describe('ignore', () => {
		it('true when matching', () => {
			const config = loadConfig({
				type: 'integration',
				tool: 'Test Reporting',
				ignorePatterns: ['**/ignored/**']
			});

			expect(config.ignoreFilePath('test/ignored/example.test.js')).to.be.true;
		});

		it('false when not matching', () => {
			const config = loadConfig({
				type: 'integration',
				tool: 'Test Reporting',
				ignorePatterns: ['**/ignored/**']
			});

			expect(config.ignoreFilePath('test/example.test.js')).to.be.false;
		});

		it('normalizes leading ./', () => {
			const config = loadConfig({
				type: 'integration',
				tool: 'Test Reporting',
				ignorePatterns: ['./test/ignored/**']
			});

			expect(config.ignoreFilePath('test/ignored/example.test.js')).to.be.true;
		});
	});
});
