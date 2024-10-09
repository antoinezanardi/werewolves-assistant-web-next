import Vitest from "@vitest/eslint-plugin";

import { OFF } from "../eslint.constants.mjs";

const ESLINT_TESTS_FACTORIES_CONFIG = {
  name: "factories",
  files: ["tests/unit/utils/factories/**/*.ts"],
  languageOptions: { globals: { ...Vitest.environments.env.globals } },
  rules: {
    "max-lines-per-function": OFF,
    "import/no-internal-modules": OFF,
  },
};

export { ESLINT_TESTS_FACTORIES_CONFIG };