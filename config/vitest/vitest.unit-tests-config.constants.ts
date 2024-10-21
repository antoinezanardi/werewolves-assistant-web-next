import { fileURLToPath } from "node:url";

import type { defineVitestConfig } from "@nuxt/test-utils/config";

const VITEST_GLOBAL_UNIT_TESTS_CONFIG: Parameters<typeof defineVitestConfig>[0] = {
  test: {
    pool: "threads",
    root: fileURLToPath(new URL("../../", import.meta.url)),
    environment: "nuxt",
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL("../../", import.meta.url)),
        overrides: {
          runtimeConfig: {
            public: {
              defaultLocale: "en",
              werewolvesAssistantApi: { baseUrl: "http://127.0.0.1" },
              contactEmail: "john@doe.com",
            },
          },
        },
      },
    },
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
        "app/plugins/**/*",
        "**/*.types.ts",
        "**/*.constants.ts",
      ],
      include: [
        "app/*.vue",
        "app/**/*.{vue,ts}",
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
};

export { VITEST_GLOBAL_UNIT_TESTS_CONFIG };