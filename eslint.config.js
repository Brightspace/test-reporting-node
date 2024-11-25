import { addExtensions, nodeConfig, setDirectoryConfigs, testingConfig } from 'eslint-config-brightspace';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import jsonPlugin from 'eslint-plugin-json';
import mochaPlugin from 'eslint-plugin-mocha';
import playwrightPlugin from 'eslint-plugin-playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gitignorePath = resolve(__dirname, '.gitignore');
const nodeConfigExtended = addExtensions(nodeConfig, ['.js', '.cjs']);

export default [
	includeIgnoreFile(gitignorePath),
	...setDirectoryConfigs(
		nodeConfigExtended,
		{
			'test/': testingConfig,
			'test/integration/data/': nodeConfigExtended,
			'test/integration/data/tests/mocha/': testingConfig,
			'test/integration/data/tests/web-test-runner/': testingConfig
		}
	),
	{
		...mochaPlugin.configs.flat.recommended,
		files: ['test/unit/**/*.test.js'],
		rules: {
			...mochaPlugin.configs.flat.recommended.rules,
			'mocha/no-exclusive-tests': 'error',
			'mocha/no-mocha-arrows': 'off'
		}
	},
	{
		...mochaPlugin.configs.flat.recommended,
		files: ['test/integration/data/tests/{mocha,web-test-runner}/*.test.js'],
		rules: {
			...mochaPlugin.configs.flat.recommended.rules,
			'mocha/no-mocha-arrows': 'off',
			'mocha/no-skipped-tests': 'off'
		}
	},
	{
		...playwrightPlugin.configs['flat/recommended'],
		files: ['test/integration/data/tests/playwright/*.js'],
		rules: {
			...playwrightPlugin.configs['flat/recommended'].rules,
			'playwright/expect-expect': 'off',
			'playwright/no-skipped-test': 'off',
			'playwright/no-conditional-in-test': 'off'
		}
	},
	jsonPlugin.configs['recommended'],
	{
		rules: {
			'comma-dangle': 'error'
		}
	}
];
