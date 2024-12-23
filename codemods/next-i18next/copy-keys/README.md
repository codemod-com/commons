This codemod copies specific keys from one translation namespace to another, for each of the supported languages.

The codemod expects the following arguments:

- `oldNamespace` is the name of the namespace from which the keys are taken,
- `newNamespace` is the name of the namespace to which the keys are copied,
- `keys` is a comma-separated list of keys.

You need to pass these arguments using the [Codemod Arguments' settings](https://docs.codemod.com/docs/vs-code-extension/advanced-usage#set-codemod-arguments) in Codemod VSCode extension or [Codemod CLI](https://docs.codemod.com/docs/cli/quickstart).

## Before

### .../en/common.json

```json
{
  "copyKey": "copyKeyEnglish",
  "noopKey": "noopKeyEnglish"
}
```

### .../en/new.json

```json
{
  "existingKey": "existingKeyEnglish"
}
```

## After

### .../en/common.json

```json
{
  "copyKey": "copyKeyEnglish",
  "noopKey": "noopKeyEnglish"
}
```

### .../en/new.json

```json
{
  "existingKey": "existingKeyEnglish",
  "copyKey": "copyKeyEnglish"
}
```
