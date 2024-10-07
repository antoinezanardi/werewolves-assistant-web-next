import { OFF } from "../eslint.constants.mjs";

const ESLINT_DECLARATIONS_CONFIG = {
  name: "declarations",
  files: ["app/**/*.d.ts"],
  rules: { "import/unambiguous": OFF },
};

export { ESLINT_DECLARATIONS_CONFIG };