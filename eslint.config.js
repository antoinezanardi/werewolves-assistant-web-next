import { ESLINT_BASE_CONFIG } from "./config/eslint/config/eslint.base-config.js";
import { ESLINT_TYPESCRIPT_CONFIG } from "./config/eslint/config/eslint.typescript-config.js";
import { ESLINT_TEST_CONFIG } from "./config/eslint/config/eslint.test-config.js";
import { ESLINT_STYLISTIC_CONFIG } from "./config/eslint/config/eslint.stylistic-config.js";

export default [
  {
    ignores: [
      ".output/",
      ".nuxt/",
      "node_modules/",
      "public/",
    ],
  },
  ESLINT_BASE_CONFIG,
  ESLINT_TYPESCRIPT_CONFIG,
  ESLINT_TEST_CONFIG,
  ESLINT_STYLISTIC_CONFIG,
];