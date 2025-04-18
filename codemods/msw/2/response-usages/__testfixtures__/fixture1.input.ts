// @ts-nocheck
import { http } from "msw";
import { Foo } from "somewhere"; // Foo is { x: string, y: number }

const y = 0;
const handler = http.get("/url", (_req, res, ctx) =>
  res(
    ctx.json<Foo>({
      x: "string",
      y,
    }),
  ),
);
