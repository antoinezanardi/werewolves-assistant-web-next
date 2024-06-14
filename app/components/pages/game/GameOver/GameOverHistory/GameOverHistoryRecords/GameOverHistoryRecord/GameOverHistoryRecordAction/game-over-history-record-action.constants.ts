import type { GamePlaySourceName } from "~/composables/api/game/types/game-play/game-play-source/game-play-source.types";
import type { GamePlayAction } from "~/composables/api/game/types/game-play/game-play.types";

type GameHistoryRecordPlayTextKey = { textKey: string };

const GAME_HISTORY_RECORD_PLAYS_TEXT: Record<GamePlaySourceName, Partial<Record<GamePlayAction, GameHistoryRecordPlayTextKey>>> = {
  "accursed-wolf-father": { infect: { textKey: "components.GameOverHistoryRecordAction.infected" } },
  "actor": { "choose-card": { textKey: "components.GameOverHistoryRecordAction.choseCard" } },
  "bear-tamer": { growl: { textKey: "components.GameOverHistoryRecordAction.growled" } },
  "big-bad-wolf": { eat: { textKey: "components.GameOverHistoryRecordAction.ate" } },
  "charmed": { "meet-each-other": { textKey: "components.GameOverHistoryRecordAction.metEachOther" } },
  "cupid": { charm: { textKey: "components.GameOverHistoryRecordAction.madeFallInLove" } },
  "defender": { protect: { textKey: "components.GameOverHistoryRecordAction.protected" } },
  "fox": { sniff: { textKey: "components.GameOverHistoryRecordAction.sniffed" } },
  "hunter": { shoot: { textKey: "components.GameOverHistoryRecordAction.shot" } },
  "lovers": { "meet-each-other": { textKey: "components.GameOverHistoryRecordAction.metEachOther" } },
  "pied-piper": { charm: { textKey: "components.GameOverHistoryRecordAction.charmed" } },
  "scandalmonger": { mark: { textKey: "components.GameOverHistoryRecordAction.markedWithFeather" } },
  "scapegoat": { "ban-voting": { textKey: "components.GameOverHistoryRecordAction.bannedFromVotes" } },
  "seer": { look: { textKey: "components.GameOverHistoryRecordAction.seen" } },
  "sheriff": {
    "delegate": { textKey: "components.GameOverHistoryRecordAction.delegated" },
    "settle-votes": { textKey: "components.GameOverHistoryRecordAction.settledVotes" },
  },
  "stuttering-judge": { "request-another-vote": { textKey: "components.GameOverHistoryRecordAction.requestedAnotherVote" } },
  "survivors": {
    "bury-dead-bodies": { textKey: "components.GameOverHistoryRecordAction.buriedDeadBodies" },
    "elect-sheriff": { textKey: "components.GameOverHistoryRecordAction.electedAsSheriff" },
    "vote": { textKey: "components.GameOverHistoryRecordAction.voted" },
  },
  "thief": { "choose-card": { textKey: "components.GameOverHistoryRecordAction.choseCard" } },
  "three-brothers": { "meet-each-other": { textKey: "components.GameOverHistoryRecordAction.metEachOther" } },
  "two-sisters": { "meet-each-other": { textKey: "components.GameOverHistoryRecordAction.metEachOther" } },
  "werewolves": { eat: { textKey: "components.GameOverHistoryRecordAction.ate" } },
  "white-werewolf": { eat: { textKey: "components.GameOverHistoryRecordAction.ate" } },
  "wild-child": { "choose-model": { textKey: "components.GameOverHistoryRecordAction.choseAsModel" } },
  "witch": { "use-potions": { textKey: "components.GameOverHistoryRecordAction.usedPotions" } },
  "wolf-hound": { "choose-side": { textKey: "components.GameOverHistoryRecordAction.choseSide" } },
};

export { GAME_HISTORY_RECORD_PLAYS_TEXT };