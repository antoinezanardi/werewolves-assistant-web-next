import { createPinia, setActivePinia } from "pinia";
import { Howl } from "howler";
import type Radash from "radash";
import { vi } from "vitest";
import { useAudioStore } from "~/stores/audio/useAudioStore";

const hoistedMocks = vi.hoisted(() => ({ radash: { draw: vi.fn() } }));

vi.mock("howler");
vi.mock("radash", async importOriginal => ({
  ...await importOriginal<typeof Radash>(),
  ...hoistedMocks.radash,
}));

describe("Use Audio Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("Initial State", () => {
    it("should create sound effects and background audios when created.", () => {
      useAudioStore();

      expect(Howl).toHaveBeenCalledTimes(48);
      expect(Howl).toHaveBeenNthCalledWith(1, {
        preload: false,
        src: ["/audio/sound-effects/actor-clear-throat-and-knocks.webm"],
      });
      expect(Howl).toHaveBeenNthCalledWith(2, {
        preload: false,
        src: ["/audio/sound-effects/angelic-intervention.webm"],
      });
      expect(Howl).toHaveBeenNthCalledWith(47, {
        preload: false,
        src: [`/audio/audio-backgrounds/night-2.webm`],
        loop: true,
      });
      expect(Howl).toHaveBeenNthCalledWith(48, {
        preload: false,
        src: [`/audio/audio-backgrounds/night-3.webm`],
        loop: true,
      });
    });

    it("should set playing background audio name to undefined when created.", () => {
      const { playingBackgroundAudioName } = useAudioStore();

      expect(playingBackgroundAudioName).toBeUndefined();
    });

    it("should set night background audio names when created.", () => {
      const { nightBackgroundAudioNames } = useAudioStore();

      expect(nightBackgroundAudioNames).toStrictEqual<string[]>(["night-1", "night-2", "night-3"]);
    });

    it("should set day background audio names when created.", () => {
      const { dayBackgroundAudioNames } = useAudioStore();

      expect(dayBackgroundAudioNames).toStrictEqual<string[]>(["day-1", "day-2"]);
    });

    it("should not be muted when created.", () => {
      const { isMuted } = useAudioStore();

      expect(isMuted).toBeFalsy();
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

  describe("loadAllAudios", () => {
    it("should load all audios when called.", () => {
      const { loadAllAudios } = useAudioStore();
      const { backgroundAudios, soundEffects } = useAudioStore();
      loadAllAudios();

      for (const backgroundAudio of Object.values(backgroundAudios)) {
        expect(backgroundAudio.load).toHaveBeenCalledExactlyOnceWith();
      }
      for (const soundEffect of Object.values(soundEffects)) {
        expect(soundEffect.load).toHaveBeenCalledExactlyOnceWith();
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

  describe("fadeOutPlayingBackgroundAudio", () => {
    it("should not fade out playing background audio when there is no playing background audio.", () => {
      const { fadeOutPlayingBackgroundAudio, backgroundAudios } = useAudioStore();
      fadeOutPlayingBackgroundAudio();

      for (const backgroundAudio of Object.values(backgroundAudios)) {
        expect(backgroundAudio.fade).not.toHaveBeenCalled();
      }
    });

    it("should fade out playing background audio when there is playing background audio.", () => {
      const audioStore = useAudioStore();
      const { fadeOutPlayingBackgroundAudio, backgroundAudios } = audioStore;
      audioStore.playingBackgroundAudioName = "night-1";
      fadeOutPlayingBackgroundAudio();

      expect(backgroundAudios["night-1"].fade).toHaveBeenCalledExactlyOnceWith(1, 0, 1000);
    });

    it("should stop playing background audio when there is playing background audio.", () => {
      const audioStore = useAudioStore();
      const { fadeOutPlayingBackgroundAudio, backgroundAudios } = audioStore;
      audioStore.playingBackgroundAudioName = "night-1";
      fadeOutPlayingBackgroundAudio();
      vi.runAllTimers();

      expect(backgroundAudios["night-1"].stop).toHaveBeenCalledExactlyOnceWith();
    });
  });

  describe("playBackgroundAudio", () => {
    it("should fade in playing background audio when called.", () => {
      const { backgroundAudios, playBackgroundAudio } = useAudioStore();
      const backgroundAudioName = "night-1";
      playBackgroundAudio(backgroundAudioName);

      expect(backgroundAudios[backgroundAudioName].fade).toHaveBeenCalledExactlyOnceWith(0, 1, 1000);
    });

    it("should play the background audio when called.", () => {
      const { backgroundAudios, playBackgroundAudio } = useAudioStore();
      const backgroundAudioName = "night-1";
      playBackgroundAudio(backgroundAudioName);

      expect(backgroundAudios[backgroundAudioName].play).toHaveBeenCalledExactlyOnceWith();
    });

    it("should set playing background audio name to the background audio name when called.", () => {
      const { playBackgroundAudio } = useAudioStore();
      const backgroundAudioName = "night-1";
      playBackgroundAudio(backgroundAudioName);

      expect(useAudioStore().playingBackgroundAudioName).toBe(backgroundAudioName);
    });
  });

  describe("playRandomGamePhaseBackgroundAudio", () => {
    beforeEach(() => {
      hoistedMocks.radash.draw.mockReturnValue("night-1");
    });

    it("should not draw a random game phase background audio when the playing background audio is in the same game phase.", () => {
      const audioStore = useAudioStore();
      audioStore.playingBackgroundAudioName = "night-2";
      audioStore.playRandomGamePhaseBackgroundAudio("night");

      expect(hoistedMocks.radash.draw).not.toHaveBeenCalled();
    });

    it("should draw a random game phase background audio when the playing background audio is not in the same game phase.", () => {
      const audioStore = useAudioStore();
      audioStore.playingBackgroundAudioName = "day-1";
      audioStore.playRandomGamePhaseBackgroundAudio("night");

      expect(hoistedMocks.radash.draw).toHaveBeenCalledExactlyOnceWith(audioStore.nightBackgroundAudioNames);
    });

    it("should draw a random game phase background audio when there is no playing background audio.", () => {
      const audioStore = useAudioStore();
      audioStore.playRandomGamePhaseBackgroundAudio("day");

      expect(hoistedMocks.radash.draw).toHaveBeenCalledExactlyOnceWith(audioStore.dayBackgroundAudioNames);
    });

    it("should fade out playing background audio when called.", () => {
      const audioStore = useAudioStore();
      const { backgroundAudios } = audioStore;
      audioStore.playingBackgroundAudioName = "day-1";
      audioStore.playRandomGamePhaseBackgroundAudio("night");

      expect(backgroundAudios["day-1"].fade).toHaveBeenCalledExactlyOnceWith(1, 0, 1000);
    });

    it("should play the random game phase background audio when called.", () => {
      const audioStore = useAudioStore();
      const { backgroundAudios } = audioStore;
      audioStore.playingBackgroundAudioName = "day-1";
      audioStore.playRandomGamePhaseBackgroundAudio("night");

      expect(backgroundAudios["night-1"].play).toHaveBeenCalledExactlyOnceWith();
    });

    it("should not play the random game phase background audio when there is no random game phase background audio.", () => {
      const audioStore = useAudioStore();
      const { backgroundAudios } = audioStore;
      audioStore.playingBackgroundAudioName = "day-1";
      hoistedMocks.radash.draw.mockReturnValue(null);
      audioStore.playRandomGamePhaseBackgroundAudio("night");

      expect(backgroundAudios["day-1"].fade).not.toHaveBeenCalled();
    });
  });

  describe("toggleMute", () => {
    it("should toggle mute when called.", () => {
      const audioStore = useAudioStore();
      const { toggleMute } = audioStore;
      toggleMute();

      expect(audioStore.isMuted).toBeTruthy();
    });
  });
});