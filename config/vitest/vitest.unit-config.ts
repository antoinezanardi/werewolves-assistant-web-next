import { fileURLToPath } from "node:url";

import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    environmentOptions: { nuxt: { rootDir: fileURLToPath(new URL("../../", import.meta.url)) } },
    setupFiles: ["./tests/unit/unit-setup.ts"],
    watch: false,
    include: ["./tests/unit/**/*.spec.ts"],
    coverage: {
      provider: "istanbul",
      exclude: [
        "nuxt.config.ts",
        "tests/**/*",
        "node_modules/**/*",
        "config/**/*",
        "plugins/**/*",
        "**/*.types.ts",
      ],
      include: [
        "app.vue",
        "pages/**/*.{vue,ts}",
        "layouts/**/*.{vue,ts}",
        "components/**/*.{vue,ts}",
        "composables/**/*.ts",
        "stores/**/*.ts",
        "utils/**/*.ts",
      ],
      reportsDirectory: "./tests/unit/coverage",
      reporter: [
        "clover",
        "json",
        "lcov",
        "text",
        "text-summary",
        "html",
      ],
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