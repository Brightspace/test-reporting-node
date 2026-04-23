import chaiUuid from 'chai-uuid';
import { createSandbox } from 'sinon';
import { expect, use } from 'chai';
import fs from 'node:fs';
import { latestReportVersion } from '../../src/helpers/schema.cjs';
import { ReportBuilder } from '../../src/helpers/report-builder.cjs';
import { Report } from '../../src/helpers/report.cjs';
const noopLogger = {
	info() { },
	warning() { },
	error() { },
	location() { }
};
const testContext = {
	github: {
		organization: 'TestOrganization',
		repository: 'test-repository',
		workflow: 'test-workflow.yml',
		runId: 12345,
		runAttempt: 1
	},
	git: {
		branch: 'test/branch',
		sha: '0000000000000000000000000000000000000000'
	}
};
use(chaiUuid);

const buildValidReport = (options = {}) => {
	const builderOptions = {
		reportWriter: () => { },
		...options
	};
	const builder = new ReportBuilder('mocha', noopLogger, builderOptions);

	builder.getSummary()
		.addContext()
		.setStarted(new Date().toISOString())
		.setDurationTotal(1000)
		.setStatus('passed');

	const detail = builder.getDetail('test-1');

	detail
		.setName('test suite > passing test')
		.setStatus('passed')
		.setStarted(new Date().toISOString())
		.setLocationFile('test/example.test.js')
		.addDuration(100)
		.setTimeout(5000);

	builder.finalize();

	return builder;
};

