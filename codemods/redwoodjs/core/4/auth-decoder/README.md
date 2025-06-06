This codemod for RedwoodJS v4 automatically inserts an `authDecoder` property into the `createGraphQLHandler` call if it's not already present. It also adds an import statement for `authDecoder` from `@redwoodjs/auth-auth0-api` at the beginning of the file, ensuring that the necessary functionality for authentication is correctly integrated.

## Before

```ts
import { createGraphQLHandler } from "@redwoodjs/graphql-server";
import directives from "src/directives/**/*.{js,ts}";
import sdls from "src/graphql/**/*.sdl.{js,ts}";
import { db } from "src/lib/db";
import { logger } from "src/lib/logger";
import services from "src/services/**/*.{js,ts}";

export const handler = createGraphQLHandler({
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect();
  },
});
```

## After

```ts
import { authDecoder } from "@redwoodjs/auth-auth0-api";
import { createGraphQLHandler } from "@redwoodjs/graphql-server";
import directives from "src/directives/**/*.{js,ts}";
import sdls from "src/graphql/**/*.sdl.{js,ts}";
import { db } from "src/lib/db";
import { logger } from "src/lib/logger";
import services from "src/services/**/*.{js,ts}";

export const handler = createGraphQLHandler({
  authDecoder: authDecoder,
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,

  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect();
  },
});
```
