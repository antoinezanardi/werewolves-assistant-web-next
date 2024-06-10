import { createPinia, setActivePinia } from "pinia";
import { Howl } from "howler";
import { useAudioStore } from "~/stores/audio/useAudioStore";

vi.mock("howler");

describe("Use Audio Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("Initial State", () => {
    it("should create sound effects and background audios when created.", () => {
      useAudioStore();

      expect(Howl).toHaveBeenCalledTimes(35);
      expect(Howl).toHaveBeenNthCalledWith(1, {
        preload: false,
        src: ["audio/sound-effects/angelic-intervention.webm"],
      });
      expect(Howl).toHaveBeenNthCalledWith(2, {
        preload: false,
        src: ["audio/sound-effects/bear-growling.webm"],
      });
      expect(Howl).toHaveBeenNthCalledWith(34, {
        preload: false,
        src: [`audio/audio-backgrounds/night-2.webm`],
        loop: true,
      });
      expect(Howl).toHaveBeenNthCalledWith(35, {
        preload: false,
        src: [`audio/audio-backgrounds/night-3.webm`],
        loop: true,
      });
    });
  });

  describe("loadSoundEffects", () => {
    it("should load all sound effects when called.", () => {
      const { soundEffects, loadSoundEffects } = useAudioStore();
      loadSoundEffects();

      for (const soundEffect of Object.values(soundEffects)) {
        expect(soundEffect.load).toHaveBeenCalledExactlyOnceWith();
      }
    });
  });

  describe("loadBackgroundAudios", () => {
    it("should load all background audios when called.", () => {
      const { backgroundAudios, loadBackgroundAudios } = useAudioStore();
      loadBackgroundAudios();

      for (const backgroundAudio of Object.values(backgroundAudios)) {
        expect(backgroundAudio.load).toHaveBeenCalledExactlyOnceWith();
      }
    });
  });

  describe("playSoundEffect", () => {
    it("should play the sound effect when called.", () => {
      const { soundEffects, playSoundEffect } = useAudioStore();
      const soundEffectName = "angelic-intervention";
      playSoundEffect(soundEffectName);

      expect(soundEffects[soundEffectName].play).toHaveBeenCalledExactlyOnceWith();
    });
  });

  describe("playBackgroundAudio", () => {
    it("should play the background audio when called.", () => {
      const { backgroundAudios, playBackgroundAudio } = useAudioStore();
      const backgroundAudioName = "night-1";
      playBackgroundAudio(backgroundAudioName);

      expect(backgroundAudios[backgroundAudioName].play).toHaveBeenCalledExactlyOnceWith();
    });
  });
});