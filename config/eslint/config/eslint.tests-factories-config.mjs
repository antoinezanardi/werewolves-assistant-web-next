import Vitest from "eslint-plugin-vitest";

const ESLINT_TESTS_FACTORIES_CONFIG = {
  files: ["tests/unit/utils/factories/**/*.ts"],
  languageOptions: { globals: { ...Vitest.environments.env.globals } },
};

export { ESLINT_TESTS_FACTORIES_CONFIG };