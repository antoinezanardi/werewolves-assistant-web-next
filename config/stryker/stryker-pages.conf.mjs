import defaultConfig from "./stryker.conf.mjs";

export default {
  ...defaultConfig,
  incrementalFile: "tests/stryker/incremental/pages-incremental.json",
  mutate: [
    "app/pages/**/*.vue",
    "app/app.vue",
    "app/error.vue",
    "!app/pages/**/*.constants.ts",
  ],
  vitest: { configFile: "config/vitest/vitest.pages-unit-tests-config.ts" },
};