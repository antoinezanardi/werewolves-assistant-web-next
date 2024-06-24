import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { createFakeUseElementHover } from "@tests/unit/utils/factories/composables/vue-use/useElementHover.factory";
import { createFakeUseMagicKeys } from "@tests/unit/utils/factories/composables/vue-use/useMagicKeys.factory";
import type { Mock } from "vitest";
import type { Store, StoreDefinition } from "pinia";

import { createFakeI18n } from "@tests/unit/utils/factories/composables/i18n/useI18n.factory";
import { createFakeUseRoute } from "@tests/unit/utils/factories/composables/nuxt/useRoute.factory";
import { createFakeRuntimeConfig } from "@tests/unit/utils/factories/composables/nuxt/useRuntimeConfig.factory";
import { createFakeUseScroll } from "@tests/unit/utils/factories/composables/vue-use/useScroll.factory";

function mockNuxtImports(): void {
  mockNuxtImport<typeof definePageMeta>("definePageMeta", () => vi.fn());

  mockNuxtImport<typeof navigateTo>("navigateTo", () => vi.fn());

  mockNuxtImport<typeof useRoute>("useRoute", () => vi.fn(() => createFakeUseRoute()));

  mockNuxtImport<typeof useRuntimeConfig>("useRuntimeConfig", () => vi.fn(() => createFakeRuntimeConfig()));

  mockNuxtImport<typeof useHead>("useHead", () => vi.fn());

  mockNuxtImport<typeof createError>("createError", <DataT>() => (vi.fn(() => new Error("Mocked error")) as DataT));

  mockNuxtImport<() => ReturnType<typeof createFakeI18n>>("useI18n", () => vi.fn(() => createFakeI18n()));

  mockNuxtImport<typeof useScroll>("useScroll", () => vi.fn(() => createFakeUseScroll()));

  mockNuxtImport<() => ReturnType<typeof createFakeUseMagicKeys>>("useMagicKeys", () => vi.fn(() => createFakeUseMagicKeys()));

  mockNuxtImport<typeof useElementHover>("useElementHover", () => vi.fn(() => createFakeUseElementHover()));
}

function mockPiniaStore<TStoreDef extends () => unknown>(useStore: TStoreDef): TStoreDef extends StoreDefinition<
  infer Id,
  infer State,
  infer Getters,
  infer Actions
>
  ? Store<Id, State, Getters, {
    [K in keyof Actions]: Actions[K] extends (...args: infer Args) =>
    infer ReturnT ? Mock<Args, ReturnT> : Actions[K]
  }>
  : ReturnType<TStoreDef> {
  return useStore() as never;
}

function mockPrimeVueComposables(): void {
  vi.mock("primevue/usetoast", () => ({ useToast: (): { add: Mock } => ({ add: vi.fn() }) }));
}

export {
  mockNuxtImports,
  mockPiniaStore,
  mockPrimeVueComposables,
};