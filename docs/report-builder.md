# Report Builder

## When to Use

Use the `ReportBuilder` class when your test framework isn't supported by one of
the existing reporters ([Mocha Reporter], [Node.js Test Runner Reporter],
[Playwright Reporter], [Web Test Runner Reporter], [WebdriverIO Reporter]).

## Quick Start

```js
const { ReportBuilder } = require('d2l-test-reporting/helpers/report-builder.cjs');

const logger = {
  info: (msg) => console.log(msg),
  warning: (msg) => console.warn(msg),
  error: (msg) => console.error(msg),
  location: (msg, loc) => console.log(`${msg}: ${loc}`)
};

const report = new ReportBuilder('your-framework-name', logger);
```

## Inputs

* `reportPath` (default: `./d2l-test-report.json`): Path to output the report
  to, relative to current working directory.
* `reportConfigurationPath` (default: `./d2l-test-reporting.config.json`): Path
  to the D2L test reporting configuration file for taxonomy mapping and ignore
  patterns. See [Report Configuration Format] for the schema.
* `verbose` (default: `false`): Enable verbose logging for debugging purposes.

## How It Works

A report has two parts:

* **Summary** — Overall test run info (total duration, pass/fail counts).
  Access with `report.getSummary()`.
* **Details** — Individual test results (one per test).
  Access with `report.getDetail(testId)`.

All methods return `this` for chaining:

```js
report.getSummary().setStarted(time).setPassed();
```

## Complete Example

> [!NOTE]
> The hook names (`onRunStart`, `onTestEnd`, etc.) vary by framework.
> This example uses generic names. Consult your test framework's documentation
> for actual hook names and parameters.

```js
const { ReportBuilder } = require('../helpers/report-builder.cjs');
const { getNowISOString } = require('../helpers/system.cjs');

class CustomReporter {
  constructor(options = {}) {
    const logger = { /* see Quick Start */ };

    try {
      this._report = new ReportBuilder('custom-framework', logger, options);
    } catch (error) {
      logger.error('Failed to initialize D2L test report builder');
      logger.error(error.message);

      return;
    }
  }

  onRunStart(stats) {
    this._report.getSummary()
      .addContext()
      .setStarted(stats.startTime);
  }

  onTestStart(test) {
    if (this._report.ignoreFilePath(test.file)) return;

    const testId = `${test.file}[${test.name}]`;

    this._report.getDetail(testId)
      .setName(test.name)
      .setLocationFile(test.file)
      .setStarted(getNowISOString())
      .setTimeout(test.timeout);
  }

  onTestRetry(test) {
    if (this._report.ignoreFilePath(test.file)) return;

    const testId = `${test.file}[${test.name}]`;

    this._report.getDetail(testId)
      .incrementRetries()
      .addDuration(test.duration);
  }

  onTestEnd(test, result) {
    if (this._report.ignoreFilePath(test.file)) return;

    const testId = `${test.file}[${test.name}]`;
    const detail = this._report.getDetail(testId);

    detail.addDuration(result.duration);

    if (result.status === 'passed') detail.setPassed();
    else if (result.status === 'skipped') detail.setSkipped();
    else detail.setFailed();
  }

  onRunEnd(stats) {
    const summary = this._report.getSummary()
      .setDurationTotal(stats.duration);

    if (stats.failures === 0) {
      summary.setPassed();
    } else {
      summary.setFailed();
    }

    this._report.finalize().save();
  }
}
```

## Common Patterns

### Creating Test IDs

Each test needs a unique ID. Combine file path and test name:

```js
const testId = `${test.file}[${test.fullName}]`;
// Example: "test/unit/component.test.js[MyComponent > should render]"
```

### Checking Ignored Files

Always check before processing a test:

```js
if (this._report.ignoreFilePath(test.file)) {
  return;
}
```

### Handling Retries

On each retry attempt, increment the counter and add duration:

```js
detail.incrementRetries().addDuration(attemptDuration);
```

Only set pass/fail status after all retries complete.

### Setting Browser Names

Validate against the supported list:

```js
const supportedBrowsers = ReportBuilder.SupportedBrowsers;
// ['chromium', 'chrome', 'firefox', 'webkit', 'safari', 'edge']

if (browser && supportedBrowsers.includes(browser.toLowerCase())) {
  detail.setBrowser(browser.toLowerCase());
}
```

## Key Methods

### Summary

```js
const summary = report.getSummary();

summary.addContext();              // Add GitHub/Git context (if available)
summary.setStarted(isoTimestamp); // Set start time
summary.setDurationTotal(ms);     // Set total duration in milliseconds
summary.setPassed();
summary.setFailed();
```

### Detail

```js
const detail = report.getDetail(testId);

detail.setName(name);             // Test name
detail.setLocationFile(path);     // File path (auto-applies taxonomy if configured)
detail.setLocationLine(n);        // Line number (optional)
detail.setStarted(isoTimestamp);  // Start time
detail.setTimeout(ms);            // Timeout in milliseconds
detail.setBrowser(browser);       // Browser name (must be in SupportedBrowsers)
detail.addDuration(ms);           // Add to duration (use for retries)
detail.incrementRetries();        // Add 1 to retry count
detail.setPassed();
detail.setFailed();
detail.setSkipped();
```

### Core

```js
report.ignoreFilePath(path); // Returns true if file should be skipped
report.finalize();           // Aggregate counts from details (required before save)
report.save();               // Write JSON report to disk
```

## Finalize Before Save

Call `finalize()` before `save()`. It loops through all test details, counts
results by status, and detects flaky tests (status `passed` with `retries > 0`
are counted as flaky, not passed). Without calling `finalize()`, summary counts
will be incorrect.

```js
report.finalize().save();
```

## Checklist

* Call `finalize()` before `save()`
* Check `ignoreFilePath()` before processing each test
* Use a consistent test ID format throughout
* Use `getNowISOString()` from `helpers/system.cjs` for ISO 8601 timestamps so
  reports are unaffected by anything in user tests that mutates time
  (e.g. `sinon.useFakeTimers`)
* Wrap `new ReportBuilder()` in try-catch

## See Also

* [Mocha Reporter]
* [Node.js Test Runner Reporter]
* [Playwright Reporter]
* [Web Test Runner Reporter]
* [WebdriverIO Reporter]
* [Report Format]

<!-- links -->
[Mocha Reporter]: ./reporters/mocha.md
[Node.js Test Runner Reporter]: ./reporters/node.md
[Playwright Reporter]: ./reporters/playwright.md
[Web Test Runner Reporter]: ./reporters/web-test-runner.md
[WebdriverIO Reporter]: ./reporters/webdriverio.md
[Report Format]: ./format/report.md
[Report Configuration Format]: ./format/report-configuration.md
