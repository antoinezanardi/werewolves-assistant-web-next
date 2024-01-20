import Vitest from "eslint-plugin-vitest";

import { OFF } from "../eslint.constants.mjs";

const ESLINT_TESTS_SETUP_CONFIG = {
  files: ["tests/unit/unit-setup.ts"],
  languageOptions: { globals: { ...Vitest.environments.env.globals } },
  rules: {
    "max-lines-per-function": OFF,
    "vue/multi-word-component-names": OFF,
  },
};

export { ESLINT_TESTS_SETUP_CONFIG };