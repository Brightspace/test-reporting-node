# d2l-test-reporting

> [!WARNING]
> This is still a work in progress. Any usage of this package is subject to
> change without notice.

## Developing

After cloning the repository make sure to install dependencies.

```console
npm ci
```

### Linting

```console
# currently only eslint
npm run lint

# eslint only
npm run lint:eslint
```

### Formatting

```console
# currently only eslint
npm run fix

# eslint only
npm run fix:eslint
```

### Testing

```console
# lint, unit tests and integration tests
npm test

# unit tests and integration tests only
npm run test:all

# unit tests only
npm run test:unit

# integration tests only
npm run test:integration
```
