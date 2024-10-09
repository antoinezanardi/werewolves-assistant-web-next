import { OFF } from "../eslint.constants.mjs";

const ESLINT_PLUGINS_CONFIG = {
  name: "plugins",
  files: ["app/plugins/**/*.ts"],
  rules: { "import/no-default-export": OFF },
};

export { ESLINT_PLUGINS_CONFIG };