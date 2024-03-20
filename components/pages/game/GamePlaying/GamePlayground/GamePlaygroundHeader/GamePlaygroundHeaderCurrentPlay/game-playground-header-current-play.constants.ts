import type { GamePlaySourceName } from "~/composables/api/game/types/game-play/game-play-source/game-play-source.types";
import type { GamePlayAction } from "~/composables/api/game/types/game-play/game-play.types";

type CurrentPlaySvgAndTextKey = { svgPath: string; textKey: string };

const CURRENT_PLAYS_TEXT_AND_SVG: Record<GamePlaySourceName, Partial<Record<GamePlayAction, CurrentPlaySvgAndTextKey>>> = {
  "accursed-wolf-father": {
    infect: {
      svgPath: "/svg/role/accursed-wolf-father.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.accursedWolfFatherInfects",
    },
  },
  "actor": {
    "choose-card": {
      svgPath: "/svg/role/actor.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.actorChoosesCard",
    },
  },
  "bear-tamer": {
    growl: {
      svgPath: "/svg/role/bear-tamer.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.bearTamerGrowls",
    },
  },
  "big-bad-wolf": {
    eat: {
      svgPath: "/svg/role/big-bad-wolf.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.bigBadWolfEats",
    },
  },
  "charmed": {
    "meet-each-other": {
      svgPath: "/svg/role/pied-piper.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.charmedPeopleMeetEachOther",
    },
  },
  "cupid": {
    charm: {
      svgPath: "/svg/role/cupid.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.cupidCharms",
    },
  },
  "defender": {
    protect: {
      svgPath: "/svg/role/defender.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.defenderProtects",
    },
  },
  "fox": {
    sniff: {
      svgPath: "/svg/role/fox.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.foxSniffs",
    },
  },
  "hunter": {
    shoot: {
      svgPath: "/svg/role/hunter.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.hunterShoots",
    },
  },
  "lovers": {
    "meet-each-other": {
      svgPath: "/svg/role/lovers.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.loversMeetEachOther",
    },
  },
  "pied-piper": {
    charm: {
      svgPath: "/svg/role/pied-piper.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.piedPiperCharms",
    },
  },
  "scandalmonger": {
    mark: {
      svgPath: "/svg/role/scandalmonger.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.scandalmongerMarks",
    },
  },
  "scapegoat": {
    "ban-voting": {
      svgPath: "/svg/role/scapegoat.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.scapegoatBansVoting",
    },
  },
  "seer": {
    look: {
      svgPath: "/svg/role/seer.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.seerLooks",
    },
  },
  "sheriff": {
    "delegate": {
      svgPath: "/svg/game/player/player-attribute/sheriff.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.sheriffDelegates",
    },
    "settle-votes": {
      svgPath: "/svg/game/game-play/game-play-action/settle-votes.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.sheriffSettlesVotes",
    },
  },
  "stuttering-judge": {
    "request-another-vote": {
      svgPath: "/svg/role/stuttering-judge.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.stutteringJudgeRequestsAnotherVote",
    },
  },
  "survivors": {
    "bury-dead-bodies": {
      svgPath: "/svg/game/player/dead.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.survivorsBuryDeadBodies",
    },
    "elect-sheriff": {
      svgPath: "/svg/game/player/player-attribute/sheriff.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.survivorsElectSheriff",
    },
    "vote": {
      svgPath: "/svg/game/game-play/game-play-action/vote.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.survivorsVote",
    },
  },
  "thief": {
    "choose-card": {
      svgPath: "/svg/role/thief.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.thiefChoosesCard",
    },
  },
  "three-brothers": {
    "meet-each-other": {
      svgPath: "/svg/role/three-brothers.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.threeBrothersMeetEachOther",
    },
  },
  "two-sisters": {
    "meet-each-other": {
      svgPath: "/svg/role/two-sisters.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.twoSistersMeetEachOther",
    },
  },
  "werewolves": {
    eat: {
      svgPath: "/svg/role/werewolf.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.werewolvesEat",
    },
  },
  "white-werewolf": {
    eat: {
      svgPath: "/svg/role/white-werewolf.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.whiteWerewolfEats",
    },
  },
  "wild-child": {
    "choose-model": {
      svgPath: "/svg/role/wild-child.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.wildChildChoosesModel",
    },
  },
  "witch": {
    "use-potions": {
      svgPath: "/svg/role/witch.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.witchUsesPotions",
    },
  },
  "wolf-hound": {
    "choose-side": {
      svgPath: "/svg/role/wolf-hound.svg",
      textKey: "components.GamePlaygroundHeaderCurrentPlay.wolfHoundChoosesSide",
    },
  },
};

export { CURRENT_PLAYS_TEXT_AND_SVG };