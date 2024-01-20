import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { beforeAll, expect } from "vitest";
import matchers from "jest-extended";

import { createFakeI18n } from "~/tests/unit/utils/factories/composables/i18n/useI18n.factory";
import { createFakeRuntimeConfig } from "~/tests/unit/utils/factories/composables/nuxt/useRuntimeConfig.factory";

expect.extend(matchers);

declare module "vitest" {
  type Assertion<T = unknown> = CustomMatchers<T>;

  type AsymmetricMatchersContaining<T = unknown> = CustomMatchers<T>;

  type ExpectStatic<T = unknown> = CustomMatchers<T>;
}
beforeAll(() => {
  mockNuxtImport<typeof setPageLayout>(
    "setPageLayout",
    () => vi.fn(),
  );

  mockNuxtImport<typeof definePageMeta>(
    "definePageMeta",
    () => vi.fn(),
  );

  mockNuxtImport<typeof useFetch>(
    "useFetch",
    () => vi.fn(),
  );

  mockNuxtImport<typeof navigateTo>(
    "navigateTo",
    () => vi.fn(),
  );

  mockNuxtImport<typeof useRuntimeConfig>(
    "useRuntimeConfig",
    () => vi.fn(() => createFakeRuntimeConfig()),
  );

  mockNuxtImport<typeof createError>(
    "createError",
    <DataT>() => (vi.fn(() => new Error("Mocked error")) as DataT),
  );

  mockNuxtImport<() => ReturnType<typeof createFakeI18n>>(
    "useI18n",
  () => vi.fn(() => createFakeI18n()),
  );
});