const ROLE_NAMES = [
  "werewolf",
  "big-bad-wolf",
  "accursed-wolf-father",
  "white-werewolf",
  "villager",
  "villager-villager",
  "seer",
  "cupid",
  "witch",
  "hunter",
  "little-girl",
  "defender",
  "elder",
  "scapegoat",
  "idiot",
  "two-sisters",
  "three-brothers",
  "fox",
  "bear-tamer",
  "stuttering-judge",
  "rusty-sword-knight",
  "thief",
  "wild-child",
  "wolf-hound",
  "angel",
  "pied-piper",
  "scandalmonger",
  "prejudiced-manipulator",
  "actor",
  "devoted-servant",
] as const;

const ROLE_SIDES = [
  "villagers",
  "werewolves",
] as const;

const ROLE_TYPES = [
  "villager",
  "werewolf",
  "lonely",
  "ambiguous",
] as const;

const ROLE_ORIGINS = [
  "classic",
  "new-moon",
  "the-village",
  "characters",
  "unconventional",
] as const;

export {
  ROLE_NAMES,
  ROLE_SIDES,
  ROLE_TYPES,
  ROLE_ORIGINS,
};