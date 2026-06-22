# WebdriverIO Reporter

Please consult the [official documentation for WebdriverIO] to see how to use
reporters. The example below assumes you are using the default `wdio.conf.js`
file for configuration.

> [!NOTE]
> This is a simplified example. Update values and options to match your
> specific project setup.

```js
export const config = {
  specs: ['test/*.test.js'],
  capabilities: [{
    browserName: 'chrome'
  }],
  framework: 'mocha',
  reporters: [
    'spec',
    ['d2l-test-reporting/reporters/webdriverio.js']
  ]
};
```

## Inputs

* `reportPath` (default: `./d2l-test-report.json`): Path to output the report
  to, relative to current working directory.
* `reportConfigurationPath` (default: `./d2l-test-reporting.config.json`): Path
  to the D2L test reporting configuration file for mapping test type and tool
  to test code.
* `verbose` (default: `false`): Enable verbose logging for debugging purposes.

## Full Example

The defaults for all optional inputs work well for most setups. The example
below shows every available option explicitly set, and is intended as a
reference if any values need to be customized.

WebdriverIO spawns parallel workers that each produce a separate report file.
The `mergeReports` helper combines them into a single report after the run
completes.

```js
import { mergeReports } from 'd2l-test-reporting/helpers/merge-reports.js';

export const config = {
  specs: ['test/*.test.js'],
  capabilities: [{
    browserName: 'chrome'
  }],
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'd2l-test-reporting/reporters/webdriverio.js',
      {
        reportPath: './d2l-test-report-webdriverio.json',
        reportConfigurationPath: './d2l-test-reporting.config.json',
        verbose: true
      }
    ]
  ],
  onComplete() {
    mergeReports(
      './d2l-test-report-webdriverio-*.json',
      './d2l-test-report-webdriverio.json'
    );
  }
};
```

> [!NOTE]
> WebdriverIO does not expose source line and column information, so each test
> detail records only the file path under `location`. Browsers not supported by
> the report schema are omitted from the detail. WebdriverIO also does not retry
> failing hooks, and only `before all` and `before each` hook failures are
> attributed to the affected test; a failing `after` hook is not recorded as a
> test failure.

<!-- links -->
[official documentation for WebdriverIO]: https://webdriver.io/docs/customreporter
