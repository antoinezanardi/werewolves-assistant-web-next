import defaultConfig from "./stryker.conf.mjs";

export default {
  ...defaultConfig,
  incrementalFile: "tests/stryker/incremental/components-incremental.json",
  mutate: [
    "app/components/**/*.vue",
    "!app/components/**/*.constants.ts",
  ],
  vitest: { configFile: "config/vitest/vitest.components-unit-tests-config.ts" },
};