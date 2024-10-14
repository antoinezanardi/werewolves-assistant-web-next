import type UseToast from "primevue/usetoast";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { Mock } from "vitest";
import type { Store, StoreDefinition } from "pinia";

import { createFakeUseElementHover } from "@tests/unit/utils/factories/composables/vue-use/useElementHover.factory";
import { createFakeUseMagicKeys } from "@tests/unit/utils/factories/composables/vue-use/useMagicKeys.factory";
import { createFakeUseRouter } from "@tests/unit/utils/factories/composables/nuxt/useRouter.factory";
import { createFakeI18n } from "@tests/unit/utils/factories/composables/i18n/useI18n.factory";
import { createFakeUseRoute } from "@tests/unit/utils/factories/composables/nuxt/useRoute.factory";
import { createFakeUseScroll } from "@tests/unit/utils/factories/composables/vue-use/useScroll.factory";

function mockNuxtImports(): void {
  mockNuxtImport<typeof definePageMeta>("definePageMeta", () => vi.fn());

  mockNuxtImport<typeof navigateTo>("navigateTo", () => vi.fn());

  mockNuxtImport<typeof useRoute>("useRoute", () => vi.fn(() => createFakeUseRoute()));

  mockNuxtImport<() => ReturnType<typeof createFakeUseRouter>>("useRouter", () => vi.fn(() => createFakeUseRouter()));

  mockNuxtImport<typeof useHead>("useHead", () => vi.fn());

  mockNuxtImport("createError", () => vi.fn(() => new Error("Mocked error")));

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
    [K in keyof Actions]: Mock
  }>
  : ReturnType<TStoreDef> {
  return useStore() as never;
}

function mockPrimeVueComposables(): void {
  vi.mock("primevue/usetoast", async importOriginal => ({
    ...await importOriginal<typeof UseToast>(),
    useToast: (): { add: Mock } => ({ add: vi.fn() }),
  }));
}

export {
  mockNuxtImports,
  mockPiniaStore,
  mockPrimeVueComposables,
};