import { ERROR, OFF } from "../eslint.constants.mjs";

const ESLINT_CUCUMBER_CONFIG = {
  name: "cucumber-files",
  files: ["tests/acceptance/**/*.ts"],
  rules: {
    "func-names": OFF,
    "new-cap": [ERROR, { capIsNewExceptions: ["BeforeAll", "AfterAll", "Before", "After", "Given", "When", "Then"] }],
    "no-await-in-loop": OFF,
    "no-console": ["error", { allow: ["error", "info"] }],
    "@typescript-eslint/max-params": OFF,
  },
};

export { ESLINT_CUCUMBER_CONFIG };