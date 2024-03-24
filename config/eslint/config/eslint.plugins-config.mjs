import { OFF } from "../eslint.constants.mjs";

const ESLINT_PLUGINS_CONFIG = {
  files: ["plugins/**/*.ts"],
  rules: { "import/no-default-export": OFF },
};

export { ESLINT_PLUGINS_CONFIG };