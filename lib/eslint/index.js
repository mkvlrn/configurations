// @ts-check
import eslint from "@eslint/js";
// @ts-expect-error, no types for this plugin
import pluginNext from "@next/eslint-plugin-next";
// @ts-expect-error, no types for this plugin
import configPrettier from "eslint-config-prettier";
// @ts-expect-error, no types for this plugin
import pluginImport from "eslint-plugin-import";
// @ts-expect-error, no types for this plugin
import pluginReact from "eslint-plugin-react";
// @ts-expect-error, no types for this plugin
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginUnicorn from "eslint-plugin-unicorn";
import pluginVitest from "eslint-plugin-vitest";
import eslintTypescript, { parser } from "typescript-eslint";

/** @type {import("typescript-eslint").ConfigWithExtends[]} */
export const base = [
  {
    name: "typescript parser",
    languageOptions: {
      parserOptions: { parser, ecmaVersion: "latest", project: true },
    },
  },

  {
    name: "eslint recommended",
    ...eslint.configs.recommended,
  },

  ...eslintTypescript.configs.strictTypeChecked,
  ...eslintTypescript.configs.stylisticTypeChecked,

  {
    /**
     * temporarily disable while most npm packages
     * still export unsafe types all over the place
     * so I'm guessing until 2034 or something
     */
    name: "disable unsafe temporarily",
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },

  {
    // backticks only in templates
    name: "backticks only in templates",
    rules: {
      "quotes": ["warn", "double", { avoidEscape: true }],
      "no-template-curly-in-string": "error",
    },
  },

  {
    // reminds you to remove scattered console statements
    name: "console warn",
    rules: { "no-console": "warn" },
  },

  {
    // forces type-safe equality checks
    name: "strict equality checks",
    rules: { eqeqeq: "error" },
  },

  {
    name: "allow numbers in template literals",
    rules: {
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
    },
  },

  {
    // only needed while https://github.com/nodejs/node/issues/51292 is open
    // TODO - remove this rule when it's fixed
    name: "allow floating promises from node:test's describe and test",
    rules: {
      "@typescript-eslint/no-floating-promises": [
        "error",
        {
          allowForKnownSafeCalls: [
            {
              from: "package",
              name: ["describe", "test", "suite", "it"],
              package: "node:test",
            },
          ],
        },
      ],
    },
  },

  {
    // default exports are bad
    name: "no default exports",
    rules: {
      "no-restricted-syntax": [
        "error",
        { selector: "ExportDefaultDeclaration", message: "Prefer named exports" },
      ],
    },
  },

  {
    /**
     * allows default exports for nextjs's page components (app router)
     * some config files also need to export a default object, so yeah
     */
    name: "no default exports exceptions",
    files: [
      "**/src/app/**/{page,layout,template,not-found,loading,error,route}.tsx",
      "*.config.{ts,js,mjs}",
      "**/*.config.{ts,js,mjs}",
      "*.d.ts",
      "**/*.d.ts",
    ],
    rules: {
      "no-restricted-syntax": ["off", { selector: "ExportDefaultDeclaration" }],
    },
  },

  {
    name: "eslint plugin import",
    plugins: { import: pluginImport },
    settings: { "import/resolver": { typescript: {} } },
    rules: {
      ...pluginImport.flatConfigs.recommended.rules,
      ...pluginImport.flatConfigs.typescript.rules,
      ...pluginImport.flatConfigs.react.rules,
      // allows for the use of devDependencies in test files
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      // doesn't require default exports on files with single exports
      "import/prefer-default-export": "off",
      // another not-so-brilliant rule
      "import/no-named-as-default": "off",
      // another not-so-brilliant rule redux
      "import/no-named-as-default-member": "off",
      // don't know about this one either, chief
      "import/namespace": "off",
    },
  },

  {
    name: "eslint plugin unicorn",
    plugins: { unicorn: pluginUnicorn },
    rules: {
      ...pluginUnicorn.configs["flat/recommended"].rules,
      // null is fine
      "unicorn/no-null": "off",
      // some names come from external sources, gotta allow those
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            ProcessEnv: true,
            ImportMetaEnv: true,
            generateStaticParams: true,
            Props: true,
          },
          ignore: ["next-env", "vite-env"],
        },
      ],
    },
  },

  {
    name: "eslint plugin react and react hooks",
    files: ["*.tsx"],
    plugins: { "react": pluginReact, "react-hooks": pluginReactHooks },
    rules: {
      ...pluginReact.configs["jsx-runtime"].rules,
      ...pluginReactHooks.configs.recommended.rules,
    },
  },

  {
    name: "eslint plugin vitest",
    files: ["*.test.ts", "*.spec.ts", "*.test.tsx", "*.spec.tsx"],
    plugins: { vitest: pluginVitest },
    rules: { ...pluginVitest.configs.recommended.rules },
  },

  {
    name: "disable rules that are controlled by prettier",
    ...configPrettier,
  },
];

/** @type {import("typescript-eslint").ConfigWithExtends[]} */
export const next = [
  ...base,

  {
    name: "eslint plugin next",
    files: ["*.tsx"],
    plugins: { "@next/next": pluginNext },
    rules: {
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
];
