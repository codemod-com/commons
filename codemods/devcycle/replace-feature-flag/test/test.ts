import assert from "node:assert";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { Project } from "ts-morph";
import { describe, it } from "vitest";
import type { Options } from "../../../replace-feature-flag-core/src/types.js";
import { handleSourceFile } from "../src/index.js";

const transform = (
  beforeText: string,
  afterText: string,
  path: string,
  options: Omit<Options, "provider">,
) => {
  const project = new Project({
    useInMemoryFileSystem: true,
    skipFileDependencyResolution: true,
    compilerOptions: {
      allowJs: true,
    },
  });

  const actualSourceFile = project.createSourceFile(path, beforeText);

  const actual = handleSourceFile(actualSourceFile, options)?.replace(/W/gm, "");

  const expected = project
    .createSourceFile(`expected${extname(path)}`, afterText)
    .getFullText()
    .replace(/W/gm, "");

  return {
    actual,
    expected,
  };
};

describe("Replace feature flag", () => {
  it("Should replace feature flag with boolean value", async () => {
    const INPUT = await readFile(
      join(__dirname, "..", "__testfixtures__/devcycle.input.js"),
      "utf-8",
    );
    const OUTPUT = await readFile(
      join(__dirname, "..", "__testfixtures__/devcycle.output.js"),
      "utf-8",
    );

    const { actual, expected } = transform(INPUT, OUTPUT, "index.tsx", {
      key: "simple-case",
      type: "boolean",
      value: "true",
    });

    assert.deepEqual(actual, expected);
  });

  it("Should replace feature flag with object value", async () => {
    const INPUT = await readFile(
      join(__dirname, "..", "__testfixtures__/object.input.js"),
      "utf-8",
    );
    const OUTPUT = await readFile(
      join(__dirname, "..", "__testfixtures__/object.output.js"),
      "utf-8",
    );

    const { actual, expected } = transform(INPUT, OUTPUT, "index.tsx", {
      key: "simple-case",
      type: "JSON",
      value: `{ "foo": { "bar": null, "baz": "str", "faz": 12 } }`,
    });

    console.log(actual, "actual");

    assert.deepEqual(actual, expected);
  });
});
