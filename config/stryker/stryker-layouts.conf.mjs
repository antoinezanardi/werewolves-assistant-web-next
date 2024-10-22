import defaultConfig from "./stryker.conf.mjs";

export default {
  ...defaultConfig,
  incrementalFile: "tests/stryker/incremental/layouts-incremental.json",
  mutate: ["app/layouts/**/*.vue"],
  vitest: { configFile: "config/vitest/vitest.layouts-unit-tests-config.ts" },
};