import type { PlayerGroup } from "~/composables/api/game/types/players/player.types";
import { RoleNames } from "~/composables/api/role/enums/role.enums";

const GAME_PLAY_SOURCE_NAMES = [
  "sheriff",
  "charmed",
  "lovers",
  "survivors",
  "werewolves",
  RoleNames.BIG_BAD_WOLF,
  RoleNames.HUNTER,
  RoleNames.CUPID,
  RoleNames.WOLF_HOUND,
  RoleNames.FOX,
  RoleNames.DEFENDER,
  RoleNames.HUNTER,
  RoleNames.PIED_PIPER,
  RoleNames.SCANDALMONGER,
  RoleNames.SCAPEGOAT,
  RoleNames.SEER,
  RoleNames.STUTTERING_JUDGE,
  RoleNames.THIEF,
  RoleNames.THREE_BROTHERS,
  RoleNames.TWO_SISTERS,
  RoleNames.WHITE_WEREWOLF,
  RoleNames.WILD_CHILD,
  RoleNames.WITCH,
  RoleNames.ACTOR,
  RoleNames.BEAR_TAMER,
  RoleNames.ACCURSED_WOLF_FATHER,
] as const satisfies Readonly<(PlayerGroup | RoleNames | "sheriff")[]>;

export { GAME_PLAY_SOURCE_NAMES };