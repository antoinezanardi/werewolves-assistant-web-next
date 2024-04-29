import { ESLINT_TYPESCRIPT_CONFIG } from "./config/eslint/flat-configs/eslint.typescript-config.mjs";
import { ESLINT_TESTS_CONFIG } from "./config/eslint/flat-configs/eslint.tests-config.mjs";
import { ESLINT_STYLISTIC_CONFIG } from "./config/eslint/flat-configs/eslint.stylistic-config.mjs";
import { ESLINT_CONFIG_FILES_CONFIG } from "./config/eslint/flat-configs/eslint.config-files-config.mjs";
import { ESLINT_VUE_CONFIG } from "./config/eslint/flat-configs/eslint.vue-config.mjs";
import { ESLINT_CUCUMBER_CONFIG } from "./config/eslint/flat-configs/eslint.cucumber-config.mjs";
import { ESLINT_STORES_CONFIG } from "./config/eslint/flat-configs/eslint.stores-config.mjs";
import { ESLINT_TESTS_FACTORIES_CONFIG } from "./config/eslint/flat-configs/eslint.tests-factories-config.mjs";
import { ESLINT_LAYOUTS_CONFIG } from "./config/eslint/flat-configs/eslint.layouts-config.mjs";
import { ESLINT_PAGES_CONFIG } from "./config/eslint/flat-configs/eslint.pages-config.mjs";
import { ESLINT_TESTS_SETUP_CONFIG } from "./config/eslint/flat-configs/eslint.tests-setup-config.mjs";
import { ESLINT_CLASSES_CONFIG } from "./config/eslint/flat-configs/eslint.classes-config.mjs";
import { ESLINT_COMPOSABLES_CONFIG } from "./config/eslint/flat-configs/eslint.composables-config.mjs";
import { ESLINT_MODULES_CONFIG } from "./config/eslint/flat-configs/eslint.modules-config.mjs";
import { ESLINT_GLOBAL_CONFIG } from "./config/eslint/flat-configs/eslint.global-config.mjs";
import { ESLINT_IGNORES } from "./config/eslint/eslint.constants.mjs";

export default [
  {
    name: "global-ignores",
    ignores: ESLINT_IGNORES,
  },
  ESLINT_GLOBAL_CONFIG,
  ESLINT_TYPESCRIPT_CONFIG,
  ESLINT_VUE_CONFIG,
  ESLINT_COMPOSABLES_CONFIG,
  ESLINT_PAGES_CONFIG,
  ESLINT_LAYOUTS_CONFIG,
  ESLINT_TESTS_CONFIG,
  ESLINT_TESTS_SETUP_CONFIG,
  ESLINT_TESTS_FACTORIES_CONFIG,
  ESLINT_CUCUMBER_CONFIG,
  ESLINT_STYLISTIC_CONFIG,
  ESLINT_CONFIG_FILES_CONFIG,
  ESLINT_STORES_CONFIG,
  ESLINT_CLASSES_CONFIG,
  ESLINT_MODULES_CONFIG,
];