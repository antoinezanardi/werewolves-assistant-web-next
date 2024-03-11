import type { ComputedRef, Ref } from "vue";

import type { PlayerInteraction } from "~/composables/api/game/types/game-play/game-play-eligible-targets/interactable-player/player-interaction/player-interaction.class";
import type { GamePlayAction, GamePlayType } from "~/composables/api/game/types/game-play/game-play.types";
import type { Game } from "~/composables/api/game/types/game.class";
import type { Player } from "~/composables/api/game/types/players/player.class";

type UseGamePlay = {
  currentPlayType: ComputedRef<GamePlayType | undefined>;
  getPlayerWithInteractionInCurrentGamePlay: (interaction: PlayerInteraction) => Player | undefined;
};

function useGamePlay(game: Ref<Game>): UseGamePlay {
  const currentPlayType = computed<GamePlayType | undefined>(() => {
    if (game.value.currentPlay === null) {
      return undefined;
    }
    const gamePlayTypesActions: Record<GamePlayType, GamePlayAction[]> = {
      "no-action": [
        "meet-each-other",
        "growl",
      ],
      "vote": [
        "vote",
        "elect-sheriff",
      ],
      "target": [
        "eat",
        "look",
        "charm",
        "use-potions",
        "shoot",
        "protect",
        "mark",
        "sniff",
        "choose-model",
        "ban-voting",
        "delegate",
        "settle-votes",
        "infect",
      ],
      "choose-card": ["choose-card"],
      "choose-side": ["choose-side"],
      "request-another-vote": ["request-another-vote"],
      "bury-dead-bodies": ["bury-dead-bodies"],
    };
    for (const key of Object.keys(gamePlayTypesActions)) {
      const gamePlayType = key as GamePlayType;
      if (gamePlayTypesActions[gamePlayType as GamePlayType].includes(game.value.currentPlay.action)) {
        return gamePlayType;
      }
    }
    return undefined;
  });

  function getPlayerWithInteractionInCurrentGamePlay(interaction: PlayerInteraction): Player | undefined {
    if (!game.value.currentPlay?.eligibleTargets?.interactablePlayers) {
      return undefined;
    }
    const { interactablePlayers } = game.value.currentPlay.eligibleTargets;
    for (const interactablePlayer of interactablePlayers) {
      const { interactions, player } = interactablePlayer;
      const playerInteraction = interactions.find(({ type, source }) => type === interaction.type && source === interaction.source);
      if (playerInteraction) {
        return player;
      }
    }
    return undefined;
  }
  return {
    currentPlayType,
    getPlayerWithInteractionInCurrentGamePlay,
  };
}

export { useGamePlay };