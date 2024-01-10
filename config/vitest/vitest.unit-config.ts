import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    watch: false,
    include: ["./tests/unit/**/*.spec.ts"],
    exclude: [
      "nuxt.config.ts",
      "node_modules/**",
      "config/**/*.ts",
    ],
    coverage: {
      exclude: [
        "tests/**/*",
        "node_modules/**/*",
        "config/**/*",
      ],
      include: [
        "app.vue",
        "components/**/*.[vue|ts]",
        "composables/**/*.ts",
      ],
      reportsDirectory: "./tests/unit/coverage",
      reporter: ["clover", "json", "lcov", "text", "text-summary"],
      all: true,
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
    globals: true,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
  },
});