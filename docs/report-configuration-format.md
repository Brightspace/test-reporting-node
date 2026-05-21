# Report Configuration Format

The report configuration file is consumed by the custom test reporters provided
by this package. It maps test taxonomy to test files via glob patterns, and
lists patterns to ignore when generating a report.

> [!NOTE]
> All JSON below is simply a pseudo representation of the actual schemas which
> are stored in the [`schemas`](../schemas) folder.

## Current

```json
{
  "type": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$', optional>",
  "tool": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$', optional>",
  "experience": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$', optional>",
  "ignorePatterns": [
    "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$'>"
  ],
  "overrides": [
    {
      "pattern": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$'>",
      "type": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$', optional>",
      "tool": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$', optional>",
      "experience": "<Non-empty string matching pattern '^(?!\\s).+(?<!\\s)$', optional>"
    }
  ]
}
```

If `type` is omitted at the top level then every entry in `overrides` must
specify `type`. The same rule applies to `tool` and `experience`. If `type`,
`tool` and `experience` are all omitted at the top level then `overrides` is
required.
