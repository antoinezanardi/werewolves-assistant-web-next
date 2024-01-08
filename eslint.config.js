import path from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

import { ESLINT_BASE_CONFIG } from "./config/eslint/config/eslint.base-config.js";
import { ESLINT_TYPESCRIPT_CONFIG } from "./config/eslint/config/eslint.typescript-config.js";
import { ESLINT_TESTS_CONFIG } from "./config/eslint/config/eslint.tests-config.js";
import { ESLINT_STYLISTIC_CONFIG } from "./config/eslint/config/eslint.stylistic-config.js";
import { ESLINT_IMPORT_CONFIG } from "./config/eslint/config/eslint.import-config.js";
import { ESLINT_CONFIG_FILES_CONFIG } from "./config/eslint/config/eslint.config-files-config.js";
import { ESLINT_VUE_CONFIG } from "./config/eslint/config/eslint.vue-config.js";

const baseDirectory = path.dirname(fileURLToPath(import.meta.url));
const flatCompat = new FlatCompat({ baseDirectory });

export default [
  {
    ignores: [
      ".output/",
      ".nuxt/",
      "node_modules/",
      "public/",
    ],
  },
  ...flatCompat.plugins("import", "vue"),
  ...flatCompat.extends("plugin:vue/vue3-recommended"),
  ESLINT_BASE_CONFIG,
  ESLINT_TYPESCRIPT_CONFIG,
  ESLINT_IMPORT_CONFIG,
  ESLINT_VUE_CONFIG,
  ESLINT_TESTS_CONFIG,
  ESLINT_STYLISTIC_CONFIG,
  ESLINT_CONFIG_FILES_CONFIG,
];