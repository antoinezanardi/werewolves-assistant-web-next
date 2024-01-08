import {READONLY} from "../eslint.constants.js";

const ESLINT_TEST_CONFIG = {
  files: ["tests/**/*spec.ts"],
  languageOptions: {
    globals: {
      describe: READONLY,
      it: READONLY,
      expect: READONLY,
    },
  },
}

export { ESLINT_TEST_CONFIG };