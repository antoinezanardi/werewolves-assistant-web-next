import type { GameOptions } from "~/composables/api/game/types/game-options/game-options.class";

const DEFAULT_GAME_OPTIONS: GameOptions = {
  composition: { isHidden: false },
  votes: { canBeSkipped: true },
  roles: {
    areRevealedOnDeath: true,
    doSkipCallIfNoTarget: false,
    sheriff: {
      isEnabled: true,
      electedAt: {
        turn: 1,
        phaseName: "night",
      },
      hasDoubledVote: true,
      mustSettleTieInVotes: true,
    },
    bigBadWolf: { isPowerlessIfWerewolfDies: true },
    whiteWerewolf: { wakingUpInterval: 2 },
    seer: {
      isTalkative: true,
      canSeeRoles: true,
    },
    cupid: {
      lovers: { doRevealRoleToEachOther: false },
      mustWinWithLovers: false,
    },
    littleGirl: { isProtectedByDefender: false },
    defender: { canProtectTwice: false },
    elder: {
      livesCountAgainstWerewolves: 2,
      doesTakeHisRevenge: true,
    },
    idiot: { doesDieOnElderDeath: true },
    twoSisters: { wakingUpInterval: 2 },
    threeBrothers: { wakingUpInterval: 2 },
    fox: { isPowerlessIfMissesWerewolf: true },
    bearTamer: { doesGrowlOnWerewolvesSide: true },
    stutteringJudge: { voteRequestsCount: 1 },
    wildChild: { isTransformationRevealed: false },
    wolfHound: {
      isChosenSideRevealed: false,
      isSideRandomlyChosen: false,
    },
    thief: {
      mustChooseBetweenWerewolves: true,
      isChosenCardRevealed: false,
      additionalCardsCount: 2,
    },
    piedPiper: {
      charmedPeopleCountPerNight: 2,
      isPowerlessOnWerewolvesSide: true,
    },
    scandalmonger: { markPenalty: 2 },
    witch: { doesKnowWerewolvesTargets: true },
    prejudicedManipulator: { isPowerlessOnWerewolvesSide: true },
    actor: {
      isPowerlessOnWerewolvesSide: true,
      additionalCardsCount: 3,
    },
  },
} as const;

export { DEFAULT_GAME_OPTIONS };