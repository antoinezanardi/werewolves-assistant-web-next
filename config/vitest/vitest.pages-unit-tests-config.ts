import { defineVitestConfig } from "@nuxt/test-utils/config";

import { VITEST_GLOBAL_UNIT_TESTS_CONFIG } from "./vitest.unit-tests-config.constants";

export default defineVitestConfig({
  ...VITEST_GLOBAL_UNIT_TESTS_CONFIG,
  test: {
    ...VITEST_GLOBAL_UNIT_TESTS_CONFIG?.test,
    include: [
      "./tests/unit/specs/pages/**/*.spec.ts",
      "./tests/unit/specs/app.nuxt.spec.ts",
      "./tests/unit/specs/error.nuxt.spec.ts",
    ],
  },
});