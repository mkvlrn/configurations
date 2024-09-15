# @mkvlrn/configurations

## what

custom, opinionated configurations for `eslint`, `prettier`, and `typescript` (`tsconfig.json`) for my projects - aimed at modern, type-safe, non-spaghetti codebases

works in `esm` projects. not sure if it works in `cjs`, nor I'm willing to test it; you **should** be using `esm`

## how

```bash
yarn add typescript eslint prettier @mkvlrn/configurations -D
```

then import the configurations from the package on your config files:

<details>
<summary><code>eslint.config.js</code></summary>

for base node, nest, or vite/react projects:

```js
export { base as default } from "@mkvlrn/configurations/eslint";
```

for nextjs projects:

```js
export { next as default } from "@mkvlrn/configurations/eslint";
```

if you want to add rules to the config, you export it as default while adding your rules to the config array:

```js
import { base } from "@mkvlrn/configurations/eslint";

/** @type {import("typescript-eslint").ConfigWithExtends[]} */
export default {
  ...base, // or ...next for the nextjs config

  rules: {
    // add your custom rules here
    "no-console": "error",
    // or ignores
    "ignores": ["dist"],
  },
};
```

</details>

<details>
<summary><code>prettier.config.js</code></summary>

for all projects, using the config without modifying it:

```js
export { base as default } from "@mkvlrn/configurations/prettier";
```

and if you want to modify any of the rules, you can do so:

```js
import { base } from "@mkvlrn/configurations/prettier";

/** @type {import("prettier").Options} */
export default {
  ...base,

  // add your custom rules here
  printWidth: 100,
};
```

</details>

<details>
<summary><code>tsconfig.json</code></summary>

for base node, nest, or vite/react projects:

```jsonc
{
  "extends": "@mkvlrn/configurations/tsconfig-base",
  "compilerOptions": {
    // add your custom rules here
    "strict": true,
    "noUncheckedIndexedAccess": true,
  },
}
```

for nextjs projects:

```jsonc
{
  "extends": "@mkvlrn/configurations/tsconfig-next",
  "compilerOptions": {
    // add your custom rules here
    "strict": true,
    "noUncheckedIndexedAccess": true,
  },
}
```

</details>

## details

### eslint

two eslint flat configs: one for whatever node project (node, nest, react with vite, etc) and another for nextjs projects (which requires some special rules)

almost 100% positive it requires esm (`type: module` in package.json), I don't even know at this point, but if you use commonjs in 2024 you should be sent to the gulag

ALL rulesets/plugins are installed with the package, it's a flat config, so it's fancy that way

installing eslint separately is **required**

### prettier

a packaged prettier configuration with some opinionated defaults

also brings tailwindcss support (order of classes) and imports sorting, both via plugins

installing prettier separately is **required**

### typescript (tsconfig)

a packaged `tsconfig.json` with some opinionated defaults for both base node (which includes nest and vite/react projects) and nextjs projects

anything related to files except needs to be set: `rootDir`, `outDir`, `baseUrl`, `paths`, etc

this prevents path confusion because the "original" tsconfig will be in `node_modules`

defaults to `noemit` because I use esbuild so you might want to change that if you still want to use `tsc` like it's 2014

installing typescript separately is **required**
