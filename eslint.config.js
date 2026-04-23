import { addExtensions, nodeConfig, setDirectoryConfigs, testingConfig } from 'eslint-config-brightspace';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import checkFilePlugin from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import';
import { includeIgnoreFile } from '@eslint/compat';
import jsonPlugin from 'eslint-plugin-json';
import mochaPlugin from 'eslint-plugin-mocha';
import playwrightPlugin from 'eslint-plugin-playwright';
import promisePlugin from 'eslint-plugin-promise';

const rootPath = fileURLToPath(new URL('./', import.meta.url));
const gitignorePath = join(rootPath, '.gitignore');
const fileExtensions = ['.js', '.cjs'];
const promiseConfig = promisePlugin.configs['flat/recommended'];
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
		},
		plugins: {
			'check-file': checkFilePlugin
		},
		rules: {
			'require-await': 'error',
			'key-spacing': ['error', { beforeColon: false, afterColon: true }],
			'object-shorthand': ['error', 'always'],
			'prefer-template': 'error',
			'@stylistic/comma-dangle': 'error',
			'@stylistic/linebreak-style': ['error', 'unix'],
			'@stylistic/operator-linebreak': ['error', 'after'],
			'@stylistic/padded-blocks': ['error', 'never'],
			'@stylistic/template-curly-spacing': ['error', 'never'],
			'check-file/filename-naming-convention': [
				'error',
				{ '**/*': 'KEBAB_CASE' },
				{ ignoreMiddleExtensions: true }
			],
			'check-file/folder-naming-convention': [
				'error',
				{ '**/': 'KEBAB_CASE' }
			]
		}
	},
	{
		...promiseConfig,
		rules: {
			...promiseConfig.rules,
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
const testConfigs = addExtensions(
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
const mochaConfigs = addExtensions(
	[
		...testConfigs,
		{
			rules: {
				'mocha/no-pending-tests': 'off'
			}
		}
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
				'playwright/valid-title': 'off',
				'playwright/no-useless-await': 'error',
				'playwright/prefer-hooks-on-top': 'error',
				'playwright/no-useless-not': 'error',
				'playwright/consistent-spacing-between-blocks': 'error',
				'playwright/prefer-native-locators': 'error'
			}
		}
	],
	fileExtensions
);
const webTestRunnerConfigs = addExtensions(
	[
		...testingConfig,
		...commonConfigs,
		{
			rules: {
				'mocha/no-pending-tests': 'off'
			}
		}
	],
	fileExtensions
);
export default [
	includeIgnoreFile(gitignorePath),
	...setDirectoryConfigs(
		globalConfigs,
		{
			'test/unit': testConfigs,
			'test/integration': testConfigs,
			'test/integration/data': globalConfigs,
			'test/integration/data/tests/mocha': mochaConfigs,
			'test/integration/data/tests/playwright': playwrightConfigs,
			'test/integration/data/tests/web-test-runner': webTestRunnerConfigs,
			'test/integration/data/tests/webdriverio': mochaConfigs
		}
	),
	jsonPlugin.configs['recommended']
];
