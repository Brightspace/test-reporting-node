import { addExtensions, nodeConfig, setDirectoryConfigs, testingConfig } from 'eslint-config-brightspace';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import importPlugin from 'eslint-plugin-import';
import { includeIgnoreFile } from '@eslint/compat';
import jsonPlugin from 'eslint-plugin-json';
import mochaPlugin from 'eslint-plugin-mocha';
import playwrightPlugin from 'eslint-plugin-playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gitignorePath = resolve(__dirname, '.gitignore');
const importConfigs = [
	importPlugin.flatConfigs.recommended,
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module'
		},
		settings: {
			'import/resolver': {
				node: true
			}
		},
		rules: {
			'import/extensions': ['error', 'ignorePackages']
		}
	}
];
const commandDangleConfig = {
	rules: {
		'comma-dangle': 'error'
	}
};
const globalConfigs = [
	...addExtensions(nodeConfig, ['.js', '.cjs']),
	...importConfigs,
	commandDangleConfig
];
const playwrightConfigs = [
	...globalConfigs,
	playwrightPlugin.configs['flat/recommended'],
	{
		rules: {
			'playwright/expect-expect': 'off',
			'playwright/no-skipped-test': 'off',
			'playwright/no-conditional-in-test': 'off'
		}
	}
];
const mochaConfigs = [
	...globalConfigs,
	mochaPlugin.configs.flat.recommended,
	{
		rules: {
			'mocha/no-exclusive-tests': 'error',
			'mocha/no-mocha-arrows': 'off'
		}
	}
];
const webTestRunnerConfigs = [
	...testingConfig,
	commandDangleConfig
];

const jsonConfig = jsonPlugin.configs['recommended'];

export default [
	includeIgnoreFile(gitignorePath),
	...setDirectoryConfigs(
		globalConfigs,
		{
			'test/unit/': mochaConfigs,
			'test/integration/': mochaConfigs,
			'test/integration/data/': globalConfigs,
			'test/integration/data/tests/mocha/': [
				...mochaConfigs,
				{
					rules: {
						'mocha/no-mocha-arrows': 'off',
						'mocha/no-skipped-tests': 'off'
					}
				}
			],
			'test/integration/data/tests/playwright/': playwrightConfigs,
			'test/integration/data/tests/web-test-runner/': webTestRunnerConfigs

		}
	),
	jsonConfig
];
