import { addExtensions, nodeConfig, setDirectoryConfigs, testingConfig } from 'eslint-config-brightspace';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import globals from 'globals';
import { includeIgnoreFile } from '@eslint/compat';
import jsonPlugin from 'eslint-plugin-json';
import mochaPlugin from 'eslint-plugin-mocha';
import playwrightPlugin from 'eslint-plugin-playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const nodeConfigs = addExtensions(nodeConfig, ['.js', '.cjs']);
const playwrightConfig = playwrightPlugin.configs['flat/recommended'];
const mochaConfig = mochaPlugin.configs.flat.recommended;
const jsonConfig = jsonPlugin.configs['recommended'];
const gitignorePath = resolve(__dirname, '.gitignore');

export default [
	includeIgnoreFile(gitignorePath),
	...setDirectoryConfigs(
		nodeConfigs,
		{
			'test/': testingConfig,
			'test/integration/data/': nodeConfigs,
			'test/integration/data/tests/mocha/': testingConfig,
			'test/integration/data/tests/web-test-runner/': testingConfig
		}
	),
	{
		...mochaConfig,
		files: ['test/unit/**/*.test.js'],
		rules: {
			...mochaConfig.rules,
			'mocha/no-exclusive-tests': 'error',
			'mocha/no-mocha-arrows': 'off'
		}
	},
	{
		...mochaConfig,
		files: ['test/integration/data/tests/{mocha,web-test-runner}/*.test.js'],
		rules: {
			...mochaConfig.rules,
			'mocha/no-mocha-arrows': 'off',
			'mocha/no-skipped-tests': 'off'
		}
	},
	{
		...playwrightConfig,
		files: ['test/integration/data/tests/playwright/*.js'],
		rules: {
			...playwrightConfig.rules,
			'playwright/expect-expect': 'off',
			'playwright/no-skipped-test': 'off',
			'playwright/no-conditional-in-test': 'off'
		}
	},
	{
		files: ['test/unit/**/*.js'],
		languageOptions: {
			globals: {
				...globals.node
			}
		}
	},
	jsonConfig,
	{
		rules: {
			'comma-dangle': 'error'
		}
	}
];
