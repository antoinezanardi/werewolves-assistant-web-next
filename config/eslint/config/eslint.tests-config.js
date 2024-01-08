import { OFF, READONLY } from "../eslint.constants.js";

const ESLINT_TESTS_CONFIG = {
  files: ["tests/**/*.spec.ts"],
  languageOptions: {
    globals: {
      describe: READONLY,
      it: READONLY,
      expect: READONLY,
    },
  },
  rules: { "import/no-relative-parent-imports": OFF },
};

export { ESLINT_TESTS_CONFIG };