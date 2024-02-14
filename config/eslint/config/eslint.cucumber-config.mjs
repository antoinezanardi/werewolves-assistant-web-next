import { ERROR, OFF } from "../eslint.constants.mjs";

const ESLINT_CUCUMBER_CONFIG = {
  files: ["tests/acceptance/**/*.ts"],
  rules: {
    "func-names": OFF,
    "new-cap": [ERROR, { capIsNewExceptions: ["BeforeAll", "AfterAll", "Before", "After", "Given", "When", "Then"] }],
    "no-console": ["error", { allow: ["error", "info"] }],
    "@typescript-eslint/max-params": OFF,
  },
};

export { ESLINT_CUCUMBER_CONFIG };