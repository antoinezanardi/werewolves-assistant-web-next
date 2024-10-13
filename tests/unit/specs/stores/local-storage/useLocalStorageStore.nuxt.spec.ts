import { createPinia, setActivePinia } from "pinia";
import { vi } from "vitest";
import type * as VueUse from "@vueuse/core";

import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useLocalStorageStore } from "~/stores/local-storage/useLocalStorageStore";
import { LocalStorageKeys } from "~/utils/enums/local-storage.enums";

const hoistedMocks = vi.hoisted(() => ({
  useLocalStorage: vi.fn(() => ({})),
}));

vi.mock("@vueuse/core", async importOriginal => ({
  ...await importOriginal<typeof VueUse>(),
  useLocalStorage: hoistedMocks.useLocalStorage,
}));

describe("Use Local Storage Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should call useLocalStorage with for stored game options when created.", () => {
    useLocalStorageStore();

    expect(hoistedMocks.useLocalStorage).toHaveBeenCalledWith(LocalStorageKeys.GAME_OPTIONS, DEFAULT_GAME_OPTIONS, { mergeDefaults: true });
  });

  it("should call useLocalStorage with for stored audio settings when created.", () => {
    useLocalStorageStore();

    expect(hoistedMocks.useLocalStorage).toHaveBeenCalledWith(LocalStorageKeys.AUDIO_SETTINGS, expect.any(Object), { mergeDefaults: true });
  });
});