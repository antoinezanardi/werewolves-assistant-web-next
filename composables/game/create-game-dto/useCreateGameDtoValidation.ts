import type { ComputedRef, Ref } from "vue";

import { MIN_PLAYERS_IN_GAME } from "~/composables/api/game/constants/game.constants";
import type { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";

type UseCreateGameDtoValidation = {
  isMinimumPlayersReached: ComputedRef<boolean>;
  areAllRolesSet: ComputedRef<boolean>;
  canCreateGame: ComputedRef<boolean>;
};

function useCreateGameDtoValidation(createGameDto: Ref<CreateGameDto>): UseCreateGameDtoValidation {
  const isMinimumPlayersReached = computed<boolean>(() => createGameDto.value.players.length >= MIN_PLAYERS_IN_GAME);

  const areAllRolesSet = computed<boolean>(() => createGameDto.value.players.every(player => player.role.name !== undefined));

  const canCreateGame = computed<boolean>(() => isMinimumPlayersReached.value && areAllRolesSet.value);

  return {
    isMinimumPlayersReached,
    areAllRolesSet,
    canCreateGame,
  };
}

export { useCreateGameDtoValidation };