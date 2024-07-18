import { OFF } from "../eslint.constants.mjs";

const ESLINT_TYPESCRIPT_DECLARATION_CONFIG = Object.freeze({
  name: "typescript-declaration",
  files: ["**/*.d.ts"],
  rules: {
    "@typescript-eslint/naming-convention": OFF,
  },
});

export { ESLINT_TYPESCRIPT_DECLARATION_CONFIG };