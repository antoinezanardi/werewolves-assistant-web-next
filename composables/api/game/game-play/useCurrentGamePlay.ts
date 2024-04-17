import type { Ref } from "vue";

import type { Game } from "~/composables/api/game/types/game.class";
import type { PlayerInteractionType } from "~/composables/api/game/types/players/player-interaction/player-interaction.types";
import type { Player } from "~/composables/api/game/types/players/player.class";

type UseCurrentGamePlay = {
  getEligibleTargetsWithInteractionInCurrentGamePlay: (interaction: PlayerInteractionType) => Player[] | undefined;
};

function useCurrentGamePlay(game: Ref<Game>): UseCurrentGamePlay {
  function getEligibleTargetsWithInteractionInCurrentGamePlay(interactionType: PlayerInteractionType): Player[] | undefined {
    if (game.value.currentPlay?.source.interactions === undefined) {
      return undefined;
    }
    const interaction = game.value.currentPlay.source.interactions.find(({ type }) => type === interactionType);
    if (interaction === undefined) {
      return undefined;
    }
    return interaction.eligibleTargets;
  }
  return { getEligibleTargetsWithInteractionInCurrentGamePlay };
}

export { useCurrentGamePlay };