import { useLocalStorage } from "@vueuse/core";
import { defineStore, skipHydrate } from "pinia";

import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { DEFAULT_AUDIO_SETTINGS } from "~/stores/audio/constants/audio.constants";
import type { AudioSettings } from "~/stores/audio/types/audio.types";
import { StoreIds } from "~/stores/enums/store.enum";
import { LocalStorageKeys } from "~/utils/enums/local-storage.enums";

const useLocalStorageStore = defineStore(StoreIds.LOCAL_STORAGE, () => {
  const createGameOptionsDtoFromLocalStorage = useLocalStorage(LocalStorageKeys.GAME_OPTIONS, DEFAULT_GAME_OPTIONS, {
    mergeDefaults: true,
  });

  const audioSettingsFromLocalStorage = useLocalStorage<AudioSettings>(LocalStorageKeys.AUDIO_SETTINGS, DEFAULT_AUDIO_SETTINGS, {
    mergeDefaults: true,
  });

  return {
    createGameOptionsDtoFromLocalStorage: skipHydrate(createGameOptionsDtoFromLocalStorage),
    audioSettingsFromLocalStorage: skipHydrate(audioSettingsFromLocalStorage),
  };
});

export { useLocalStorageStore };