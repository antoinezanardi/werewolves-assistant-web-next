import type { TupleToUnion } from "type-fest";
import type { BACKGROUND_AUDIO_NAMES } from "~/stores/audio/constants/audio.constants";
import type { SOUND_EFFECT_NAMES } from "~/stores/audio/constants/audio.constants";

type SoundEffectName = TupleToUnion<typeof SOUND_EFFECT_NAMES>;

type BackgroundAudioName = TupleToUnion<typeof BACKGROUND_AUDIO_NAMES>;

export type {
  SoundEffectName,
  BackgroundAudioName,
};