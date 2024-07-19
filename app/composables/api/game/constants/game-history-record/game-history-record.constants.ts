const GAME_HISTORY_RECORD_PLAY_VOTING_RESULTS = [
  "sheriff-election",
  "tie",
  "death",
  "inconsequential",
  "skipped",
] as const;

const GAME_HISTORY_RECORD_PLAYER_ATTRIBUTE_ALTERATION_STATUSES = [
  "attached",
  "detached",
  "activated",
] as const;

export {
  GAME_HISTORY_RECORD_PLAY_VOTING_RESULTS,
  GAME_HISTORY_RECORD_PLAYER_ATTRIBUTE_ALTERATION_STATUSES,
};