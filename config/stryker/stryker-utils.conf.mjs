import defaultConfig from "./stryker.conf.mjs";

export default {
  ...defaultConfig,
  ignorers: [],
  incrementalFile: "tests/stryker/incremental/utils-incremental.json",
  mutate: [
    "app/utils/**/*.ts",
    "!app/utils/**/*.constants.ts",
  ],
  plugins: [
    "@stryker-mutator/vitest-runner",
    "@stryker-mutator/typescript-checker",
  ],
  vitest: { configFile: "config/vitest/vitest.utils-unit-tests-config.ts" },
};