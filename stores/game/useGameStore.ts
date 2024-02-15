import type { AsyncDataRequestStatus } from "#app/composables/asyncData";
import { defineStore } from "pinia";

import { Game } from "~/composables/api/game/types/game.class";
import { useFetchGames } from "~/composables/api/game/useFetchGames";
import { StoreIds } from "~/stores/enums/store.enum";

const useGameStore = defineStore(StoreIds.GAME, () => {
  const { getGame: fetchGameFromApi } = useFetchGames();

  const game = ref<Game>(new Game());
  const fetchingGameStatus = ref<AsyncDataRequestStatus>("idle");

  async function fetchAndSetGame(gameId: string): Promise<void> {
    fetchingGameStatus.value = "pending";
    const fetchedGame = await fetchGameFromApi(gameId);
    if (!fetchedGame) {
      fetchingGameStatus.value = "error";

      return;
    }
    game.value = fetchedGame;
    fetchingGameStatus.value = "success";
  }
  return {
    game,
    fetchingGameStatus,
    fetchAndSetGame,
  };
});

export { useGameStore };