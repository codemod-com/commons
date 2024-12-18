/*! @license
The MIT License (MIT)

Copyright (c) 2024 yugal41735

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return transform;
  },
});
function transform(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let dirtyFlag = false;
  root
    .find(j.NewExpression, {
      callee: {
        object: { object: { name: "ethers" }, property: { name: "providers" } },
        property: { name: "Web3Provider" },
      },
    })
    .forEach((path) => {
      path.node.callee = j.memberExpression(
        j.identifier("ethers"),
        j.identifier("BrowserProvider"),
      );
      dirtyFlag = true;
    });
  root
    .find(j.CallExpression, {
      callee: {
        object: { name: "provider" },
        property: { name: "sendTransaction" },
      },
    })
    .forEach((path) => {
      path.node.callee.property.name = "broadcastTransaction";
      dirtyFlag = true;
    });
  root
    .find(j.NewExpression, { callee: { name: "StaticJsonRpcProvider" } })
    .forEach((path) => {
      const [url, network] = path.node.arguments;
      path.node.callee = j.identifier("JsonRpcProvider");
      path.node.arguments = [
        url,
        network,
        j.objectExpression([
          j.property.from({
            kind: "init",
            key: j.identifier("staticNetwork"),
            value: network,
            shorthand: true,
          }),
        ]),
      ];
      dirtyFlag = true;
    });
  root
    .find(j.AwaitExpression, {
      argument: {
        callee: {
          object: { name: "provider" },
          property: { name: "getGasPrice" },
        },
      },
    })
    .forEach((path) => {
      path.replace(
        j.memberExpression(
          j.awaitExpression(
            j.callExpression(
              j.memberExpression(
                j.identifier("provider"),
                j.identifier("getFeeData"),
              ),
              [],
            ),
          ),
          j.identifier("gasPrice"),
        ),
      );
      dirtyFlag = true;
    });
  return dirtyFlag ? root.toSource() : undefined;
}
