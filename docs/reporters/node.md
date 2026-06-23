# Node.js Test Runner Reporter

Please consult the [official documentation for the Node.js test runner] to see
how to use [custom reporters].

> [!NOTE]
> This is a simplified example. Update values and options to match your
> specific project setup.

## CLI Usage

The reporter has a default export that works directly with the
`--test-reporter` flag. It writes the report to its
`--test-reporter-destination`, so point that at the report file. Pair it with
another reporter (such as `spec`) to keep human readable output on the console.

```console
node --test \
  --test-reporter=spec --test-reporter-destination=stdout \
  --test-reporter=d2l-test-reporting/reporters/node.js --test-reporter-destination=./d2l-test-report.json
```

> [!NOTE]
> Node.js requires a `--test-reporter-destination` for every `--test-reporter`
> when more than one reporter is used. The D2L reporter emits the report to its
> destination, so set it to the file the report should be written to.

Remaining options are read from environment variables since the Node.js test
runner does not forward options to custom reporters. See [Inputs] for the
available variables.

## Programmatic Usage

For finer control, use the default export with the [`run()`] API and compose an
instance onto the test stream. The reporter emits the report to its readable
side, so pipe it to a destination such as a file write stream.

```js
import { createWriteStream, readdirSync } from 'node:fs';
import { join } from 'node:path';
import NodeReporter from 'd2l-test-reporting/reporters/node.js';
import { run } from 'node:test';

const testDirectory = 'test';
const files = readdirSync(testDirectory)
  .filter(name => name.endsWith('.test.js'))
  .map(name => join(testDirectory, name));

run({ files })
  .compose(new NodeReporter())
  .pipe(createWriteStream('./d2l-test-report.json'));
```

## Inputs

The report is written to the stream destination: the
`--test-reporter-destination` when running through the CLI, or whatever the
reporter stream is piped to when running programmatically.

The reporter constructor accepts the following options. When running through the
CLI, the corresponding environment variable is used instead.

* `reportConfigurationPath` / `D2L_TEST_REPORTING_REPORT_CONFIGURATION_PATH`
  (default: `./d2l-test-reporting.config.json`): Path to the D2L test reporting
  configuration file for mapping test type and tool to test code.
* `verbose` / `D2L_TEST_REPORTING_VERBOSE` (default: `false`): Enable verbose
  logging for debugging purposes.

## Full Example

The defaults for all optional inputs work well for most setups. The example
below shows every available option explicitly set, and is intended as a
reference if any values need to be customized.

```js
import { createWriteStream, readdirSync } from 'node:fs';
import { join } from 'node:path';
import NodeReporter from 'd2l-test-reporting/reporters/node.js';
import { run } from 'node:test';

const testDirectory = 'test';
const files = readdirSync(testDirectory)
  .filter(name => name.endsWith('.test.js'))
  .map(name => join(testDirectory, name));

run({ files })
  .compose(new NodeReporter({
    reportConfigurationPath: './d2l-test-reporting.config.json',
    verbose: true
  }))
  .pipe(createWriteStream('./d2l-test-report.json'));
```

> [!NOTE]
> The Node.js test runner does not expose the configured timeout for a test, so
> each test detail omits the `timeout` value under `configuration`. It also has
> no built-in retry mechanism, so each test detail always reports `retries` as
> `0` and no test is ever counted as `flaky`.

<!-- links -->
[official documentation for the Node.js test runner]: https://nodejs.org/api/test.html
[custom reporters]: https://nodejs.org/api/test.html#custom-reporters
[Inputs]: #inputs
[`run()`]: https://nodejs.org/api/test.html#runoptions
