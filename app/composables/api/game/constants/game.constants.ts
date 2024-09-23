import { PLAYER_GROUPS } from "~/composables/api/game/constants/player/player.constants";
import type { PlayerAttributeName } from "~/composables/api/game/types/players/player-attribute/player-attribute.types";
import type { PlayerGroup } from "~/composables/api/game/types/players/player.types";
import { ROLE_NAMES } from "~/composables/api/role/constants/role.constants";
import type { RoleName } from "~/composables/api/role/types/role.types";

const GAME_STATUSES = [
  "playing",
  "over",
  "canceled",
] as const;

const GAME_SOURCES = [
  ...PLAYER_GROUPS,
  ...Object.values(ROLE_NAMES),
  "sheriff",
] as const satisfies readonly (PlayerAttributeName | PlayerGroup | RoleName)[];

const MIN_PLAYERS_IN_GAME = 4;

const MAX_PLAYERS_IN_GAME = 40;

const MIN_PLAYERS_IN_GROUP = 2;

export {
  GAME_STATUSES,
  GAME_SOURCES,
  MIN_PLAYERS_IN_GAME,
  MAX_PLAYERS_IN_GAME,
  MIN_PLAYERS_IN_GROUP,
};