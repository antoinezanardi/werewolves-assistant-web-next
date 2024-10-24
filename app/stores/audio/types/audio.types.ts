import type { TupleToUnion } from "type-fest";

import type { BACKGROUND_AUDIO_NAMES, SOUND_EFFECT_NAMES } from "~/stores/audio/constants/audio.constants";

type AudioSettings = {
  isMuted: boolean;
};

type SoundEffectName = TupleToUnion<typeof SOUND_EFFECT_NAMES>;

type SoundEffectNames = SoundEffectName | SoundEffectName[];

type BackgroundAudioName = TupleToUnion<typeof BACKGROUND_AUDIO_NAMES>;

export type {
  AudioSettings,
  SoundEffectName,
  SoundEffectNames,
  BackgroundAudioName,
};