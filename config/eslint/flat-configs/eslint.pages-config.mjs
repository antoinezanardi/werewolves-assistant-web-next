import { OFF } from "../eslint.constants.mjs";

const ESLINT_PAGES_CONFIG = {
  name: "pages",
  files: ["pages/**/*.vue"],
  rules: { "vue/multi-word-component-names": OFF },
};

export { ESLINT_PAGES_CONFIG };