import type { AudioSettings } from "~/stores/audio/types/audio.types";

const DEFAULT_AUDIO_SETTINGS = {
  isMuted: false,
} as const satisfies AudioSettings;

const SOUND_EFFECT_NAMES = [
  "actor-clear-throat-and-knocks",
  "angelic-intervention",
  "bear-growling",
  "boys-playing",
  "calm-bear-eating",
  "clearing-throat-and-bell-dings",
  "cocorico",
  "crowd-cheering",
  "death",
  "distant-dog-howling",
  "dog-barking",
  "dramatic-announcement",
  "dramatic-drums",
  "dumb-huh",
  "evil-demonic-laugh",
  "evil-laugh",
  "evil-laugh-2",
  "flute-and-drums",
  "fox-sniffing",
  "gavel-hitting",
  "girls-playing",
  "goat-cry",
  "gun-shot",
  "heartbeat",
  "laughing-clown-exploding",
  "love-arrow-shot",
  "magic-mood",
  "magic-wand",
  "monkey-cry",
  "mystical-mood",
  "pan-flute",
  "powerwolf-bete-du-gevaudan",
  "raven-cry",
  "raven-flying-away",
  "supernatural-mood",
  "sword",
  "thunder",
  "time-is-up",
  "trumpet-fanfare",
  "werewolf-howling",
  "werewolf-growling-1",
  "werewolf-growling-2",
  "werewolf-transformation",
  "witch-laughing",
] as const;

const BACKGROUND_AUDIO_NAMES = [
  "day-1",
  "day-2",
  "night-1",
  "night-2",
  "night-3",
] as const;

export {
  DEFAULT_AUDIO_SETTINGS,
  SOUND_EFFECT_NAMES,
  BACKGROUND_AUDIO_NAMES,
};