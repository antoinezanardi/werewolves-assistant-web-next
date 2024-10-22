import defaultConfig from "./stryker.conf.mjs";

export default {
  ...defaultConfig,
  ignorers: [],
  incrementalFile: "tests/stryker/incremental/composables-incremental.json",
  mutate: ["app/composables/**/*.ts"],
  plugins: [
    "@stryker-mutator/vitest-runner",
    "@stryker-mutator/typescript-checker",
  ],
  vitest: { configFile: "config/vitest/vitest.composables-unit-tests-config.ts" },
};