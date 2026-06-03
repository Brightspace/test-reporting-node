# Mocha Reporter

Please consult the [official documentation for Mocha] to see how to use
reporters. The example below assumes you are using the default `.mocharc.js`
file for configuration.

> [!NOTE]
> This is a simplified example. Update values and options to match your
> specific project setup.

```js
module.exports = {
  spec: 'test/*.test.js',
  reporter: 'd2l-test-reporting/reporters/mocha.js'
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
  spec: 'test/*.test.js',
  reporter: 'd2l-test-reporting/reporters/mocha.js',
  reporterOptions: [
    'reportPath=./d2l-test-report.json',
    'reportConfigurationPath=./d2l-test-reporting.config.json',
    'verbose=true'
  ]
};
```

<!-- links -->
[official documentation for Mocha]: https://mochajs.org/api/mocha#reporter
