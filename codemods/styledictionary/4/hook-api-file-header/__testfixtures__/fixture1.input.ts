export default {
  fileHeader: {
    foo: (defaultMessages = []) => [
      "Ola, planet!",
      ...defaultMessages,
      "Hello, World!",
    ],
  },
  platforms: {
    css: {
      options: {
        fileHeader: "foo",
      },
    },
  },
};
