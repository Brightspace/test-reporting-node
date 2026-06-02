# Report Configuration

To have the test type and tool mapped to test code, a D2L test reporting
configuration file is required when using one of the reporters provided in this
package. For details on the schema that the report configuration file follows,
see [Report Configuration Format].

Please see [Automated Testing Definitions] on Confluence for the list of test
types that should be used when creating the configuration file.

## Simple Configuration

The simplest configuration maps all tests to the same type and tool.

```json
{
  "type": "UI Visual Diff",
  "tool": "Tool"
}
```

## Configuration with Overrides

Use overrides to map different test file patterns to different tools or types.
Note that the `type` field will end up as lowercase in the report.

```json
{
  "type": "UI E2E",
  "overrides": [
    {
      "pattern": "tests/feature-a/**/*",
      "tool": "Feature A"
    },
    {
      "pattern": "tests/feature-b/**/*",
      "tool": "Feature B"
    },
    {
      "pattern": "tests/feature-c.test.js",
      "tool": "Feature C"
    }
  ]
}
```

## Configuration with Ignore Patterns

Use `ignorePatterns` to exclude certain test files from the report entirely.

```json
{
  "type": "UI E2E",
  "tool": "Tool",
  "ignorePatterns": [
    "tests/ignored/**/*"
  ]
}
```

<!-- links -->
[Report Configuration Format]: ./format/report-configuration.md
[Automated Testing Definitions]: https://desire2learn.atlassian.net/wiki/spaces/D2L/pages/3264774/Automated+Testing+Definitions
