import type { ComputedRef, Ref } from "vue";

import type { MakeGamePlayDto } from "~/composables/api/game/dto/make-game-play/make-game-play.dto";
import type { Game } from "~/composables/api/game/types/game.class";

type UseMakeGamePlayDtoValidation = {
  canMakeGamePlay: ComputedRef<boolean>;
};

function useMakeGamePlayDtoValidation(makeGamePlayDto: Ref<MakeGamePlayDto>, game: Ref<Game>): UseMakeGamePlayDtoValidation {
  const canCurrentPlayBeSkipped = computed<boolean>(() => game.value.currentPlay?.canBeSkipped === true);

  const canMakeGamePlay = computed<boolean>(() => canCurrentPlayBeSkipped.value);

  return { canMakeGamePlay };
}

export { useMakeGamePlayDtoValidation };