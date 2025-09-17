# Report Format

Reports that are generated from test runs via the custom test reporters stored
as part of the repository will output a custom format. This format allows us to
capture all of the desired information in a consistent way so that the mapping
from test run data to back-end storage is easier. For details on how data is
stored in [AWS Timestream], please see [Storage Schema].

> [!NOTE]
> All JSON below is simply a pseudo representation of the actual schemas which
> are stored in the [`schemas`](../schemas) folder.

## Current

```json
{
  "id": "<GUID>",
  "version": 2,
  "summary": {
    "github": {
      "organization": "<Non-empty string matching pattern '[A-Za-z0-9_.-]+'>",
      "repository": "<Non-empty string matching pattern '[A-Za-z0-9_.-]+'>",
      "workflow": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$'>",
      "runId": "<Positive integer, can be 0>",
      "runAttempt": "<Positive integer, must be 1 or greater>"
    },
    "git": {
      "branch": "<Git branch this was generated for>",
      "sha": "<Git SHA hash representing the commit this was generated for>"
    },
    "count": {
      "passed": "<Positive integer, can be 0>",
      "skipped": "<Positive integer, can be 0>",
      "flaky": "<Positive integer, can be 0>",
      "failed": "<Positive integer, can be 0>"
    },
    "duration": {
      "total": "<Positive integer representing milliseconds, can be 0>"
    },
    "status": "<Must be 'passed' or 'failed'>",
    "framework": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$>'",
    "operatingSystem": "<Must be one of 'linux', 'windows' or 'mac'>",
    "started": "<UTC timestamp>"
  },
  "details": [
    {
      "location": {
        "file": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$'>",
        "column": "<Positive integer, can be 0, optional>",
        "line": "<Positive integer, can be 0, optional>"
      },
      "started": "<Timestamp in UTC time>",
      "duration": {
        "total": "<Positive integer representing milliseconds, can be 0>",
        "final": "<Positive integer representing milliseconds, can be 0>"
      },
      "name": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$>'",
      "status": "<Must be 'passed', 'skipped' or 'failed'>",
      "retries": "<Positive integer, can be 0>",
      "timeout": "<Positive integer representing milliseconds, can be 0, optional>",
      "browser": "<Can be 'chromium', 'chrome', 'firefox', 'webkit', 'safari' or 'edge', optional>",
      "type": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$', optional>",
      "experience": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$', optional>",
      "tool": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$', optional>"
    }
  ]
}
```

## Previous

<details>
<summary>Version 1</summary>

```json
{
  "id": "<GUID>",
  "version": 1,
  "summary": {
    "githubOrganization": "<Non-empty string matching pattern '[A-Za-z0-9_.-]+'>",
    "githubRepository": "<Non-empty string matching pattern '[A-Za-z0-9_.-]+'>",
    "githubWorkflow": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$'>",
    "githubRunId": "<Positive integer, can be 0>",
    "githubRunAttempt": "<Positive integer, must be 1 or greater>",
    "gitBranch": "<Git branch this was generated for>",
    "gitSha": "<Git SHA hash representing the commit this was generated for>",
    "countPassed": "<Positive integer, can be 0>",
    "countSkipped": "<Positive integer, can be 0>",
    "countFlaky": "<Positive integer, can be 0>",
    "countFailed": "<Positive integer, can be 0>",
    "totalDuration": "<Positive integer representing milliseconds, can be 0>",
    "status": "<Must be 'passed' or 'failed'>",
    "framework": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$>'",
    "operatingSystem": "<Must be one of 'linux', 'windows' or 'mac'>",
    "started": "<UTC timestamp>"
  },
  "details": [
    {
      "location": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$'>",
      "started": "<Timestamp in UTC time>",
      "totalDuration": "<Positive integer representing milliseconds, can be 0>",
      "duration": "<Positive integer representing milliseconds, can be 0>",
      "name": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$>'",
      "status": "<Must be 'passed', 'skipped' or 'failed'>",
      "retries": "<Positive integer, can be 0>",
      "browser": "<Can be 'chromium', 'chrome', 'firefox', 'webkit', 'safari' or 'edge', optional>",
      "type": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$', optional>",
      "experience": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$', optional>",
      "tool": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$', optional>"
    }
  ]
}
```

</details>

<!-- links -->
[AWS Timestream]: https://aws.amazon.com/timestream
[Storage Schema]: https://github.com/Brightspace/test-reporting-action/blob/main/docs/storage-schema.md
