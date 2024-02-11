const GAME_PHASES = ["day", "night"] as const;

const GAME_STATUSES = ["playing", "over", "canceled"] as const;

const MIN_PLAYERS_IN_GAME = 4;

const MAX_PLAYERS_IN_GAME = 40;

export {
  GAME_PHASES,
  GAME_STATUSES,
  MIN_PLAYERS_IN_GAME,
  MAX_PLAYERS_IN_GAME,
};