import { Howl, Howler } from "howler";
import { draw } from "radash";
import { defineStore } from "pinia";
import type { GamePhaseName } from "~/composables/api/game/types/game-phase/game-phase.types";
import { BACKGROUND_AUDIO_NAMES, SOUND_EFFECT_NAMES } from "~/stores/audio/constants/audio.constants";
import type { BackgroundAudioName, SoundEffectName } from "~/stores/audio/types/audio.types";
import { StoreIds } from "~/stores/enums/store.enum";

const useAudioStore = defineStore(StoreIds.AUDIO, () => {
  const isMuted = ref<boolean>(false);

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

  function toggleMute(): void {
    isMuted.value = !isMuted.value;
    Howler.mute(isMuted.value);
  }
  return {
    isMuted,
    soundEffects,
    backgroundAudios,
    playingBackgroundAudioName,
    nightBackgroundAudioNames,
    dayBackgroundAudioNames,
    loadSoundEffects,
    loadBackgroundAudios,
    loadAllAudios,
    playSoundEffect,
    fadeOutPlayingBackgroundAudio,
    playBackgroundAudio,
    playRandomGamePhaseBackgroundAudio,
    toggleMute,
  };
});

export { useAudioStore };