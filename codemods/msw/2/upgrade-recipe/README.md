This recipe is a set of codemods that will upgrade your project from using msw v1 to v2.

The recipe includes the following codemods:

- [imports](/registry/msw-2-imports)
- [type-args](/registry/msw-2-type-args)
- [request-changes](/registry/msw-2-request-changes)
- [ctx-fetch](/registry/msw-2-ctx-fetch)
- [req-passthrough](/registry/msw-2-req-passthrough)
- [response-usages](/registry/msw-2-response-usages)
- [callback-signature](/registry/msw-2-callback-signature)
- [lifecycle-events-signature](/registry/msw-2-lifecycle-events-signature)
- [print-handler](/registry/msw-2-print-handler)

### FNs

This recipe does not change the signatures of MSW handlers, if they were called using a custom factory function, for example to provide more type-safety or else. For example, the following code will only be partially updated:

```ts
export function mockFactory<T extends MyComplexType>(
  url: string,
  resolver: MyResolverType,
) {
  return rest.get(url, resolver);
}

const handlers = [
  mockFactory("/some/url", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
```

Also, if you were using req.body in your interceptors, this codemod will blindly assume you want `await request.json()` instead of any other type. You will have to correct that manually.
