import { faker } from "@faker-js/faker";

import { GAME_PLAY_ACTIONS, GAME_PLAY_OCCURRENCES, GAME_PLAY_TYPES } from "~/composables/api/game/constants/game-play/game-play.constants";
import { GamePlay } from "~/composables/api/game/types/game-play/game-play.class";
import type { GamePlayCause, GamePlayOccurrence } from "~/composables/api/game/types/game-play/game-play.types";
import { createFakeGamePlaySource } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";

function createFakeGamePlayStutteringJudgeRequestsAnotherVote(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "request-another-vote",
    action: "request-another-vote",
    source: createFakeGamePlaySource({ name: "stuttering-judge" }),
    occurrence: "consequential",
    ...gamePlay,
  });
}

function createFakeGamePlayAccursedWolfFatherInfects(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "infect",
    source: createFakeGamePlaySource({ name: "accursed-wolf-father" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayActorChoosesCard(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "choose-card",
    action: "choose-card",
    source: createFakeGamePlaySource({ name: "actor" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlaySurvivorsBuryDeadBodies(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "bury-dead-bodies",
    action: "bury-dead-bodies",
    source: createFakeGamePlaySource({ name: "survivors" }),
    occurrence: "consequential",
    ...gamePlay,
  });
}

function createFakeGamePlaySheriffSettlesVotes(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "settle-votes",
    source: createFakeGamePlaySource({ name: "sheriff" }),
    occurrence: "consequential",
    ...gamePlay,
  });
}

function createFakeGamePlaySheriffDelegates(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "delegate",
    source: createFakeGamePlaySource({ name: "sheriff" }),
    occurrence: "consequential",
    ...gamePlay,
  });
}

function createFakeGamePlaySurvivorsVote(gamePlay: Partial<GamePlay> = {}): GamePlay {
  let occurrence: GamePlayOccurrence = "on-days";
  const consequentialGamePlayCauses: GamePlayCause[] = ["previous-votes-were-in-ties", "stuttering-judge-request"];
  if (gamePlay.causes?.includes("angel-presence") === true) {
    occurrence = "one-night-only";
  } else if (consequentialGamePlayCauses.some(cause => gamePlay.causes?.includes(cause) === true)) {
    occurrence = "consequential";
  }
  return createFakeGamePlay({
    type: "vote",
    source: createFakeGamePlaySource({ name: "survivors" }),
    action: "vote",
    occurrence,
    ...gamePlay,
  });
}

function createFakeGamePlaySurvivorsElectSheriff(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "vote",
    action: "elect-sheriff",
    source: createFakeGamePlaySource({ name: "survivors" }),
    occurrence: "anytime",
    ...gamePlay,
  });
}

function createFakeGamePlayThiefChoosesCard(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "choose-card",
    action: "choose-card",
    source: createFakeGamePlaySource({ name: "thief" }),
    occurrence: "one-night-only",
    ...gamePlay,
  });
}

function createFakeGamePlayScapegoatBansVoting(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "ban-voting",
    source: createFakeGamePlaySource({ name: "scapegoat" }),
    occurrence: "consequential",
    ...gamePlay,
  });
}

function createFakeGamePlayWolfHoundChoosesSide(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "choose-side",
    action: "choose-side",
    source: createFakeGamePlaySource({ name: "wolf-hound" }),
    occurrence: "one-night-only",
    ...gamePlay,
  });
}

function createFakeGamePlayWildChildChoosesModel(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "choose-model",
    source: createFakeGamePlaySource({ name: "wild-child" }),
    occurrence: "one-night-only",
    ...gamePlay,
  });
}

function createFakeGamePlayFoxSniffs(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "sniff",
    source: createFakeGamePlaySource({ name: "fox" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayCharmedMeetEachOther(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "no-action",
    action: "meet-each-other",
    source: createFakeGamePlaySource({ name: "charmed" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayLoversMeetEachOther(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "no-action",
    action: "meet-each-other",
    source: createFakeGamePlaySource({ name: "lovers" }),
    occurrence: "one-night-only",
    ...gamePlay,
  });
}

function createFakeGamePlayThreeBrothersMeetEachOther(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "no-action",
    action: "meet-each-other",
    source: createFakeGamePlaySource({ name: "three-brothers" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayTwoSistersMeetEachOther(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "no-action",
    action: "meet-each-other",
    source: createFakeGamePlaySource({ name: "two-sisters" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayScandalmongerMarks(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "mark",
    source: createFakeGamePlaySource({ name: "scandalmonger" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayDefenderProtects(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "protect",
    source: createFakeGamePlaySource({ name: "defender" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayHunterShoots(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "shoot",
    source: createFakeGamePlaySource({ name: "hunter" }),
    occurrence: "consequential",
    ...gamePlay,
  });
}

function createFakeGamePlayWitchUsesPotions(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "use-potions",
    source: createFakeGamePlaySource({ name: "witch" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayPiedPiperCharms(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "charm",
    source: createFakeGamePlaySource({ name: "pied-piper" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayCupidCharms(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "charm",
    source: createFakeGamePlaySource({ name: "cupid" }),
    occurrence: "one-night-only",
    ...gamePlay,
  });
}

function createFakeGamePlaySeerLooks(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "look",
    source: createFakeGamePlaySource({ name: "seer" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayWhiteWerewolfEats(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "eat",
    source: createFakeGamePlaySource({ name: "white-werewolf" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayBigBadWolfEats(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "eat",
    source: createFakeGamePlaySource({ name: "big-bad-wolf" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlayWerewolvesEat(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return createFakeGamePlay({
    type: "target",
    action: "eat",
    source: createFakeGamePlaySource({ name: "werewolves" }),
    occurrence: "on-nights",
    ...gamePlay,
  });
}

function createFakeGamePlay(gamePlay: Partial<GamePlay> = {}): GamePlay {
  return GamePlay.create({
    type: gamePlay.type ?? faker.helpers.arrayElement(GAME_PLAY_TYPES),
    action: gamePlay.action ?? faker.helpers.arrayElement(GAME_PLAY_ACTIONS),
    source: createFakeGamePlaySource(gamePlay.source),
    canBeSkipped: gamePlay.canBeSkipped ?? undefined,
    causes: gamePlay.causes ?? undefined,
    occurrence: gamePlay.occurrence ?? faker.helpers.arrayElement(GAME_PLAY_OCCURRENCES),
  });
}

export {
  createFakeGamePlayStutteringJudgeRequestsAnotherVote,
  createFakeGamePlayAccursedWolfFatherInfects,
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