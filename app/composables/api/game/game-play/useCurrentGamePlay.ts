import type { ComputedRef, Ref } from "vue";
import type { GamePlayCause } from "~/composables/api/game/types/game-play/game-play.types";

import type { Game } from "~/composables/api/game/types/game.class";
import type { PlayerInteractionType } from "~/composables/api/game/types/players/player-interaction/player-interaction.types";
import type { Player } from "~/composables/api/game/types/players/player.class";

type UseCurrentGamePlay = {
  mustCurrentGamePlayBeSkipped: ComputedRef<boolean>;
  priorityCauseInCurrentGamePlay: ComputedRef<GamePlayCause | undefined>;
  getEligibleTargetsWithInteractionInCurrentGamePlay: (interaction: PlayerInteractionType) => Player[];
};

function useCurrentGamePlay(game: Ref<Game>): UseCurrentGamePlay {
  const mustCurrentGamePlayBeSkipped = computed<boolean>(() => {
    const stealRoleEligibleTargets = getEligibleTargetsWithInteractionInCurrentGamePlay("steal-role");

    return game.value.currentPlay?.action === "bury-dead-bodies" && !stealRoleEligibleTargets.length;
  });

  const priorityCauseInCurrentGamePlay = computed<GamePlayCause | undefined>(() => {
    const gamePlayCausesSortedByPriority: GamePlayCause[] = [
      "previous-votes-were-in-ties",
      "angel-presence",
      "stuttering-judge-request",
    ];

    return gamePlayCausesSortedByPriority.find(cause => game.value.currentPlay?.causes?.includes(cause));
  });

  function getEligibleTargetsWithInteractionInCurrentGamePlay(interactionType: PlayerInteractionType): Player[] {
    if (game.value.currentPlay?.source.interactions === undefined) {
      return [];
    }
    const interaction = game.value.currentPlay.source.interactions.find(({ type }) => type === interactionType);
    if (interaction === undefined) {
      return [];
    }
    return interaction.eligibleTargets;
  }
  return {
    mustCurrentGamePlayBeSkipped,
    priorityCauseInCurrentGamePlay,
    getEligibleTargetsWithInteractionInCurrentGamePlay,
  };
}

export { useCurrentGamePlay };