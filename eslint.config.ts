import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import eslintConfigPrettier from "eslint-config-prettier";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pluginNext from "@next/eslint-plugin-next";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  ...tseslint.config(
    {
      plugins: {
        "@next/next": pluginNext,
      },
      files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
      rules: {
        ...pluginNext.configs.recommended.rules,
        ...pluginNext.configs["core-web-vitals"].rules,
      },
    },
    eslint.configs.recommended,
    tseslint.configs.strict,
    eslintConfigPrettier,
    {
      ignores: [".next/**/*", ".obsidian/**/*", "node_modules/**/*", "out/**/*"],
    }
  ),
];
