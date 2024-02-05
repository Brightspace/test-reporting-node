# d2l-test-reporting

> [!WARNING]
> This is still a work in progress. Any usage of this package is subject to
> change without notice.

Helper package for generating reports for use with the **D2L test reporting
framework**.

## Installation

```console
npm install d2l-test-reporting
```

## Usage

This library provides a reporters for many of the test execution frameworks we
use, if one for your test runner framework isn't provided please [file an issue]
so we can look into adding it to our set of reporters.

### Reporters

#### [Mocha]

Please consult the [official documentation for Mocha] to see how
to use reporters. Below is an example of how to add the reporter provided by
this package.

```js
module.exports = {
  spec: 'test/*.test.js',
  reporter: 'd2l-test-reporting/reporters/mocha.cjs',
  reporterOptions: [
    'reportPath=./d2l-test-report.json', // optional
    'reportConfigurationPath=./d2l-test-reporting.config.json' // optional
  ]
};
```

##### Inputs

* `reportPath`: path to output the reporter to, relative to current working
  directory. Not required. Defaults to `./d2l-test-report.json`.
* `reportConfigurationPath`: path to the D2L test reporting configuration file
  for mapping test type, experience and tool to test code. Not required.
  Defaults to `./d2l-test-reporting.config.json`.

#### [Playwright]

Please consult the [official documentation for Playwright] to see how
to use reporters. Below is an example of how to add the reporter provided by
this package.

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  reporter: [
    [
      'd2l-test-reporting/reporters/playwright.js',
      {
        reportPath: './d2l-test-report.json', // optional
        reportConfigurationPath: './d2l-test-reporting.config.json' // optional
      }
    ],
    ['list']
  ],
  testDir: '../',
  testMatch: '*.test.js',
  projects: [{
    name: 'firefox',
    use: devices['Desktop Firefox'],
    testMatch: 'firefox/*.test.js'
  }]
});
```

> [!WARNING]
> Currently the [`merge-reports`] command is not fully supported due to a lack
> of browser/launcher information preservation with the `blob` reporter. If you
> are using a GitHub matrix run this may result in partial data showing in the
> reporting dashboard as it becomes available.

##### Inputs

* `reportPath`: path to output the reporter to, relative to current working
  directory. Not required. Defaults to `./d2l-test-report.json`.
* `reportConfigurationPath`: path to the D2L test reporting configuration file
  for mapping test type, experience and tool to test code. Not required.
  Defaults to `./d2l-test-reporting.config.json`.

#### [`@web/test-runner`]

Please consult the [official documentation for `@web/test-runner`] to see how
to use reporters. Below is an example of how to add the reporter provided by
this package.

```js
import { defaultReporter } from '@web/test-runner';
import { reporter } from 'd2l-test-reporting/reporters/web-test-runner.js';

export default {
  reporters: [
    defaultReporter(),
    reporter({
      reportPath: './d2l-test-report.json', // optional
      reportConfigurationPath: './d2l-test-reporting.config.json' // optional
    })
  ],
  files: 'test/component-*.test.js',
  groups: [{
    name: 'group',
    files: 'test/group/component-*.test.js'
  }]
};
```

##### Inputs

* `reportPath`: path to output the reporter to, relative to current working
  directory. Not required. Defaults to `./d2l-test-report.json`.
* `reportConfigurationPath`: path to the D2L test reporting configuration file
  for mapping test type, experience and tool to test code. Not required.
  Defaults to `./d2l-test-reporting.config.json`.

### Configuration

To have the test type, experience and tool mapped to test code, a D2L test
reporting configuration file is required when using one of the reporters
provided in this package.

Below are examples of how to create the config file. Note that the `type` field
will end up lowercase in the report.

```json
{
  "type": "Visual Diff",
  "experience": "Experience",
  "tool": "Tool",
}
```

```json
{
  "type": "UI",
  "overrides": [
    {
      "pattern": "tests/account-settings/**/*",
      "experience": "Administration",
      "tool": "Account Settings"
    },
    {
      "pattern": "tests/announcements/**/*",
      "experience": "Teaching & Learning",
      "tool": "Announcements"
    },
    {
      "pattern": "tests/rubrics.test.js",
      "experience": "Assessment",
      "tool": "Rubrics"
    }
  ]
}
```

## Developing

After cloning the repository make sure to install dependencies.

```console
npm ci
```

### Linting

```console
# currently only eslint
npm run lint

# eslint only
npm run lint:eslint
```

### Fixing

```console
# currently only eslint
npm run fix

# eslint only
npm run fix:eslint
```

### Testing

```console
# lint, unit tests and integration tests
npm test

# unit tests and integration tests only
npm run test:all

# unit tests only
npm run test:unit

# integration tests only
npm run test:integration
```

<!-- links -->
[file an issue]: https://github.com/Brightspace/test-reporting-node/issues/new
[official documentation for Mocha]: https://mochajs.org/api/mocha#reporter
[official documentation for Playwright]: https://playwright.dev/docs/test-reporters
[official documentation for `@web/test-runner`]: https://modern-web.dev/docs/test-runner/reporters/overview
[Mocha]: https://mochajs.org
[Playwright]: https://playwright.dev
[`@web/test-runner`]: https://modern-web.dev/docs/test-runner/overview
[`merge-reports`]: https://playwright.dev/docs/test-sharding#merge-reports-cli
