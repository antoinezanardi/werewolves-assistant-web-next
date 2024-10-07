import { useLocalStorage } from "@vueuse/core";
import { Howl, Howler } from "howler";
import { draw } from "radash";
import { defineStore } from "pinia";

import type { GamePhaseName } from "~/composables/api/game/types/game-phase/game-phase.types";
import { BACKGROUND_AUDIO_NAMES, DEFAULT_AUDIO_SETTINGS, SOUND_EFFECT_NAMES } from "~/stores/audio/constants/audio.constants";
import type { AudioSettings, BackgroundAudioName, SoundEffectName } from "~/stores/audio/types/audio.types";
import { StoreIds } from "~/stores/enums/store.enum";
import { LocalStorageKeys } from "~/utils/enums/local-storage.enums";

const useAudioStore = defineStore(StoreIds.AUDIO, () => {
  const audioSettingsFromLocalStorage = useLocalStorage<AudioSettings>(LocalStorageKeys.AUDIO_SETTINGS, DEFAULT_AUDIO_SETTINGS, { mergeDefaults: true });

  const isMuted = ref<boolean>(audioSettingsFromLocalStorage.value.isMuted);

  const soundEffects = Object.fromEntries(SOUND_EFFECT_NAMES.map(name => [name, createSoundEffect(name)])) as Record<SoundEffectName, Howl>;

  const backgroundAudios = Object.fromEntries(BACKGROUND_AUDIO_NAMES.map(name => [name, createBackgroundAudio(name)])) as Record<BackgroundAudioName, Howl>;

  const playingBackgroundAudioName = ref<BackgroundAudioName>();

  const nightBackgroundAudioNames = Object.keys(backgroundAudios).filter((name): name is BackgroundAudioName => name.startsWith("night-"));

  const dayBackgroundAudioNames = Object.keys(backgroundAudios).filter((name): name is BackgroundAudioName => name.startsWith("day-"));

  function createSoundEffect(src: SoundEffectName): Howl {
    return new Howl({
      preload: false,
      src: [`/audio/sound-effects/${src}.webm`],
    });
  }

  function createBackgroundAudio(src: BackgroundAudioName): Howl {
    return new Howl({
      preload: false,
      src: [`/audio/audio-backgrounds/${src}.webm`],
      loop: true,
    });
  }

  function setHowlerAudioSettingsFromAudioStoreState(): void {
    Howler.mute(isMuted.value);
  }

  function loadSoundEffects(): void {
    Object.values(soundEffects).forEach(soundEffect => soundEffect.load());
  }

  function loadBackgroundAudios(): void {
    Object.values(backgroundAudios).forEach(backgroundAudio => backgroundAudio.load());
  }

  function loadAllAudios(): void {
    loadBackgroundAudios();
    loadSoundEffects();
  }

  function playSoundEffect(soundEffectName: SoundEffectName): void {
    soundEffects[soundEffectName].play();
  }

  function fadeOutPlayingBackgroundAudio(): void {
    if (!playingBackgroundAudioName.value) {
      return;
    }
    const fadeOutDuration = 1000;
    const playingBackgroundAudio = backgroundAudios[playingBackgroundAudioName.value];
    playingBackgroundAudio.fade(1, 0, fadeOutDuration);
    playingBackgroundAudioName.value = undefined;
    setTimeout(() => playingBackgroundAudio.stop(), fadeOutDuration);
  }

  function playBackgroundAudio(backgroundAudioName: BackgroundAudioName): void {
    const fadeInDuration = 1000;
    backgroundAudios[backgroundAudioName].fade(0, 1, fadeInDuration);
    backgroundAudios[backgroundAudioName].play();
    playingBackgroundAudioName.value = backgroundAudioName;
  }

  function playRandomGamePhaseBackgroundAudio(gamePhase: GamePhaseName): void {
    const backgroundAudioNames = gamePhase === "night" ? nightBackgroundAudioNames : dayBackgroundAudioNames;
    if (playingBackgroundAudioName.value && backgroundAudioNames.includes(playingBackgroundAudioName.value)) {
      return;
    }
    const randomGamePhaseBackgroundAudioName = draw(backgroundAudioNames);
    if (!randomGamePhaseBackgroundAudioName) {
      return;
    }
    fadeOutPlayingBackgroundAudio();
    playBackgroundAudio(randomGamePhaseBackgroundAudioName);
  }

  function setMute(isAudioMuted: boolean): void {
    isMuted.value = isAudioMuted;
    Howler.mute(isAudioMuted);
    audioSettingsFromLocalStorage.value.isMuted = isAudioMuted;
  }

  function toggleMute(): void {
    setMute(!isMuted.value);
  }
  return {
    audioSettingsFromLocalStorage,
    isMuted,
    soundEffects,
    backgroundAudios,
    playingBackgroundAudioName,
    nightBackgroundAudioNames,
    dayBackgroundAudioNames,
    setHowlerAudioSettingsFromAudioStoreState,
    loadSoundEffects,
    loadBackgroundAudios,
    loadAllAudios,
    playSoundEffect,
    fadeOutPlayingBackgroundAudio,
    playBackgroundAudio,
    playRandomGamePhaseBackgroundAudio,
    setMute,
    toggleMute,
  };
});

export { useAudioStore };