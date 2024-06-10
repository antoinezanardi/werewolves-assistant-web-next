import { Howl } from "howler";
import { defineStore } from "pinia";
import { BACKGROUND_AUDIO_NAMES, SOUND_EFFECT_NAMES } from "~/stores/audio/constants/audio.constants";
import type { BackgroundAudioName, SoundEffectName } from "~/stores/audio/types/audio.types";
import { StoreIds } from "~/stores/enums/store.enum";

const useAudioStore = defineStore(StoreIds.AUDIO, () => {
  const soundEffects = Object.fromEntries(SOUND_EFFECT_NAMES.map(name => [name, createSoundEffect(name)])) as Record<SoundEffectName, Howl>;

  const backgroundAudios = Object.fromEntries(BACKGROUND_AUDIO_NAMES.map(name => [name, createBackgroundAudio(name)])) as Record<BackgroundAudioName, Howl>;

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
      html5: true,
    });
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

  function playBackgroundAudio(backgroundAudioName: BackgroundAudioName): void {
    backgroundAudios[backgroundAudioName].play();
  }
  return {
    soundEffects,
    backgroundAudios,
    loadSoundEffects,
    loadBackgroundAudios,
    loadAllAudios,
    playSoundEffect,
    playBackgroundAudio,
  };
});

export { useAudioStore };