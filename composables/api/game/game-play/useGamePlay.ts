import type { ComputedRef, Ref } from "vue";

import type { GamePlayAction, GamePlayType } from "~/composables/api/game/types/game-play/game-play.types";
import type { Game } from "~/composables/api/game/types/game.class";

type UseGamePlay = {
  currentPlayType: ComputedRef<GamePlayType | undefined>;
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
    };
    for (const key of Object.keys(gamePlayTypesActions)) {
      const gamePlayType = key as GamePlayType;
      if (gamePlayTypesActions[gamePlayType as GamePlayType].includes(game.value.currentPlay.action)) {
        return gamePlayType;
      }
    }
    return undefined;
  });

  return { currentPlayType };
}

export { useGamePlay };