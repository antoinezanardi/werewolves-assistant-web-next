import type { ComputedRef, Ref } from "vue";

import type { MakeGamePlayDto } from "~/composables/api/game/dto/make-game-play/make-game-play.dto";
import type { Game } from "~/composables/api/game/types/game.class";

type UseMakeGamePlayDtoValidation = {
  isCurrentGamePlayVoteTypeAndValid: ComputedRef<boolean>;
  isCurrentGamePlayTargetTypeAndValid: ComputedRef<boolean>;
  isCurrentGamePlayChooseCardTypeAndValid: ComputedRef<boolean>;
  isCurrentGamePlayChooseSideTypeAndValid: ComputedRef<boolean>;
  canCurrentPlayBeSkipped: ComputedRef<boolean>;
  canMakeGamePlay: ComputedRef<boolean>;
};

function useMakeGamePlayDtoValidation(makeGamePlayDto: Ref<MakeGamePlayDto>, game: Ref<Game>): UseMakeGamePlayDtoValidation {
  const isCurrentGamePlayVoteTypeAndValid = computed<boolean>(() => {
    if (game.value.currentPlay?.type !== "vote" || makeGamePlayDto.value.votes === undefined) {
      return false;
    }
    const voteInteraction = game.value.currentPlay.source.interactions?.[0];
    if (voteInteraction === undefined) {
      return false;
    }
    const { votes } = makeGamePlayDto.value;

    return votes.length >= voteInteraction.boundaries.min;
  });

  const isCurrentGamePlayTargetTypeAndValid = computed<boolean>(() => {
    if (game.value.currentPlay?.type !== "target" || makeGamePlayDto.value.targets === undefined) {
      return false;
    }

    const targetInteraction = game.value.currentPlay.source.interactions?.[0];
    if (targetInteraction === undefined) {
      return false;
    }
    const { targets } = makeGamePlayDto.value;

    return targets.length >= targetInteraction.boundaries.min;
  });

  const isCurrentGamePlayChooseCardTypeAndValid = computed<boolean>(() => game.value.currentPlay?.type === "choose-card" && makeGamePlayDto.value.chosenCardId !== undefined);

  const isCurrentGamePlayChooseSideTypeAndValid = computed<boolean>(() => game.value.currentPlay?.type === "choose-side" && makeGamePlayDto.value.chosenSide !== undefined);

  const canCurrentPlayBeSkipped = computed<boolean>(() => game.value.currentPlay?.canBeSkipped === true);

  const canMakeGamePlay = computed<boolean>(() => canCurrentPlayBeSkipped.value ||
    isCurrentGamePlayVoteTypeAndValid.value ||
    isCurrentGamePlayTargetTypeAndValid.value ||
    isCurrentGamePlayChooseCardTypeAndValid.value ||
    isCurrentGamePlayChooseSideTypeAndValid.value);

  return {
    isCurrentGamePlayVoteTypeAndValid,
    isCurrentGamePlayTargetTypeAndValid,
    isCurrentGamePlayChooseCardTypeAndValid,
    isCurrentGamePlayChooseSideTypeAndValid,
    canCurrentPlayBeSkipped,
    canMakeGamePlay,
  };
}

export { useMakeGamePlayDtoValidation };