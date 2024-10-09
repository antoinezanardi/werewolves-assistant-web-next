import { instanceToPlain } from "class-transformer";
import type { Paths } from "type-fest";
import type { ComputedRef, Ref } from "vue";
import { keys, get } from "radash";

import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import type { GameOptions } from "~/composables/api/game/types/game-options/game-options.class";
import type { DeepStringifiedGameOptions } from "~/composables/api/game/types/game-options/game-options.types";
import { useStrings } from "~/composables/misc/useStrings";
import { useTimers } from "~/composables/misc/useTimers";

type UseGameOptionsTexts = {
  gameOptionsTexts: ComputedRef<DeepStringifiedGameOptions>;
  changedGameOptionsTexts: ComputedRef<string[]>;
  getGameOptionText: (key: Paths<DeepStringifiedGameOptions>) => string;
  getGameOptionKeyFromText: (gameOptionText: string) => Paths<DeepStringifiedGameOptions> | undefined;
};

function useGameOptionsTexts(gameOptions: Ref<GameOptions>): UseGameOptionsTexts {
  const { convertBooleanAsAffirmativeString } = useStrings();
  const { getSecondsInMinutesLabel } = useTimers();
  const { t } = useI18n();

  const sheriffElectionTimeGameOptionText = computed<string>(() => {
    const phaseLabel = t(`shared.game.definitePhase.${gameOptions.value.roles.sheriff.electedAt.phaseName}`);

    return t("composables.useGameOptionsTexts.roles.sheriff.electedAt", {
      turn: gameOptions.value.roles.sheriff.electedAt.turn,
      phase: phaseLabel.toLowerCase(),
    });
  });

  const votesDurationGameOptionText = computed<string>(() => {
    const timeLabel = getSecondsInMinutesLabel(gameOptions.value.votes.duration);

    return t(`composables.useGameOptionsTexts.votes.duration`, { time: timeLabel });
  });

  const gameOptionsTexts = computed<DeepStringifiedGameOptions>(() => ({
    composition: { isHidden: t(`composables.useGameOptionsTexts.composition.isHidden.${convertBooleanAsAffirmativeString(gameOptions.value.composition.isHidden)}`) },
    votes: {
      canBeSkipped: t(`composables.useGameOptionsTexts.votes.canBeSkipped.${convertBooleanAsAffirmativeString(gameOptions.value.votes.canBeSkipped)}`),
      duration: votesDurationGameOptionText.value,
    },
    roles: {
      areRevealedOnDeath: t(`composables.useGameOptionsTexts.roles.areRevealedOnDeath.${convertBooleanAsAffirmativeString(gameOptions.value.roles.areRevealedOnDeath)}`),
      doSkipCallIfNoTarget: t(`composables.useGameOptionsTexts.roles.doSkipCallIfNoTarget.${convertBooleanAsAffirmativeString(gameOptions.value.roles.doSkipCallIfNoTarget)}`),
      werewolf: { canEatEachOther: t(`composables.useGameOptionsTexts.roles.werewolf.canEatEachOther.${convertBooleanAsAffirmativeString(gameOptions.value.roles.werewolf.canEatEachOther)}`) },
      sheriff: {
        isEnabled: t(`composables.useGameOptionsTexts.roles.sheriff.isEnabled.${convertBooleanAsAffirmativeString(gameOptions.value.roles.sheriff.isEnabled)}`),
        electedAt: {
          turn: sheriffElectionTimeGameOptionText.value,
          phaseName: sheriffElectionTimeGameOptionText.value,
        },
        hasDoubledVote: t(`composables.useGameOptionsTexts.roles.sheriff.hasDoubledVote.${convertBooleanAsAffirmativeString(gameOptions.value.roles.sheriff.hasDoubledVote)}`),
        mustSettleTieInVotes: t(`composables.useGameOptionsTexts.roles.sheriff.mustSettleTieInVotes.${convertBooleanAsAffirmativeString(gameOptions.value.roles.sheriff.mustSettleTieInVotes)}`),
      },
      bigBadWolf: { isPowerlessIfWerewolfDies: t(`composables.useGameOptionsTexts.roles.bigBadWolf.isPowerlessIfWerewolfDies.${convertBooleanAsAffirmativeString(gameOptions.value.roles.bigBadWolf.isPowerlessIfWerewolfDies)}`) },
      whiteWerewolf: { wakingUpInterval: t(`composables.useGameOptionsTexts.roles.whiteWerewolf.wakingUpInterval`, { interval: gameOptions.value.roles.whiteWerewolf.wakingUpInterval }, gameOptions.value.roles.whiteWerewolf.wakingUpInterval) },
      seer: {
        isTalkative: t(`composables.useGameOptionsTexts.roles.seer.isTalkative.${convertBooleanAsAffirmativeString(gameOptions.value.roles.seer.isTalkative)}`),
        canSeeRoles: t(`composables.useGameOptionsTexts.roles.seer.canSeeRoles.${convertBooleanAsAffirmativeString(gameOptions.value.roles.seer.canSeeRoles)}`),
      },
      cupid: {
        lovers: { doRevealRoleToEachOther: t(`composables.useGameOptionsTexts.roles.cupid.lovers.doRevealRoleToEachOther.${convertBooleanAsAffirmativeString(gameOptions.value.roles.cupid.lovers.doRevealRoleToEachOther)}`) },
        mustWinWithLovers: t(`composables.useGameOptionsTexts.roles.cupid.mustWinWithLovers.${convertBooleanAsAffirmativeString(gameOptions.value.roles.cupid.mustWinWithLovers)}`),
      },
      littleGirl: { isProtectedByDefender: t(`composables.useGameOptionsTexts.roles.littleGirl.isProtectedByDefender.${convertBooleanAsAffirmativeString(gameOptions.value.roles.littleGirl.isProtectedByDefender)}`) },
      defender: { canProtectTwice: t(`composables.useGameOptionsTexts.roles.defender.canProtectTwice.${convertBooleanAsAffirmativeString(gameOptions.value.roles.defender.canProtectTwice)}`) },
      elder: {
        livesCountAgainstWerewolves: t(`composables.useGameOptionsTexts.roles.elder.livesCountAgainstWerewolves`, { livesCount: gameOptions.value.roles.elder.livesCountAgainstWerewolves }, gameOptions.value.roles.elder.livesCountAgainstWerewolves),
        doesTakeHisRevenge: t(`composables.useGameOptionsTexts.roles.elder.doesTakeHisRevenge.${convertBooleanAsAffirmativeString(gameOptions.value.roles.elder.doesTakeHisRevenge)}`),
      },
      idiot: { doesDieOnElderDeath: t(`composables.useGameOptionsTexts.roles.idiot.doesDieOnElderDeath.${convertBooleanAsAffirmativeString(gameOptions.value.roles.idiot.doesDieOnElderDeath)}`) },
      twoSisters: { wakingUpInterval: t(`composables.useGameOptionsTexts.roles.twoSisters.wakingUpInterval`, { interval: gameOptions.value.roles.twoSisters.wakingUpInterval }, gameOptions.value.roles.twoSisters.wakingUpInterval) },
      threeBrothers: { wakingUpInterval: t(`composables.useGameOptionsTexts.roles.threeBrothers.wakingUpInterval`, { interval: gameOptions.value.roles.threeBrothers.wakingUpInterval }, gameOptions.value.roles.threeBrothers.wakingUpInterval) },
      fox: { isPowerlessIfMissesWerewolf: t(`composables.useGameOptionsTexts.roles.fox.isPowerlessIfMissesWerewolf.${convertBooleanAsAffirmativeString(gameOptions.value.roles.fox.isPowerlessIfMissesWerewolf)}`) },
      bearTamer: { doesGrowlOnWerewolvesSide: t(`composables.useGameOptionsTexts.roles.bearTamer.doesGrowlOnWerewolvesSide.${convertBooleanAsAffirmativeString(gameOptions.value.roles.bearTamer.doesGrowlOnWerewolvesSide)}`) },
      stutteringJudge: { voteRequestsCount: t(`composables.useGameOptionsTexts.roles.stutteringJudge.voteRequestsCount`, { voteRequestsCount: gameOptions.value.roles.stutteringJudge.voteRequestsCount }, gameOptions.value.roles.stutteringJudge.voteRequestsCount) },
      wildChild: { isTransformationRevealed: t(`composables.useGameOptionsTexts.roles.wildChild.isTransformationRevealed.${convertBooleanAsAffirmativeString(gameOptions.value.roles.wildChild.isTransformationRevealed)}`) },
      wolfHound: {
        isChosenSideRevealed: t(`composables.useGameOptionsTexts.roles.wolfHound.isChosenSideRevealed.${convertBooleanAsAffirmativeString(gameOptions.value.roles.wolfHound.isChosenSideRevealed)}`),
        isSideRandomlyChosen: t(`composables.useGameOptionsTexts.roles.wolfHound.isSideRandomlyChosen.${convertBooleanAsAffirmativeString(gameOptions.value.roles.wolfHound.isSideRandomlyChosen)}`),
      },
      thief: {
        mustChooseBetweenWerewolves: t(`composables.useGameOptionsTexts.roles.thief.mustChooseBetweenWerewolves.${convertBooleanAsAffirmativeString(gameOptions.value.roles.thief.mustChooseBetweenWerewolves)}`),
        isChosenCardRevealed: t(`composables.useGameOptionsTexts.roles.thief.isChosenCardRevealed.${convertBooleanAsAffirmativeString(gameOptions.value.roles.thief.isChosenCardRevealed)}`),
      },
      piedPiper: {
        charmedPeopleCountPerNight: t(`composables.useGameOptionsTexts.roles.piedPiper.charmedPeopleCountPerNight`, { charmedPeopleCountPerNight: gameOptions.value.roles.piedPiper.charmedPeopleCountPerNight }, gameOptions.value.roles.piedPiper.charmedPeopleCountPerNight),
        isPowerlessOnWerewolvesSide: t(`composables.useGameOptionsTexts.roles.piedPiper.isPowerlessOnWerewolvesSide.${convertBooleanAsAffirmativeString(gameOptions.value.roles.piedPiper.isPowerlessOnWerewolvesSide)}`),
        areCharmedPeopleRevealed: t(`composables.useGameOptionsTexts.roles.piedPiper.areCharmedPeopleRevealed.${convertBooleanAsAffirmativeString(gameOptions.value.roles.piedPiper.areCharmedPeopleRevealed)}`),
      },
      scandalmonger: { markPenalty: t(`composables.useGameOptionsTexts.roles.scandalmonger.markPenalty`, { markPenalty: gameOptions.value.roles.scandalmonger.markPenalty }, gameOptions.value.roles.scandalmonger.markPenalty) },
      witch: { doesKnowWerewolvesTargets: t(`composables.useGameOptionsTexts.roles.witch.doesKnowWerewolvesTargets.${convertBooleanAsAffirmativeString(gameOptions.value.roles.witch.doesKnowWerewolvesTargets)}`) },
      prejudicedManipulator: { isPowerlessOnWerewolvesSide: t(`composables.useGameOptionsTexts.roles.prejudicedManipulator.isPowerlessOnWerewolvesSide.${convertBooleanAsAffirmativeString(gameOptions.value.roles.prejudicedManipulator.isPowerlessOnWerewolvesSide)}`) },
      actor: {
        isPowerlessOnWerewolvesSide: t(`composables.useGameOptionsTexts.roles.actor.isPowerlessOnWerewolvesSide.${convertBooleanAsAffirmativeString(gameOptions.value.roles.actor.isPowerlessOnWerewolvesSide)}`),
      },
    },
  }));

  const changedGameOptionsTexts = computed<string[]>(() => {
    const gameOptionsKeys = keys(instanceToPlain(gameOptions.value));
    const changedGameOptionsKeys = gameOptionsKeys.filter(key => {
      const value = get(gameOptions.value, key);
      const defaultValue = get(DEFAULT_GAME_OPTIONS, key);

      return value !== defaultValue;
    });

    return [...new Set(changedGameOptionsKeys.map(key => getGameOptionText(key as Paths<DeepStringifiedGameOptions>)))];
  });

  function getGameOptionText(key: Paths<DeepStringifiedGameOptions>): string {
    return get(gameOptionsTexts.value, key as string);
  }

  function getGameOptionKeyFromText(gameOptionText: string): Paths<DeepStringifiedGameOptions> | undefined {
    const gameOptionsTextsKeys = keys(gameOptionsTexts.value);
    const gameOptionKey = gameOptionsTextsKeys.find(key => get(gameOptionsTexts.value, key) === gameOptionText);

    return gameOptionKey as Paths<DeepStringifiedGameOptions>;
  }
  return {
    gameOptionsTexts,
    changedGameOptionsTexts,
    getGameOptionText,
    getGameOptionKeyFromText,
  };
}

export { useGameOptionsTexts };