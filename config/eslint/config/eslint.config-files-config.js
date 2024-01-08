import { OFF } from "../eslint.constants.js";

const ESLINT_CONFIG_FILES_CONFIG = {
  files: [
    ".releaserc.js",
    "eslint.config.js",
    "nuxt.config.ts",
    "config/**/*.{js,ts}",
  ],
  rules: {
    "import/no-default-export": OFF,
    "import/no-relative-parent-imports": OFF,
    "import/no-internal-modules": OFF,
    "import/no-anonymous-default-export": OFF,
  },
};

export { ESLINT_CONFIG_FILES_CONFIG };