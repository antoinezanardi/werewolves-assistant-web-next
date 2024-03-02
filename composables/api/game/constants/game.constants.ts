import { PLAYER_GROUPS } from "~/composables/api/game/constants/player/player.constants";
import type { PlayerAttributeName } from "~/composables/api/game/types/players/player-attribute/player-attribute.types";
import type { PlayerGroup } from "~/composables/api/game/types/players/player.types";
import { RoleNames } from "~/composables/api/role/enums/role.enums";

const GAME_PHASES = [
  "day",
  "night",
] as const;

const GAME_STATUSES = [
  "playing",
  "over",
  "canceled",
] as const;

const GAME_SOURCES = [
  ...PLAYER_GROUPS,
  ...Object.values(RoleNames),
  "sheriff",
] as const satisfies Readonly<(PlayerAttributeName | PlayerGroup | RoleNames)[]>;

const MIN_PLAYERS_IN_GAME = 4;

const MAX_PLAYERS_IN_GAME = 40;

export {
  GAME_PHASES,
  GAME_STATUSES,
  GAME_SOURCES,
  MIN_PLAYERS_IN_GAME,
  MAX_PLAYERS_IN_GAME,
};