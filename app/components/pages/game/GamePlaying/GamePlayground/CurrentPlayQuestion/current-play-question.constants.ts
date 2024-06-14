import type { GamePlaySourceName } from "~/composables/api/game/types/game-play/game-play-source/game-play-source.types";
import type { GamePlayAction, GamePlayCause } from "~/composables/api/game/types/game-play/game-play.types";

type CurrentPlayCausesQuestion = {
  [Key in GamePlayCause]?: string;
} & { default: string };

const GAME_PLAYS_QUESTIONS: Record<GamePlaySourceName, Partial<Record<GamePlayAction, CurrentPlayCausesQuestion>>> = {
  "accursed-wolf-father": { infect: { default: "components.CurrentPlayQuestion.doesAccursedWolfFatherWantToInfect" } },
  "actor": { "choose-card": { default: "components.CurrentPlayQuestion.doesActorWantToChooseCard" } },
  "bear-tamer": { growl: { default: "components.CurrentPlayQuestion.bearGrowled" } },
  "big-bad-wolf": { eat: { default: "components.CurrentPlayQuestion.whichPlayerDoesBigBadWolfEat" } },
  "charmed": { "meet-each-other": { default: "components.CurrentPlayQuestion.charmedPeopleMeetEachOther" } },
  "cupid": { charm: { default: "components.CurrentPlayQuestion.whichPlayersDoesCupidCharm" } },
  "defender": { protect: { default: "components.CurrentPlayQuestion.whichPlayerDoesDefenderProtect" } },
  "fox": { sniff: { default: "components.CurrentPlayQuestion.doesFoxWantToSniff" } },
  "hunter": { shoot: { default: "components.CurrentPlayQuestion.whichPlayerDoesHunterShoot" } },
  "lovers": { "meet-each-other": { default: "components.CurrentPlayQuestion.loversMeetEachOther" } },
  "pied-piper": { charm: { default: "components.CurrentPlayQuestion.whichPlayersDoesPiedPiperCharm" } },
  "scandalmonger": { mark: { default: "components.CurrentPlayQuestion.doesScandalmongerWantToMark" } },
  "scapegoat": { "ban-voting": { default: "components.CurrentPlayQuestion.doesScapegoatWantToBanVoting" } },
  "seer": { look: { default: "components.CurrentPlayQuestion.whichPlayerDoesSeerLook" } },
  "sheriff": {
    "delegate": { default: "components.CurrentPlayQuestion.whichPlayerDoesSheriffDelegate" },
    "settle-votes": { default: "components.CurrentPlayQuestion.whichPlayerDoesSheriffSettleVotes" },
  },
  "stuttering-judge": { "request-another-vote": { default: "components.CurrentPlayQuestion.doesJudgeRequestAnotherVote" } },
  "survivors": {
    "bury-dead-bodies": { default: "" },
    "elect-sheriff": {
      "default": "components.CurrentPlayQuestion.whichPlayerDoesSurvivorsElectAsSheriff",
      "previous-votes-were-in-ties": "components.CurrentPlayQuestion.whichPlayerDoesSurvivorsElectSheriffOnTie",
    },
    "vote": {
      "default": "components.CurrentPlayQuestion.whichPlayerDoesSurvivorsVoteFor",
      "angel-presence": "components.CurrentPlayQuestion.whichPlayerDoesSurvivorsVoteFor",
      "stuttering-judge-request": "components.CurrentPlayQuestion.whichPlayerDoesSurvivorsVoteForOnJudgeRequest",
      "previous-votes-were-in-ties": "components.CurrentPlayQuestion.whichPlayerDoesSurvivorsVoteForOnTie",
    },
  },
  "thief": { "choose-card": { default: "components.CurrentPlayQuestion.doesThiefWantToChooseCard" } },
  "three-brothers": { "meet-each-other": { default: "components.CurrentPlayQuestion.threeBrothersMeetEachOther" } },
  "two-sisters": { "meet-each-other": { default: "components.CurrentPlayQuestion.twoSistersMeetEachOther" } },
  "werewolves": { eat: { default: "components.CurrentPlayQuestion.whichPlayerDoesWerewolvesEat" } },
  "white-werewolf": { eat: { default: "components.CurrentPlayQuestion.doesWhiteWerewolfWantToEat" } },
  "wild-child": { "choose-model": { default: "components.CurrentPlayQuestion.whichPlayerDoesWildChildChoose" } },
  "witch": { "use-potions": { default: "components.CurrentPlayQuestion.doesWitchWantToUsePotions" } },
  "wolf-hound": { "choose-side": { default: "components.CurrentPlayQuestion.whichSideDoesWolfHoundChoose" } },
};

export { GAME_PLAYS_QUESTIONS };