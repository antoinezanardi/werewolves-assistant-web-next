import { OFF } from "../eslint.constants.mjs";

const ESLINT_CONFIG_FILES_CONFIG = {
  files: [
    ".releaserc.js",
    "eslint.config.mjs",
    "nuxt.config.ts",
    "config/**/*.{js,mjs,ts}",
  ],
  languageOptions: { globals: { process: true } },
  rules: {
    "import/no-default-export": OFF,
    "import/no-relative-parent-imports": OFF,
    "import/no-internal-modules": OFF,
    "import/no-anonymous-default-export": OFF,
  },
};

export { ESLINT_CONFIG_FILES_CONFIG };