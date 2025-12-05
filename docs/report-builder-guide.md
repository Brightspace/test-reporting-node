# ReportBuilder Guide

This guide shows you how to build a custom test reporter using the
`ReportBuilder` class.

**When to use this:** Your test framework isn't supported by our existing
reporters ([Mocha](../src/reporters/mocha.cjs),
[Playwright](../src/reporters/playwright.js), [Web Test
Runner](../src/reporters/web-test-runner.js)).


## Quick Start

```javascript
const { ReportBuilder } = require('../helpers/report-builder.cjs');

// 1. Create a logger
const logger = {
  info: (msg) => console.log(msg),
  warning: (msg) => console.warn(msg),
  error: (msg) => console.error(msg),
  location: (msg, loc) => console.log(`${msg}: ${loc}`)
};

// 2. Initialize the builder (uses defaults: './d2l-test-report.json')
const report = new ReportBuilder('your-framework-name', logger);

// 3. Build your report (see example below)
```

**Options** (all optional):
- `reportPath` - Output path (default: `'./d2l-test-report.json'`)
- `reportConfigurationPath` - Path to config file for taxonomy mapping
  (type/tool/experience) and ignore patterns (default:
  `'./d2l-test-reporting.config.json'`). See
  [schema](../schemas/report-configuration/) for format.
- `verbose` - Show validation warnings (default: `false`)

## How It Works

You'll build a report with two parts:

1. **Summary** - Overall test run info (total duration, pass/fail counts)
   - Access with: `report.getSummary()`

2. **Details** - Individual test results (one per test)
   - Access with: `report.getDetail(testId)`

All methods return `this` for chaining:
```javascript
report.getSummary().setStarted(time).setPassed();
```

## Complete Example

Here's a minimal custom reporter showing the typical test lifecycle:

> [!NOTE]
> The hook names (`onRunStart`, `onTestEnd`, etc.) vary by framework.
> This example uses generic names. Consult your test framework's documentation
> for actual hook names and parameters.

```javascript
const { ReportBuilder } = require('../helpers/report-builder.cjs');

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
      .addContext()  // Adds GitHub/Git info automatically
      .setStarted(stats.startTime);
  }

  onTestStart(test) {
    if (this._report.ignoreFilePath(test.file)) return;

    const testId = `${test.file}[${test.name}]`;
    this._report.getDetail(testId)
      .setName(test.name)
      .setLocationFile(test.file)
      .setStarted(new Date().toISOString())
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

    this._report.finalize().save();  // Must call finalize() before save()
  }
}
```

## Common Patterns

**Read this first** - these patterns answer the most common questions:

**Creating Test IDs** Each test needs a unique ID. Combine file path + test
name:
```javascript
const testId = `${test.file}[${test.fullName}]`;
// Example: "test/unit/component.test.js[MyComponent > should render]"
```

**Checking Ignored Files** Always check before processing a test:
```javascript
if (this._report.ignoreFilePath(test.file)) {
  return; // Skip this test
}
```

**Handling Retries** On each retry attempt, increment the counter and add
duration:
```javascript
detail.incrementRetries().addDuration(attemptDuration);
```
Only set pass/fail status after all retries complete.

**Setting Browser Names** Validate against the supported list:
```javascript
const supportedBrowsers = ReportBuilder.SupportedBrowsers; // ['chromium', 'chrome', 'firefox', 'webkit', 'safari', 'edge']
if (browser && supportedBrowsers.includes(browser.toLowerCase())) {
  detail.setBrowser(browser.toLowerCase());
}
```

## Key Methods Reference

### Summary Methods
```javascript
const summary = report.getSummary();

summary.addContext();                    // Add GitHub/Git context (if available)
summary.setStarted(isoTimestamp);        // Set start time
summary.setDurationTotal(ms);            // Set total duration in milliseconds
summary.setPassed() / setFailed();       // Set overall status
```

### Detail Methods
```javascript
const detail = report.getDetail(testId);

detail.setName(name);                    // Test name
detail.setLocationFile(path);            // File path (auto-applies taxonomy if configured)
detail.setLocationLine(n);               // Line number (optional)
detail.setStarted(isoTimestamp);         // Start time
detail.setTimeout(ms);                   // Timeout in milliseconds
detail.setBrowser(browser);              // Browser name (must be in SupportedBrowsers)
detail.addDuration(ms);                  // Add to duration (use for retries)
detail.incrementRetries();               // Add 1 to retry count
detail.setPassed() / setFailed() / setSkipped();  // Set test status
```

### Core Methods
```javascript
report.ignoreFilePath(path);             // Returns true if file should be skipped
report.finalize();                       // Aggregate counts from details (required before save)
report.save();                           // Write JSON report to disk
```

## Understanding finalize()

Call `finalize()` before `save()` to calculate summary counts:

```javascript
report.finalize().save();
```

What it does:
1. Loops through all test details
2. Counts by status: passed, failed, skipped
3. Detects flaky tests: `status='passed'` AND `retries > 0` → counted as flaky
   (not passed)
4. Updates summary count fields

Without calling `finalize()`, your summary counts will be incorrect.

## Quick Checklist

Before you ship your reporter:

- ✅ Call `finalize()` before `save()`
- ✅ Check `ignoreFilePath()` before processing each test
- ✅ Use consistent test ID format throughout
- ✅ Use ISO 8601 timestamps: `new Date().toISOString()`
- ✅ Wrap `new ReportBuilder()` in try-catch
- ✅ Test with retries enabled to verify flaky detection works

## See Also

- [Mocha reporter](../src/reporters/mocha.cjs) for a complete reference
- [Playwright reporter](../src/reporters/playwright.js) for another example
- [Report format](./report-format.md) for output schema details
