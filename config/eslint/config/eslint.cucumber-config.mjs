import { ERROR, OFF, READONLY } from "../eslint.constants.mjs";

const ESLINT_CUCUMBER_CONFIG = {
  files: ["tests/acceptance/**/*.ts"],
  languageOptions: {
    globals: {
      describe: READONLY,
      it: READONLY,
      expect: READONLY,
    },
  },
  rules: {
    "new-cap": [ERROR, { capIsNewExceptions: ["BeforeAll", "AfterAll", "Before", "After", "Given", "When", "Then"] }],
    "func-names": OFF,
    "import/no-relative-parent-imports": OFF,
  },
};

export { ESLINT_CUCUMBER_CONFIG };