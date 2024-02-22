import { ERROR, NAMING_CONVENTION_DEFAULT_CONFIG } from "../eslint.constants.mjs";

const ESLINT_STORES_CONFIG = {
  files: ["stores/**/use*Store.ts"],
  rules: {
    "max-lines-per-function": [ERROR, { max: 50 }],
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