# Playwright Reporter

Please consult the [official documentation for Playwright] to see how to use
reporters. The example below assumes you are using the default
`playwright.config.js` file for configuration.

> [!NOTE]
> This is a simplified example. Update values and options to match your
> specific project setup.

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['d2l-test-reporting/reporters/playwright.js'],
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

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  reporter: [
    [
      'd2l-test-reporting/reporters/playwright.js',
      {
        reportPath: './d2l-test-report.json',
        reportConfigurationPath: './d2l-test-reporting.config.json',
        verbose: true
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

<!-- links -->
[official documentation for Playwright]: https://playwright.dev/docs/test-reporters
[`merge-reports`]: https://playwright.dev/docs/test-sharding#merge-reports-cli
