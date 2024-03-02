import type { ComputedRef, Ref } from "vue";

import type { MakeGamePlayDto } from "~/composables/api/game/dto/make-game-play/make-game-play.dto";
import type { GamePlayAction, GamePlayType } from "~/composables/api/game/types/game-play/game-play.types";
import type { Game } from "~/composables/api/game/types/game.class";

type UseMakeGamePlayDtoValidation = {
  currentPlayType: ComputedRef<GamePlayType | undefined>;
  isCurrentGamePlayVoteTypeAndValid: ComputedRef<boolean>;
  isCurrentGamePlayTargetTypeAndValid: ComputedRef<boolean>;
  isCurrentGamePlayChooseCardTypeAndValid: ComputedRef<boolean>;
  isCurrentGamePlayChooseSideTypeAndValid: ComputedRef<boolean>;
  canCurrentPlayBeSkipped: ComputedRef<boolean>;
  canMakeGamePlay: ComputedRef<boolean>;
};

function useMakeGamePlayDtoValidation(makeGamePlayDto: Ref<MakeGamePlayDto>, game: Ref<Game>): UseMakeGamePlayDtoValidation {
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
    for (const gamePlayType in gamePlayTypesActions) {
      if (gamePlayTypesActions[gamePlayType].includes(game.value.currentPlay.action)) {
        return gamePlayType;
      }
    }
    return undefined;
  });

  const isCurrentGamePlayVoteTypeAndValid = computed<boolean>(() => {
    if (currentPlayType.value !== "vote" || game.value.currentPlay?.eligibleTargets?.boundaries === undefined || makeGamePlayDto.value.votes === undefined) {
      return false;
    }
    const { boundaries } = game.value.currentPlay.eligibleTargets;
    const { votes } = makeGamePlayDto.value;

    return votes.length >= boundaries.min;
  });

  const isCurrentGamePlayTargetTypeAndValid = computed<boolean>(() => {
    if (currentPlayType.value !== "target" || game.value.currentPlay?.eligibleTargets?.boundaries === undefined || makeGamePlayDto.value.targets === undefined) {
      return false;
    }
    const { boundaries } = game.value.currentPlay.eligibleTargets;
    const { targets } = makeGamePlayDto.value;

    return targets.length >= boundaries.min;
  });

  const isCurrentGamePlayChooseCardTypeAndValid = computed<boolean>(() => currentPlayType.value === "choose-card" && makeGamePlayDto.value.chosenCardId !== undefined);

  const isCurrentGamePlayChooseSideTypeAndValid = computed<boolean>(() => currentPlayType.value === "choose-side" && makeGamePlayDto.value.chosenSide !== undefined);

  const canCurrentPlayBeSkipped = computed<boolean>(() => game.value.currentPlay?.canBeSkipped === true);

  const canMakeGamePlay = computed<boolean>(() => canCurrentPlayBeSkipped.value ||
    isCurrentGamePlayVoteTypeAndValid.value ||
    isCurrentGamePlayTargetTypeAndValid.value ||
    isCurrentGamePlayChooseCardTypeAndValid.value ||
    isCurrentGamePlayChooseSideTypeAndValid.value);

  return {
    currentPlayType,
    isCurrentGamePlayVoteTypeAndValid,
    isCurrentGamePlayTargetTypeAndValid,
    isCurrentGamePlayChooseCardTypeAndValid,
    isCurrentGamePlayChooseSideTypeAndValid,
    canCurrentPlayBeSkipped,
    canMakeGamePlay,
  };
}

export { useMakeGamePlayDtoValidation };