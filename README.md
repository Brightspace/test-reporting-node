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

### Configuration

### Reporters

#### [Mocha]

Please consult the [official documentation for Mocha] to see how
to use reporters. Below is an example of how to add the reporter provided by
this package.

#### [Playwright]

Please consult the [official documentation for Playwright] to see how
to use reporters. Below is an example of how to add the reporter provided by
this package.

#### [`@web/test-runner`]

Please consult the [official documentation for `@web/test-runner`] to see how
to use reporters. Below is an example of how to add the reporter provided by
this package.

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
