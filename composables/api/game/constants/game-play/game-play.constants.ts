const GAME_PLAY_ACTIONS = [
  "eat",
  "look",
  "charm",
  "use-potions",
  "shoot",
  "protect",
  "mark",
  "meet-each-other",
  "sniff",
  "choose-model",
  "choose-side",
  "ban-voting",
  "choose-card",
  "elect-sheriff",
  "vote",
  "delegate",
  "settle-votes",
  "bury-dead-bodies",
  "growl",
  "infect",
  "request-another-vote",
] as const;

const GAME_PLAY_CAUSES = [
  "stuttering-judge-request",
  "previous-votes-were-in-ties",
  "angel-presence",
];

const GAME_PLAY_OCCURRENCES = [
  "one-night-only",
  "on-nights",
  "on-days",
  "anytime",
  "consequential",
];

const WITCH_POTIONS = [
  "life",
  "death",
];

export {
  GAME_PLAY_ACTIONS,
  GAME_PLAY_CAUSES,
  GAME_PLAY_OCCURRENCES,
  WITCH_POTIONS,
};