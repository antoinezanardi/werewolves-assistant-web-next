import { OFF } from "../eslint.constants.mjs";

const ESLINT_TESTS_SETUP_CONFIG = {
  name: "test-setup",
  files: ["tests/unit/unit-setup.ts"],
  rules: { "max-lines-per-function": OFF },
};

export { ESLINT_TESTS_SETUP_CONFIG };