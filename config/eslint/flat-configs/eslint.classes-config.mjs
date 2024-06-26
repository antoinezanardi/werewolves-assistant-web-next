import { ERROR } from "../eslint.constants.mjs";

const ESLINT_CLASSES_CONFIG = {
  name: "classes",
  files: [
    "**/*.class.ts",
    "**/*.dto.ts",
  ],
  rules: { "new-cap": [ERROR, { capIsNewExceptions: ["Type", "Expose"] }] },
};

export { ESLINT_CLASSES_CONFIG };