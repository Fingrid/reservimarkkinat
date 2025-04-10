import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    ignores: [".next/**/*", ".obsidian/**/*", "node_modules/**/*", "out/**/*"],
  },
  ...tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strict,
    eslintConfigPrettier,
  ),
];
