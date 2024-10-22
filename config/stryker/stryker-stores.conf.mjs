import defaultConfig from "./stryker.conf.mjs";

export default {
  ...defaultConfig,
  ignorers: [],
  incrementalFile: "tests/stryker/incremental/stores-incremental.json",
  mutate: [
    "app/stores/**/*.ts",
    "!app/stores/**/*.constants.ts",
  ],
  plugins: [
    "@stryker-mutator/vitest-runner",
    "@stryker-mutator/typescript-checker",
  ],
  vitest: { configFile: "config/vitest/vitest.stores-unit-tests-config.ts" },
};