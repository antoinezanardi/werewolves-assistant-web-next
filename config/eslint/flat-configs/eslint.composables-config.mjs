import { OFF } from "../eslint.constants.mjs";

const ESLINT_COMPOSABLES_CONFIG = {
  name: "composables",
  files: ["app/composables/**/*.ts"],
  rules: { "max-lines-per-function": OFF },
};

export { ESLINT_COMPOSABLES_CONFIG };