describe('report builder', () => {
	let sandbox;

	before(() => {
		sandbox = createSandbox();
	});

	afterEach(() => sandbox.restore());

	describe('constructor', () => {
		it('throws with both output options', () => {
			expect(() => new ReportBuilder('mocha', noopLogger, {
				reportPath: './report.json',
				reportWriter: () => { }
			})).to.throw('must supply only one of \'reportPath\' or \'reportWriter\'');
		});

		it('sets framework', () => {
			const builder = new ReportBuilder('playwright', noopLogger, { reportWriter: () => { } });

			expect(builder.getSummary().data.framework).to.eq('playwright');
		});

		it('sets operatingSystem', () => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });

			expect(builder.getSummary().data.operatingSystem).to.be.a('string');
			expect(builder.getSummary().data.operatingSystem).to.not.be.empty;
		});

		it('sets id', () => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });

			expect(builder.data.id).to.be.a.uuid('v4');
		});

		describe('v2', () => {
			it('sets version to 2', () => {
				const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });

				expect(builder.data.version).to.eq(2);
			});

			it('produces loadable report', () => {
				const builder = buildValidReport();

				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(builder));

				const report = new Report('./test-report.json', { context: testContext });

				expect(report.getVersion()).to.eq(2);
			});

			it('does not set codeowners on details', () => {
				const builder = buildValidReport();
				const json = builder.toJSON();

				expect(json.details[0]).to.not.have.nested.property('github.codeowners');
			});
		});

		describe('v3', () => {
			it('sets version to latest', () => {
				const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { }, reportVersionLatest: true });

				expect(builder.data.version).to.eq(latestReportVersion);
			});

			it('produces loadable report', () => {
				const builder = buildValidReport({ reportVersionLatest: true });

				sandbox.stub(fs, 'readFileSync').returns(JSON.stringify(builder));

				const report = new Report('./test-report.json', { context: testContext });

				expect(report.getVersion()).to.eq(latestReportVersion);
			});

			it('sets codeowners on details', () => {
				const builder = buildValidReport({ reportVersionLatest: true });
				const json = builder.toJSON();

				expect(json.details[0]).to.have.nested.property('github.codeowners');
				expect(json.details[0].github.codeowners).to.be.an('array').that.is.not.empty;
			});
		});
	});

	describe('summary', () => {
		it('returns builder', () => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });
			const summary = builder.getSummary();

			expect(summary).to.be.an('object');
			expect(summary.data).to.have.property('framework', 'mocha');
		});

		it('same instance', () => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });

			expect(builder.getSummary()).to.equal(builder.getSummary());
		});

		let summary;

		beforeEach(() => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });

			summary = builder.getSummary();
		});

		it('sets started', () => {
			const started = new Date().toISOString();

			summary.setStarted(started);

			expect(summary.data.started).to.eq(started);
		});

		it('sets duration total', () => {
			summary.setDurationTotal(5000);

			expect(summary.data.duration.total).to.eq(5000);
		});

		it('sets status', () => {
			summary.setStatus('failed');

			expect(summary.data.status).to.eq('failed');
		});

		it('sets passed', () => {
			summary.setPassed();

			expect(summary.data.status).to.eq('passed');
		});

		it('sets failed', () => {
			summary.setFailed();

			expect(summary.data.status).to.eq('failed');
		});

		it('sets count passed', () => {
			summary.setCountPassed(5);

			expect(summary.data.count.passed).to.eq(5);
		});

		it('sets count failed', () => {
			summary.setCountFailed(2);

			expect(summary.data.count.failed).to.eq(2);
		});

		it('sets count skipped', () => {
			summary.setCountSkipped(3);

			expect(summary.data.count.skipped).to.eq(3);
		});

		it('sets count flaky', () => {
			summary.setCountFlaky(1);

			expect(summary.data.count.flaky).to.eq(1);
		});

		it('chainable', () => {
			const result = summary
				.setStarted(new Date().toISOString())
				.setDurationTotal(1000)
				.setStatus('passed');

			expect(result).to.equal(summary);
		});

		it('don\'t override by default', () => {
			summary.setStatus('passed');
			summary.setStatus('failed');

			expect(summary.data.status).to.eq('passed');
		});

		it('override with option', () => {
			summary.setStatus('passed');
			summary.setStatus('failed', { override: true });

			expect(summary.data.status).to.eq('failed');
		});
	});

	describe('detail', () => {
		it('same instance per id', () => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });

			const detail1 = builder.getDetail('test-1');
			const detail2 = builder.getDetail('test-1');

			expect(detail1).to.equal(detail2);
		});

		it('different instance per id', () => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });

			const detail1 = builder.getDetail('test-1');
			const detail2 = builder.getDetail('test-2');

			expect(detail1).to.not.equal(detail2);
		});

		it('initializes retries', () => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });
			const detail = builder.getDetail('test-1');

			expect(detail.data.retries).to.eq(0);
		});

		let detail;

		beforeEach(() => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });

			detail = builder.getDetail('test-1');
		});

		it('sets name', () => {
			detail.setName('my test');

			expect(detail.data.name).to.eq('my test');
		});

		it('sets started', () => {
			const started = new Date().toISOString();

			detail.setStarted(started);

			expect(detail.data.started).to.eq(started);
		});

		it('sets status', () => {
			detail.setStatus('failed');

			expect(detail.data.status).to.eq('failed');
		});

		it('sets passed', () => {
			detail.setPassed();

			expect(detail.data.status).to.eq('passed');
		});

		it('sets skipped', () => {
			detail.setSkipped();

			expect(detail.data.status).to.eq('skipped');
		});

		it('sets failed', () => {
			detail.setFailed();

			expect(detail.data.status).to.eq('failed');
		});

		it('sets location file', () => {
			detail.setLocationFile('test/example.test.js');

			expect(detail.data.location.file).to.be.a('string');
			expect(detail.data.location.file).to.include('example.test.js');
		});

		it('sets location line', () => {
			detail.setLocationFile('test/example.test.js');
			detail.setLocationLine(42);

			expect(detail.data.location.line).to.eq(42);
		});

		it('sets location column', () => {
			detail.setLocationFile('test/example.test.js');
			detail.setLocationColumn(10);

			expect(detail.data.location.column).to.eq(10);
		});

		it('sets browser', () => {
			detail.setBrowser('chromium');

			expect(detail.data.browser).to.eq('chromium');
		});

		it('sets timeout', () => {
			detail.setTimeout(10000);

			expect(detail.data.timeout).to.eq(10000);
		});

		it('accumulates duration total', () => {
			detail.addDuration(100);
			detail.addDuration(200);

			expect(detail.data.duration.total).to.eq(300);
		});

		it('final is last added', () => {
			detail.addDuration(100);
			detail.addDuration(200);

			expect(detail.data.duration.final).to.eq(200);
		});

		it('sets duration total', () => {
			detail.setDurationTotal(500);

			expect(detail.data.duration.total).to.eq(500);
		});

		it('sets duration final', () => {
			detail.setDurationFinal(250);

			expect(detail.data.duration.final).to.eq(250);
		});

		it('increments retries', () => {
			detail.incrementRetries();
			detail.incrementRetries();

			expect(detail.data.retries).to.eq(2);
		});

		it('accumulates retries', () => {
			detail.addRetries(3);
			detail.addRetries(2);

			expect(detail.data.retries).to.eq(5);
		});

		it('chainable', () => {
			const result = detail
				.setName('test')
				.setStatus('passed')
				.setStarted(new Date().toISOString())
				.setLocationFile('test/example.test.js')
				.addDuration(100)
				.setTimeout(5000);

			expect(result).to.equal(detail);
		});

		it('don\'t override by default', () => {
			detail.setName('original');
			detail.setName('updated');

			expect(detail.data.name).to.eq('original');
		});

		it('override with option', () => {
			detail.setName('original');
			detail.setName('updated', { override: true });

			expect(detail.data.name).to.eq('updated');
		});
	});

	describe('finalize', () => {
		it('counts passed', () => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });

			builder.getSummary().setStarted(new Date().toISOString()).setDurationTotal(0).setStatus('passed');
			builder.getDetail('t1').setName('test').setStatus('passed').setStarted(new Date().toISOString()).setLocationFile('t.js').addDuration(0).setTimeout(0);
			builder.finalize();

			expect(builder.getSummary().data.count.passed).to.eq(1);
			expect(builder.getSummary().data.count.flaky).to.eq(0);
		});

		it('counts flaky', () => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });

			builder.getSummary().setStarted(new Date().toISOString()).setDurationTotal(0).setStatus('passed');
			const detail = builder.getDetail('t1');

			detail.setName('test').setStatus('passed').setStarted(new Date().toISOString()).setLocationFile('t.js').addDuration(0).setTimeout(0);
			detail.incrementRetries();
			builder.finalize();

			expect(builder.getSummary().data.count.flaky).to.eq(1);
			expect(builder.getSummary().data.count.passed).to.eq(0);
		});

		it('counts skipped', () => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });

			builder.getSummary().setStarted(new Date().toISOString()).setDurationTotal(0).setStatus('passed');
			builder.getDetail('t1').setName('test').setStatus('skipped').setStarted(new Date().toISOString()).setLocationFile('t.js').addDuration(0).setTimeout(0);
			builder.finalize();

			expect(builder.getSummary().data.count.skipped).to.eq(1);
		});

		it('counts failed', () => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });

			builder.getSummary().setStarted(new Date().toISOString()).setDurationTotal(0).setStatus('failed');
			builder.getDetail('t1').setName('test').setStatus('failed').setStarted(new Date().toISOString()).setLocationFile('t.js').addDuration(0).setTimeout(0);
			builder.finalize();

			expect(builder.getSummary().data.count.failed).to.eq(1);
		});

		it('zero without details', () => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });

			builder.getSummary().setStarted(new Date().toISOString()).setDurationTotal(0).setStatus('passed');
			builder.finalize();

			expect(builder.getSummary().data.count.passed).to.eq(0);
			expect(builder.getSummary().data.count.failed).to.eq(0);
			expect(builder.getSummary().data.count.skipped).to.eq(0);
			expect(builder.getSummary().data.count.flaky).to.eq(0);
		});

		it('counts mixed', () => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });
			const started = new Date().toISOString();

			builder.getSummary().setStarted(started).setDurationTotal(0).setStatus('failed');

			builder.getDetail('t1').setName('pass').setStatus('passed').setStarted(started).setLocationFile('t.js').addDuration(0).setTimeout(0);
			builder.getDetail('t2').setName('fail').setStatus('failed').setStarted(started).setLocationFile('t.js').addDuration(0).setTimeout(0);
			builder.getDetail('t3').setName('skip').setStatus('skipped').setStarted(started).setLocationFile('t.js').addDuration(0).setTimeout(0);

			const flaky = builder.getDetail('t4');

			flaky.setName('flaky').setStatus('passed').setStarted(started).setLocationFile('t.js').addDuration(0).setTimeout(0);
			flaky.addRetries(2);

			builder.finalize();

			expect(builder.getSummary().data.count.passed).to.eq(1);
			expect(builder.getSummary().data.count.failed).to.eq(1);
			expect(builder.getSummary().data.count.skipped).to.eq(1);
			expect(builder.getSummary().data.count.flaky).to.eq(1);
		});
	});

	describe('output', () => {
		describe('toJSON', () => {
			let json;

			beforeEach(() => {
				json = buildValidReport().toJSON();
			});

			it('plain objects', () => {
				expect(json).to.have.property('id').that.is.a('string');
				expect(json).to.have.property('version').that.is.a('number');
				expect(json).to.have.property('summary').that.is.an('object');
				expect(json).to.have.property('details').that.is.an('array');
				expect(json.details).to.have.lengthOf(1);
			});

			it('no summary internals', () => {
				expect(json.summary).to.have.property('framework');
				expect(json.summary).to.have.property('status');
				expect(json.summary).to.not.have.property('_data');
				expect(json.summary).to.not.have.property('_logger');
			});

			it('no detail internals', () => {
				expect(json.details[0]).to.have.property('name');
				expect(json.details[0]).to.have.property('status');
				expect(json.details[0]).to.not.have.property('_data');
				expect(json.details[0]).to.not.have.property('_reportConfiguration');
			});
		});

		describe('save', () => {
			it('writes valid JSON', () => {
				const spy = sandbox.spy();
				const builder = buildValidReport({ reportWriter: spy });

				builder.save();

				expect(spy.calledOnce).to.be.true;

				const reportData = spy.firstCall.args[0];

				expect(() => JSON.parse(reportData)).to.not.throw();
			});

			it('logs error on failure', () => {
				const errorSpy = sandbox.spy();
				const logger = { ...noopLogger, error: errorSpy };
				const builder = new ReportBuilder('mocha', logger, {
					reportWriter: () => { throw new Error('write failed'); }
				});

				builder.getSummary().setStarted(new Date().toISOString()).setDurationTotal(0).setStatus('passed');
				builder.finalize();
				builder.save();

				expect(errorSpy.calledOnce).to.be.true;
				expect(errorSpy.firstCall.args[0]).to.include('Failed to generate');
			});
		});
	});

	describe('ignore', () => {
		it('false without config', () => {
			const builder = new ReportBuilder('mocha', noopLogger, { reportWriter: () => { } });

			expect(builder.ignoreFilePath('test/example.test.js')).to.be.false;
		});

		it('true when matching', () => {
			const config = JSON.stringify({
				type: 'integration',
				tool: 'test',
				experience: 'test',
				ignorePatterns: ['**/ignored/**']
			});

			sandbox.stub(fs, 'readFileSync').returns(config);

			const builder = new ReportBuilder('mocha', noopLogger, {
				reportWriter: () => { },
				reportConfigurationPath: './d2l-test-reporting.config.json'
			});

			expect(builder.ignoreFilePath('test/ignored/example.test.js')).to.be.true;
		});

		it('false when not matching', () => {
			const config = JSON.stringify({
				type: 'integration',
				tool: 'test',
				experience: 'test',
				ignorePatterns: ['**/ignored/**']
			});

			sandbox.stub(fs, 'readFileSync').returns(config);

			const builder = new ReportBuilder('mocha', noopLogger, {
				reportWriter: () => { },
				reportConfigurationPath: './d2l-test-reporting.config.json'
			});

			expect(builder.ignoreFilePath('test/example.test.js')).to.be.false;
		});
	});
});
