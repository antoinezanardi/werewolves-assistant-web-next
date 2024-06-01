import type { ComputedRef, Ref } from "vue";

import type { Game } from "~/composables/api/game/types/game.class";
import type { PlayerInteractionType } from "~/composables/api/game/types/players/player-interaction/player-interaction.types";
import type { Player } from "~/composables/api/game/types/players/player.class";

type UseCurrentGamePlay = {
  mustCurrentGamePlayBeSkipped: ComputedRef<boolean>;
  getEligibleTargetsWithInteractionInCurrentGamePlay: (interaction: PlayerInteractionType) => Player[];
};

function useCurrentGamePlay(game: Ref<Game>): UseCurrentGamePlay {
  const mustCurrentGamePlayBeSkipped = computed<boolean>(() => {
    const stealRoleEligibleTargets = getEligibleTargetsWithInteractionInCurrentGamePlay("steal-role");

    return game.value.currentPlay?.action === "bury-dead-bodies" && !stealRoleEligibleTargets.length;
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
    getEligibleTargetsWithInteractionInCurrentGamePlay,
  };
}

export { useCurrentGamePlay };