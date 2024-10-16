import type { ComputedRef, MaybeRef } from "vue";

import type { GameAdditionalCard } from "~/composables/api/game/types/game-additional-card/game-additional-card.class";
import type { GameOptions } from "~/composables/api/game/types/game-options/game-options.class";
import type { GamePlay } from "~/composables/api/game/types/game-play/game-play.class";
import type { GamePlayCause } from "~/composables/api/game/types/game-play/game-play.types";
import type { Game } from "~/composables/api/game/types/game.class";
import type { PlayerInteractionType } from "~/composables/api/game/types/players/player-interaction/player-interaction.types";
import type { Player } from "~/composables/api/game/types/players/player.class";

type UseCurrentGamePlay = {
  mustCurrentGamePlayBeSkipped: ComputedRef<boolean>;
  priorityCauseInCurrentGamePlay: ComputedRef<GamePlayCause | undefined>;
  getEligibleTargetsWithInteractionInCurrentGamePlay: (interaction: PlayerInteractionType) => Player[];
  getEligibleAdditionalCardsToChooseInCurrentGamePlay: () => GameAdditionalCard[];
};

function useCurrentGamePlay(game: MaybeRef<Game>): UseCurrentGamePlay {
  const currentPlay = computed<GamePlay | null>(() => (isRef(game) ? game.value.currentPlay : game.currentPlay));
  const additionalCards = computed<GameAdditionalCard[] | undefined>(() => (isRef(game) ? game.value.additionalCards : game.additionalCards));
  const gameOptions = computed<GameOptions>(() => (isRef(game) ? game.value.options : game.options));

  const mustCurrentGamePlayBeSkipped = computed<boolean>(() => {
    const isWolfHoundSideRandomlyChosen = gameOptions.value.roles.wolfHound.isSideRandomlyChosen;
    const stealRoleEligibleTargets = getEligibleTargetsWithInteractionInCurrentGamePlay("steal-role");
    const currentGameAction = currentPlay.value?.action;
    const isCurrentActionBuryDeadBodiesAndNoStealRoleEligibleTargets = currentGameAction === "bury-dead-bodies" && !stealRoleEligibleTargets.length;
    const isCurrentActionChooseSideAndSideRandomlyChosen = currentGameAction === "choose-side" && isWolfHoundSideRandomlyChosen;

    return isCurrentActionBuryDeadBodiesAndNoStealRoleEligibleTargets || isCurrentActionChooseSideAndSideRandomlyChosen;
  });

  const priorityCauseInCurrentGamePlay = computed<GamePlayCause | undefined>(() => {
    const gamePlayCausesSortedByPriority: GamePlayCause[] = [
      "previous-votes-were-in-ties",
      "angel-presence",
      "stuttering-judge-request",
    ];

    return gamePlayCausesSortedByPriority.find(cause => currentPlay.value?.causes?.includes(cause));
  });

  function getEligibleTargetsWithInteractionInCurrentGamePlay(interactionType: PlayerInteractionType): Player[] {
    if (currentPlay.value?.source.interactions === undefined) {
      return [];
    }
    const interaction = currentPlay.value.source.interactions.find(({ type }) => type === interactionType);
    if (interaction === undefined) {
      return [];
    }
    return interaction.eligibleTargets;
  }

  function getEligibleAdditionalCardsToChooseInCurrentGamePlay(): GameAdditionalCard[] {
    if (currentPlay.value?.action !== "choose-card" || additionalCards.value === undefined) {
      return [];
    }
    const { source } = currentPlay.value;

    return additionalCards.value.filter(({ recipient, isUsed }) => recipient === source.name && !isUsed);
  }
  return {
    mustCurrentGamePlayBeSkipped,
    priorityCauseInCurrentGamePlay,
    getEligibleTargetsWithInteractionInCurrentGamePlay,
    getEligibleAdditionalCardsToChooseInCurrentGamePlay,
  };
}

export { useCurrentGamePlay };