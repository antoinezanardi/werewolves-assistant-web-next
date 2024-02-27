import { OFF, READONLY } from "../eslint.constants.mjs";

const ESLINT_CONFIG_FILES_CONFIG = {
  files: [
    ".releaserc.js",
    "eslint.config.js",
    "nuxt.config.ts",
    "config/**/*.{js,mjs,ts}",
    "modules/**/*.config.{js,mjs,ts}",
    "tests/unit/unit-setup.ts",
  ],
  languageOptions: { globals: { CustomMatchers: READONLY } },
  rules: {
    "@typescript-eslint/no-restricted-imports": OFF,
    "import/no-default-export": OFF,
    "import/no-internal-modules": OFF,
    "import/no-anonymous-default-export": OFF,
  },
};

export { ESLINT_CONFIG_FILES_CONFIG };