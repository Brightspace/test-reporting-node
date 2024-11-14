# d2l-test-reporting

[![License][License Badge]][License File]
[![Version][Version Badge]][Version Package]
[![Release][Release Badge]][Release Workflow]
[![Node Version][Node Version Badge]][Node Version Rules]

Helper package for generating reports for use with the **D2L test reporting
framework**. This package is meant to be used in conjunction with this [GitHub
Action].

> [!NOTE]
> If you have any questions, concerns or just want to chat feel free to reach
> out in [#test-reporting] (D2L employee accessible only).

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
this package. It assumes you are using the default `.mocharc.js` file for
configuration.

```js
module.exports = {
  spec: 'test/*.test.js',
  reporter: 'd2l-test-reporting/reporters/mocha.js',
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
this package. It assumes you are using the default `playwright.config.js`
file for configuration.

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
this package. It assumes you are using the default `web-test-runner.config.js`
file for configuration.

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

Please see [Automated Testing Definitions] on confluence for the list of
test types that should be used when creating the D2L test reporting
configuration file.

```json
{
  "type": "UI Visual Diff",
  "experience": "Experience",
  "tool": "Tool",
}
```

```json
{
  "type": "UI E2E",
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

## Report Format

For details on what the schema that the various custom reporters output looks
like see [Report Format](./docs/report-format.md).

> [!NOTE]
  The report format is required in order to upload items to the back-end using
  the corresponding [GitHub Action].

## Developing

After cloning the repository make sure to install dependencies.

```console
npm ci
```

### Linting

```console
# eslint and editorconfig-checker
npm run lint

# eslint only
npm run lint:eslint

# editorconfig-checker only
npm run lint:editorconfig
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

### Versioning and Releasing

This repo is configured to use `semantic-release`. Commits prefixed with `fix:`
and `feat:` will trigger patch and minor releases when merged to `main`.

To learn how to create major releases and release from maintenance branches,
refer to the [semantic-release GitHub Action] documentation.

<!-- links -->
[License Badge]: https://img.shields.io/github/license/Brightspace/test-reporting-node?label=License
[License File]: ./LICENSE
[Version Badge]: https://img.shields.io/npm/v/d2l-test-reporting?label=Version
[Version Package]: https://www.npmjs.com/d2l-test-reporting
[Node Version Badge]: https://img.shields.io/node/v/d2l-test-reporting
[Node Version Rules]: ./package.json#L38
[Release Badge]: https://github.com/Brightspace/test-reporting-node/actions/workflows/release.yml/badge.svg
[Release Workflow]: https://github.com/Brightspace/test-reporting-node/actions/workflows/release.yml
[file an issue]: https://github.com/Brightspace/test-reporting-node/issues/new
[official documentation for Mocha]: https://mochajs.org/api/mocha#reporter
[official documentation for Playwright]: https://playwright.dev/docs/test-reporters
[official documentation for `@web/test-runner`]: https://modern-web.dev/docs/test-runner/reporters/overview
[Mocha]: https://mochajs.org
[Playwright]: https://playwright.dev
[`@web/test-runner`]: https://modern-web.dev/docs/test-runner/overview
[`merge-reports`]: https://playwright.dev/docs/test-sharding#merge-reports-cli
[GitHub Action]: https://github.com/Brightspace/test-reporting-action
[Automated Testing Definitions]: https://desire2learn.atlassian.net/wiki/spaces/QE/pages/4354408450/Automated+Testing+Definitions
[#test-reporting]: https://d2l.slack.com/archives/C05MMC7H7EK
[semantic-release GitHub Action]: https://github.com/BrightspaceUI/actions/tree/main/semantic-release
