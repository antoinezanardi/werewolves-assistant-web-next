import { OFF } from "../eslint.constants.mjs";

const ESLINT_LAYOUTS_CONFIG = {
  files: ["layouts/**/*.vue"],
  rules: { "vue/multi-word-component-names": OFF },
};

export { ESLINT_LAYOUTS_CONFIG };