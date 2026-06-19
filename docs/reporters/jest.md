# Jest Reporter

Please consult the [official documentation for Jest] to see how to configure
reporters. The example below assumes you are using a `jest.config.cjs` file.

> [!NOTE]
> This is a simplified example. Update values and options to match your
> specific project setup.

```js
module.exports = {
  reporters: [
    'default',
    ['d2l-test-reporting/reporters/jest.js']
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

```js
module.exports = {
  testTimeout: 5000,
  reporters: [
    'default',
    ['d2l-test-reporting/reporters/jest.js', {
      reportPath: './d2l-test-report-jest.json',
      reportConfigurationPath: './d2l-test-reporting.config.json',
      verbose: true
    }]
  ]
};
```

> [!NOTE]
> Jest does not expose per-test timeout values in reporter callbacks. The
> generated report includes the configured global `testTimeout` value.

<!-- links -->
[official documentation for Jest]: https://jestjs.io/docs/configuration#reporters-arraymodulename--modulename-options
