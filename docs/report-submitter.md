# Report Submitter

## When to Use

In most cases `ReportSubmitter` should not be used. To upload reports from Github use the [GitHub Action].
It is used when the report needs to be uploaded outside of Github Actions.

## Quick Start

```js
import { ReportBuilder }  from 'd2l-test-reporting/helpers/report-builder.js';
import { ReportSubmitter } from 'd2l-test-reporting/helpers/report-submitter.js';

const logger = {
  info: (msg) => console.log(msg),
  warning: (msg) => console.warn(msg),
  error: (msg) => console.error(msg),
  location: (msg, loc) => console.log(`${msg}: ${loc}`)
};

const report = new ReportBuilder('your-framework-name', logger);
const submitter = new ReportSubmitter(logger); // AWS credentials are read from environment variables
await submitter.submit(report);
```


<!-- links -->
[GitHub Action]: https://github.com/Brightspace/test-reporting-action
