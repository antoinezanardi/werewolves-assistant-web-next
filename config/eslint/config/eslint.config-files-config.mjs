import { OFF, READONLY } from "../eslint.constants.mjs";

const ESLINT_CONFIG_FILES_CONFIG = {
  files: [
    ".releaserc.js",
    "eslint.config.js",
    "nuxt.config.ts",
    "config/**/*.{js,mjs,ts}",
    "modules/**/*.config.{js,mjs,ts}",
  ],
  languageOptions: {
    globals: {
      process: READONLY,
      defineNuxtConfig: READONLY,
      defineI18nConfig: READONLY,
    },
  },
  rules: {
    "import/no-default-export": OFF,
    "import/no-relative-parent-imports": OFF,
    "import/no-internal-modules": OFF,
    "import/no-anonymous-default-export": OFF,
  },
};

export { ESLINT_CONFIG_FILES_CONFIG };