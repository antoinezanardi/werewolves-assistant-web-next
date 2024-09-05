import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useGameOptionsTexts } from "~/composables/api/game/game-options/useGameOptionsTexts";
import type { GameOptions } from "~/composables/api/game/types/game-options/game-options.class";
import type { DeepStringifiedGameOptions } from "~/composables/api/game/types/game-options/game-options.types";

describe("Use Game Options Texts Composable", () => {
  describe("gameOptionsTexts", () => {
    it("should translate all game options when called.", () => {
      const { gameOptionsTexts } = useGameOptionsTexts(ref(createFakeGameOptions(DEFAULT_GAME_OPTIONS)));
      const expectedGameOptionsTexts: DeepStringifiedGameOptions = {
        composition: { isHidden: `composables.useGameOptionsTexts.composition.isHidden.no` },
        votes: {
          canBeSkipped: `composables.useGameOptionsTexts.votes.canBeSkipped.yes`,
          duration: `composables.useGameOptionsTexts.votes.duration, {"time":"shared.time.minute, {\\"count\\":3}, 3"}`,
        },
        roles: {
          areRevealedOnDeath: `composables.useGameOptionsTexts.roles.areRevealedOnDeath.yes`,
          doSkipCallIfNoTarget: `composables.useGameOptionsTexts.roles.doSkipCallIfNoTarget.no`,
          werewolf: { canEatEachOther: `composables.useGameOptionsTexts.roles.werewolf.canEatEachOther.no` },
          sheriff: {
            isEnabled: `composables.useGameOptionsTexts.roles.sheriff.isEnabled.yes`,
            electedAt: {
              turn: `composables.useGameOptionsTexts.roles.sheriff.electedAt, {"turn":1,"phase":"shared.game.definitephase.night"}`,
              phaseName: `composables.useGameOptionsTexts.roles.sheriff.electedAt, {"turn":1,"phase":"shared.game.definitephase.night"}`,
            },
            hasDoubledVote: `composables.useGameOptionsTexts.roles.sheriff.hasDoubledVote.yes`,
            mustSettleTieInVotes: `composables.useGameOptionsTexts.roles.sheriff.mustSettleTieInVotes.yes`,
          },
          bigBadWolf: { isPowerlessIfWerewolfDies: `composables.useGameOptionsTexts.roles.bigBadWolf.isPowerlessIfWerewolfDies.yes` },
          whiteWerewolf: { wakingUpInterval: `composables.useGameOptionsTexts.roles.whiteWerewolf.wakingUpInterval, {"interval":2}, 2` },
          seer: {
            isTalkative: `composables.useGameOptionsTexts.roles.seer.isTalkative.yes`,
            canSeeRoles: `composables.useGameOptionsTexts.roles.seer.canSeeRoles.yes`,
          },
          cupid: {
            lovers: { doRevealRoleToEachOther: `composables.useGameOptionsTexts.roles.cupid.lovers.doRevealRoleToEachOther.no` },
            mustWinWithLovers: `composables.useGameOptionsTexts.roles.cupid.mustWinWithLovers.no`,
          },
          littleGirl: { isProtectedByDefender: `composables.useGameOptionsTexts.roles.littleGirl.isProtectedByDefender.no` },
          defender: { canProtectTwice: `composables.useGameOptionsTexts.roles.defender.canProtectTwice.no` },
          elder: {
            livesCountAgainstWerewolves: `composables.useGameOptionsTexts.roles.elder.livesCountAgainstWerewolves, {"livesCount":2}, 2`,
            doesTakeHisRevenge: `composables.useGameOptionsTexts.roles.elder.doesTakeHisRevenge.yes`,
          },
          idiot: { doesDieOnElderDeath: `composables.useGameOptionsTexts.roles.idiot.doesDieOnElderDeath.yes` },
          twoSisters: { wakingUpInterval: `composables.useGameOptionsTexts.roles.twoSisters.wakingUpInterval, {"interval":2}, 2` },
          threeBrothers: { wakingUpInterval: `composables.useGameOptionsTexts.roles.threeBrothers.wakingUpInterval, {"interval":2}, 2` },
          fox: { isPowerlessIfMissesWerewolf: `composables.useGameOptionsTexts.roles.fox.isPowerlessIfMissesWerewolf.yes` },
          bearTamer: { doesGrowlOnWerewolvesSide: `composables.useGameOptionsTexts.roles.bearTamer.doesGrowlOnWerewolvesSide.yes` },
          stutteringJudge: { voteRequestsCount: `composables.useGameOptionsTexts.roles.stutteringJudge.voteRequestsCount, {"voteRequestsCount":1}, 1` },
          wildChild: { isTransformationRevealed: `composables.useGameOptionsTexts.roles.wildChild.isTransformationRevealed.no` },
          wolfHound: {
            isChosenSideRevealed: `composables.useGameOptionsTexts.roles.wolfHound.isChosenSideRevealed.no`,
            isSideRandomlyChosen: `composables.useGameOptionsTexts.roles.wolfHound.isSideRandomlyChosen.no`,
          },
          thief: {
            mustChooseBetweenWerewolves: `composables.useGameOptionsTexts.roles.thief.mustChooseBetweenWerewolves.yes`,
            isChosenCardRevealed: `composables.useGameOptionsTexts.roles.thief.isChosenCardRevealed.no`,
            additionalCardsCount: "",
          },
          piedPiper: {
            charmedPeopleCountPerNight: `composables.useGameOptionsTexts.roles.piedPiper.charmedPeopleCountPerNight, {"charmedPeopleCountPerNight":2}, 2`,
            isPowerlessOnWerewolvesSide: `composables.useGameOptionsTexts.roles.piedPiper.isPowerlessOnWerewolvesSide.yes`,
            areCharmedPeopleRevealed: `composables.useGameOptionsTexts.roles.piedPiper.areCharmedPeopleRevealed.no`,
          },
          scandalmonger: { markPenalty: `composables.useGameOptionsTexts.roles.scandalmonger.markPenalty, {"markPenalty":2}, 2` },
          witch: { doesKnowWerewolvesTargets: `composables.useGameOptionsTexts.roles.witch.doesKnowWerewolvesTargets.yes` },
          prejudicedManipulator: { isPowerlessOnWerewolvesSide: `composables.useGameOptionsTexts.roles.prejudicedManipulator.isPowerlessOnWerewolvesSide.yes` },
          actor: {
            isPowerlessOnWerewolvesSide: `composables.useGameOptionsTexts.roles.actor.isPowerlessOnWerewolvesSide.yes`,
            additionalCardsCount: "",
          },
        },
      };

      expect(gameOptionsTexts.value).toStrictEqual<DeepStringifiedGameOptions>(expectedGameOptionsTexts);
    });
  });

  describe("changedGameOptionsTexts", () => {
    it("should return empty array when there is no changed game options.", () => {
      const { changedGameOptionsTexts } = useGameOptionsTexts(ref(createFakeGameOptions(DEFAULT_GAME_OPTIONS)));

      expect(changedGameOptionsTexts.value).toStrictEqual<string[]>([]);
    });

    it("should return an array of changed game options when there are changed game options.", () => {
      const gameOptions = ref<GameOptions>(createFakeGameOptions(DEFAULT_GAME_OPTIONS));
      gameOptions.value.votes.canBeSkipped = false;
      gameOptions.value.roles.seer.canSeeRoles = false;
      const { changedGameOptionsTexts } = useGameOptionsTexts(gameOptions);

      expect(changedGameOptionsTexts.value).toStrictEqual<string[]>([
        "composables.useGameOptionsTexts.votes.canBeSkipped.no",
        "composables.useGameOptionsTexts.roles.seer.canSeeRoles.no",
      ]);
    });
  });

  describe("getGameOptionText", () => {
    it("should return the translated text of the given game option when called.", () => {
      const { getGameOptionText } = useGameOptionsTexts(ref(DEFAULT_GAME_OPTIONS));
      const expectedGameOptionText = `composables.useGameOptionsTexts.votes.canBeSkipped.yes`;

      expect(getGameOptionText("votes.canBeSkipped")).toBe(expectedGameOptionText);
    });
  });
});