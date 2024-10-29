import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { includeIgnoreFile } from '@eslint/compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default [
	includeIgnoreFile(gitignorePath),
	...compat.extends('brightspace/node-config').map((config) => ({
		...config,
		files: ['**/*.js', '**/*.cjs'],
		rules: {
			...config.rules,
			'comma-dangle': 'error'
		}
	})),
	...compat.extends(
		'brightspace/testing-config',
		'plugin:mocha/recommended'
	).map((config) => ({
		...config,
		files: ['test/**/*.test.js'],
		rules: {
			...config.rules,
			'mocha/no-exclusive-tests': 'error',
			'mocha/no-mocha-arrows': 'off'
		}
	})),
	...compat.extends(
		'brightspace/testing-config',
		'plugin:mocha/recommended'
	).map((config) => ({
		...config,
		files: ['test/integration/data/tests/**/*.test.js'],
		rules: {
			...config.rules,
			'mocha/no-mocha-arrows': 'off',
			'mocha/no-skipped-tests': 'off',
			'no-console': 'off'
		}
	})),
	...compat.extends('plugin:playwright/recommended').map((config) => ({
		...config,
		files: ['test/integration/data/tests/playwright/*.js'],
		rules: {
			...config.rules,
			'playwright/expect-expect': 'off',
			'playwright/no-conditional-in-test': 'off',
			'playwright/no-skipped-test': 'off'
		}
	}))
];
