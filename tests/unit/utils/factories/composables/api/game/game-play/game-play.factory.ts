import { faker } from "@faker-js/faker";

import { GAME_PLAY_ACTIONS, GAME_PLAY_OCCURRENCES } from "~/composables/api/game/constants/game-play/game-play.constants";
import { GamePlay } from "~/composables/api/game/types/game-play/game-play.class";
import type { GamePlayCause, GamePlayOccurrence } from "~/composables/api/game/types/game-play/game-play.types";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { createFakeGamePlaySource } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";

function createFakeGamePlayStutteringJudgeRequestsAnotherVote(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "request-another-vote",
    source: createFakeGamePlaySource({ name: RoleNames.STUTTERING_JUDGE }),
    occurrence: "consequential",
    ...gamePlay,
  });
}

function createFakeGamePlayAccursedWolfFatherInfects(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "infect",
    source: createFakeGamePlaySource({ name: RoleNames.ACCURSED_WOLF_FATHER }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayBearTamerGrowls(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "growl",
    source: createFakeGamePlaySource({ name: RoleNames.BEAR_TAMER }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayActorChoosesCard(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "choose-card",
    source: createFakeGamePlaySource({ name: RoleNames.ACTOR }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlaySurvivorsBuryDeadBodies(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "bury-dead-bodies",
    source: createFakeGamePlaySource({ name: "survivors" }),
    occurrence: "consequential",
    ...gamePlay,
  });
}

function createFakeGamePlaySheriffSettlesVotes(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "settle-votes",
    source: createFakeGamePlaySource({ name: "sheriff" }),
    occurrence: "consequential",
    ...gamePlay,
  });
}

function createFakeGamePlaySheriffDelegates(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "delegate",
    source: createFakeGamePlaySource({ name: "sheriff" }),
    occurrence: "consequential",
    ...gamePlay,
  });
}

function createFakeGamePlaySurvivorsVote(gamePlay: Partial<GamePlay> = {}): GamePlay {
  let occurrence: GamePlayOccurrence = "on-days";
  if (gamePlay.cause === "angel-presence") {
    occurrence = "one-night-only";
  } else if (["previous-votes-were-in-tie", "stuttering-judge-request"].includes(gamePlay.cause as GamePlayCause)) {
    occurrence = "consequential";
  }
  return createFakeGamePlay({
    source: createFakeGamePlaySource({ name: "survivors" }),
    action: "vote",
    occurrence,
    ...gamePlay,
  });
}

function createFakeGamePlaySurvivorsElectSheriff(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "elect-sheriff",
    source: createFakeGamePlaySource({ name: "survivors" }),
    occurrence: "anytime",
    ...gamePlay,
  });
}

function createFakeGamePlayThiefChoosesCard(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "choose-card",
    source: createFakeGamePlaySource({ name: RoleNames.THIEF }),
    occurrence: "one-night-only",
    ...gamePlay,
  });
}

function createFakeGamePlayScapegoatBansVoting(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "ban-voting",
    source: createFakeGamePlaySource({ name: RoleNames.SCAPEGOAT }),
    occurrence: "consequential",
    ...gamePlay,
  });
}

function createFakeGamePlayWolfHoundChoosesSide(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "choose-side",
    source: createFakeGamePlaySource({ name: RoleNames.WOLF_HOUND }),
    occurrence: "one-night-only",
    ...gamePlay,
  });
}

function createFakeGamePlayWildChildChoosesModel(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "choose-model",
    source: createFakeGamePlaySource({ name: RoleNames.WILD_CHILD }),
    occurrence: "one-night-only",
    ...gamePlay,
  });
}

