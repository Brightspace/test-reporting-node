# Node.js Test Runner Reporter

Please consult the [official documentation for the Node.js test runner] to see
how to use [custom reporters].

> [!NOTE]
> This is a simplified example. Update values and options to match your
> specific project setup.

## CLI Usage

The reporter has a default export that works directly with the
`--test-reporter` flag. Pair it with another reporter (such as `spec`) to keep
human readable output on the console.

```console
node --test \
  --test-reporter=spec --test-reporter-destination=stdout \
  --test-reporter=d2l-test-reporting/reporters/node.js --test-reporter-destination=stdout
```

> [!NOTE]
> Node.js requires a `--test-reporter-destination` for every `--test-reporter`
> when more than one reporter is used. The reporter writes the report file
> itself (see `reportPath` under [Inputs]), so its destination receives no
> output and `stdout` acts as a harmless placeholder.

Options are read from environment variables since the Node.js test runner does
not forward options to custom reporters. See [Inputs] for the available
variables.

## Programmatic Usage

For finer control, use the named `reporter` factory with the [`run()`] API and
compose it onto the test stream.

```js
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { reporter } from 'd2l-test-reporting/reporters/node.js';
import { run } from 'node:test';

const testDirectory = 'test';
const files = readdirSync(testDirectory)
  .filter(name => name.endsWith('.test.js'))
  .map(name => join(testDirectory, name));

const stream = run({ files }).compose(reporter());

stream.on('data', () => {});
stream.on('error', () => {});
```

## Inputs

The `reporter` factory accepts the following options. When running through the
CLI, the corresponding environment variable is used instead.

* `reportPath` / `D2L_TEST_REPORTING_REPORT_PATH` (default:
  `./d2l-test-report.json`): Path to output the report to, relative to current
  working directory.
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
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { reporter } from 'd2l-test-reporting/reporters/node.js';
import { run } from 'node:test';

const testDirectory = 'test';
const files = readdirSync(testDirectory)
  .filter(name => name.endsWith('.test.js'))
  .map(name => join(testDirectory, name));
const stream = run({ files }).compose(reporter({
  reportPath: './d2l-test-report.json',
  reportConfigurationPath: './d2l-test-reporting.config.json',
  verbose: true
}));

stream.on('data', () => {});
stream.on('error', () => {});
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
