import type { PlayerGroup } from "~/composables/api/game/types/players/player.types";
import type { RoleName } from "~/composables/api/role/types/role.types";

const GAME_PLAY_SOURCE_NAMES = [
  "sheriff",
  "charmed",
  "lovers",
  "survivors",
  "werewolves",
  "big-bad-wolf",
  "hunter",
  "cupid",
  "wolf-hound",
  "fox",
  "defender",
  "hunter",
  "pied-piper",
  "scandalmonger",
  "scapegoat",
  "seer",
  "stuttering-judge",
  "thief",
  "three-brothers",
  "two-sisters",
  "white-werewolf",
  "wild-child",
  "witch",
  "actor",
  "bear-tamer",
  "accursed-wolf-father",
] as const satisfies Readonly<(PlayerGroup | RoleName | "sheriff")[]>;

export { GAME_PLAY_SOURCE_NAMES };