function createFakeGamePlayFoxSniffs(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "sniff",
    source: createFakeGamePlaySource({ name: RoleNames.FOX }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayCharmedMeetEachOther(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "meet-each-other",
    source: createFakeGamePlaySource({ name: "charmed" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayLoversMeetEachOther(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "meet-each-other",
    source: createFakeGamePlaySource({ name: "lovers" }),
    occurrence: "one-night-only",
    ...gamePlay,
  });
}

function createFakeGamePlayThreeBrothersMeetEachOther(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "meet-each-other",
    source: createFakeGamePlaySource({ name: RoleNames.THREE_BROTHERS }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayTwoSistersMeetEachOther(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "meet-each-other",
    source: createFakeGamePlaySource({ name: RoleNames.TWO_SISTERS }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayScandalmongerMarks(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "mark",
    source: createFakeGamePlaySource({ name: RoleNames.SCANDALMONGER }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayDefenderProtects(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "protect",
    source: createFakeGamePlaySource({ name: RoleNames.DEFENDER }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayHunterShoots(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "shoot",
    source: createFakeGamePlaySource({ name: RoleNames.HUNTER }),
    occurrence: "consequential",
    ...gamePlay,
  });
}

function createFakeGamePlayWitchUsesPotions(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "use-potions",
    source: createFakeGamePlaySource({ name: RoleNames.WITCH }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayPiedPiperCharms(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "charm",
    source: createFakeGamePlaySource({ name: RoleNames.PIED_PIPER }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayCupidCharms(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "charm",
    source: createFakeGamePlaySource({ name: RoleNames.CUPID }),
    occurrence: "one-night-only",
    ...gamePlay,
  });
}

function createFakeGamePlaySeerLooks(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "look",
    source: createFakeGamePlaySource({ name: RoleNames.SEER }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayWhiteWerewolfEats(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "eat",
    source: createFakeGamePlaySource({ name: RoleNames.WHITE_WEREWOLF }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayBigBadWolfEats(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "eat",
    source: createFakeGamePlaySource({ name: RoleNames.BIG_BAD_WOLF }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayWerewolvesEat(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    action: "eat",
    source: createFakeGamePlaySource({ name: "werewolves" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlay(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return GamePlay.create({
    action: gamePlay.action ?? faker.helpers.arrayElement(GAME_PLAY_ACTIONS),
    source: createFakeGamePlaySource(gamePlay.source),
    eligibleTargets: gamePlay.eligibleTargets ?? undefined,
    canBeSkipped: gamePlay.canBeSkipped ?? undefined,
    cause: gamePlay.cause ?? undefined,
    occurrence: gamePlay.occurrence ?? faker.helpers.arrayElement(GAME_PLAY_OCCURRENCES),
  });
}

export {
  createFakeGamePlayStutteringJudgeRequestsAnotherVote,
  createFakeGamePlayAccursedWolfFatherInfects,
  createFakeGamePlayBearTamerGrowls,
  createFakeGamePlayActorChoosesCard,
  createFakeGamePlaySurvivorsBuryDeadBodies,
  createFakeGamePlaySheriffSettlesVotes,
  createFakeGamePlaySheriffDelegates,
  createFakeGamePlaySurvivorsVote,
  createFakeGamePlaySurvivorsElectSheriff,
  createFakeGamePlayThiefChoosesCard,
  createFakeGamePlayScapegoatBansVoting,
  createFakeGamePlayWolfHoundChoosesSide,
  createFakeGamePlayWildChildChoosesModel,
  createFakeGamePlayFoxSniffs,
  createFakeGamePlayCharmedMeetEachOther,
  createFakeGamePlayLoversMeetEachOther,
  createFakeGamePlayThreeBrothersMeetEachOther,
  createFakeGamePlayTwoSistersMeetEachOther,
  createFakeGamePlayScandalmongerMarks,
  createFakeGamePlayDefenderProtects,
  createFakeGamePlayHunterShoots,
  createFakeGamePlayWitchUsesPotions,
  createFakeGamePlayPiedPiperCharms,
  createFakeGamePlayCupidCharms,
  createFakeGamePlaySeerLooks,
  createFakeGamePlayWhiteWerewolfEats,
  createFakeGamePlayBigBadWolfEats,
  createFakeGamePlayWerewolvesEat,
  createFakeGamePlay,
};