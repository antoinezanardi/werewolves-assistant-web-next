import { mockNuxtImport } from "@nuxt/test-utils/runtime";

import { createFakeI18n } from "~/tests/unit/utils/factories/composables/i18n/useI18n.factory";
import { createFakeUseRoute } from "~/tests/unit/utils/factories/composables/nuxt/useRoute.factory";
import { createFakeRuntimeConfig } from "~/tests/unit/utils/factories/composables/nuxt/useRuntimeConfig.factory";

function mockNuxtImports(): void {
  mockNuxtImport<typeof definePageMeta>("definePageMeta", () => vi.fn());

  mockNuxtImport<typeof navigateTo>("navigateTo", () => vi.fn());

  mockNuxtImport<typeof useRoute>("useRoute", () => vi.fn(() => createFakeUseRoute()));

  mockNuxtImport<typeof useRuntimeConfig>("useRuntimeConfig", () => vi.fn(() => createFakeRuntimeConfig()));

  mockNuxtImport<typeof createError>("createError", <DataT>() => (vi.fn(() => new Error("Mocked error")) as DataT));

  mockNuxtImport<() => ReturnType<typeof createFakeI18n>>("useI18n", () => vi.fn(() => createFakeI18n()));
}

function mockPrimeVueComposables(): void {
  vi.mock("primevue/usetoast", () => ({ useToast: () => ({ add: vi.fn() }) }));
}

export {
  mockNuxtImports,
  mockPrimeVueComposables,
};