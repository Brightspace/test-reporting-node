# d2l-test-reporting

[![License][License Badge]][License File]
[![Version][Version Badge]][Version Package]
[![Release][Release Badge]][Release Workflow]
[![Node Version][Node Version Badge]][Node Version Rules]

Helper package for generating reports for use with the **D2L test reporting
framework**. Reporters in this package produce a structured JSON report file
that can be uploaded to the D2L test reporting back-end using the corresponding
[GitHub Action].

> [!NOTE]
> If you have any questions, concerns or just want to chat feel free to reach
> out in [#test-reporting] (D2L employee accessible only).

## Installation

Install the package as a dev dependency since it is only used during test
execution.

```console
npm install --save-dev d2l-test-reporting
```

## Usage

This library provides built-in reporters for several test execution frameworks
used at D2L, along with a `ReportBuilder` class for building custom reporters.

### Configuration

A D2L test reporting configuration file is required when using one of the
reporters in this package. It maps test files to a test type and tool, which
are recorded in the output report. By default, reporters look for a file named
`d2l-test-reporting.config.json` at the root of the repository. This path can
be changed using the `reportConfigurationPath` option available on each
reporter, though the default is sufficient for most projects.

See [Report Configuration] for examples, and [Report Configuration Format] for
schema details.

### Reporters

Each reporter wraps your test framework and emits a D2L test report JSON file
when the test run completes. The following frameworks are supported.

* [Jest]
* [Mocha]
* [Node.js Test Runner]
* [Playwright]
* [Web Test Runner]
* [WebdriverIO]

#### Custom Reporters

If your test framework isn't supported by the built-in reporters, you can build
your own using the `ReportBuilder` class. See [Report Builder] for a complete
walkthrough of creating a custom reporter for any test framework.

### Output

Reporters in this package output the D2L test report JSON format, which is
required by the [GitHub Action] to upload results to the back-end. For details
on the schema, see [Report Format].

## Developing

After cloning the repository, make sure to install dependencies.

```console
npm ci
npx playwright install --with-deps
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
[GitHub Action]: https://github.com/Brightspace/test-reporting-action
[#test-reporting]: https://d2l.slack.com/archives/C05MMC7H7EK
[semantic-release GitHub Action]: https://github.com/BrightspaceUI/actions/tree/main/semantic-release
[Jest]: ./docs/reporters/jest.md
[Mocha]: ./docs/reporters/mocha.md
[Node.js Test Runner]: ./docs/reporters/node.md
[Playwright]: ./docs/reporters/playwright.md
[Web Test Runner]: ./docs/reporters/web-test-runner.md
[WebdriverIO]: ./docs/reporters/webdriverio.md
[Report Builder]: ./docs/report-builder.md
[Report Configuration]: ./docs/report-configuration.md
[Report Configuration Format]: ./docs/format/report-configuration.md
[Report Format]: ./docs/format/report.md
