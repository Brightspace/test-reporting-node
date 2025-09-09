import { addExtensions, nodeConfig, setDirectoryConfigs, testingConfig } from 'eslint-config-brightspace';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import importPlugin from 'eslint-plugin-import';
import { includeIgnoreFile } from '@eslint/compat';
import jsonPlugin from 'eslint-plugin-json';
import mochaPlugin from 'eslint-plugin-mocha';
import playwrightPlugin from 'eslint-plugin-playwright';
import promisePlugin from 'eslint-plugin-promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gitignorePath = resolve(__dirname, '.gitignore');
const fileExtensions = ['.js', '.cjs'];
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
const commonConfigs = [
	{
		linterOptions: {
			reportUnusedInlineConfigs: 'error',
			reportUnusedDisableDirectives: 'error'
		}
	},
	{
		rules: {
			'require-await': 'error',
			'key-spacing': ['error', { beforeColon: false, afterColon: true }],
			'object-shorthand': ['error', 'always'],
			'prefer-template': 'error',
			'@stylistic/comma-dangle': 'error',
			'@stylistic/template-curly-spacing': ['error', 'never']
		}
	},
	promisePlugin.configs['flat/recommended'],
	{
		rules: {
			'promise/prefer-await-to-then': ['error', { strict: true }]
		}
	}
];
const globalConfigs = addExtensions(
	[
		...nodeConfig,
		...importConfigs,
		...commonConfigs
	],
	fileExtensions
);
const playwrightConfigs = addExtensions(
	[
		...globalConfigs,
		playwrightPlugin.configs['flat/recommended'],
		{
			rules: {
				'playwright/expect-expect': 'off',
				'playwright/no-skipped-test': 'off',
				'playwright/no-conditional-in-test': 'off',
				'playwright/valid-title': 'off'
			}
		}
	],
	fileExtensions
);
const mochaConfigs = addExtensions(
	[
		...globalConfigs,
		mochaPlugin.configs.recommended,
		{
			rules: {
				'mocha/no-exclusive-tests': 'error',
				'mocha/no-mocha-arrows': 'off'
			}
		}
	],
	fileExtensions
);
const webTestRunnerConfigs = addExtensions(
	[
		...testingConfig,
		...commonConfigs
	],
	fileExtensions
);
const jsonConfig = jsonPlugin.configs['recommended'];

export default [
	includeIgnoreFile(gitignorePath),
	...setDirectoryConfigs(
		globalConfigs,
		{
			'test/unit': mochaConfigs,
			'test/integration': mochaConfigs,
			'test/integration/data': globalConfigs,
			'test/integration/data/tests/mocha': [
				...mochaConfigs,
				{
					rules: {
						'mocha/no-mocha-arrows': 'off',
						'mocha/no-pending-tests': 'off'
					}
				}
			],
			'test/integration/data/tests/playwright': playwrightConfigs,
			'test/integration/data/tests/web-test-runner': webTestRunnerConfigs

		}
	),
	jsonConfig
];
