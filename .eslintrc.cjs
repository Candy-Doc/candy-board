module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    createDefaultProgram: true,
    ecmaVersion: 2019,
    sourceType: "module",
  },
  extends: ["eslint:recommended"],
  plugins: ["svelte3"],
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
  settings: {
    "svelte3/typescript": () => require("typescript"),
  },
};
