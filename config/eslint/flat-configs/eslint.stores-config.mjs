import { ERROR, NAMING_CONVENTION_DEFAULT_CONFIG, OFF } from "../eslint.constants.mjs";

const ESLINT_STORES_CONFIG = {
  name: "stores",
  files: ["stores/**/use*Store.ts"],
  rules: {
    "max-lines-per-function": OFF,
    "@typescript-eslint/naming-convention": [
      ERROR,
      {
        selector: ["variable"],
        modifiers: ["exported"],
        format: ["camelCase"],
      },
      ...NAMING_CONVENTION_DEFAULT_CONFIG,
    ],
  },
};

export { ESLINT_STORES_CONFIG };