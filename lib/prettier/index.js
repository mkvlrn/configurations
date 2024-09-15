/** @type {import("prettier").Config} */
export const base = {
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  endOfLine: "lf",
  printWidth: 88,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  jsxSingleQuote: false,
  quoteProps: "consistent",
  importOrder: ["^node:(.*)", "<THIRD_PARTY_MODULES>", "^#(.*)/", "^[./]"],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: [
    "typescript",
    "jsx",
    "decorators-legacy",
    "importAssertions",
  ],
  tailwindFunctions: ["clsx"],
};
