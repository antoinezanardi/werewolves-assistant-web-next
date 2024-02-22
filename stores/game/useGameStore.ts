import type { AsyncDataRequestStatus } from "#app/composables/asyncData";
import { defineStore } from "pinia";

import { Game } from "~/composables/api/game/types/game.class";
import { useFetchGames } from "~/composables/api/game/useFetchGames";
import { StoreIds } from "~/stores/enums/store.enum";

const useGameStore = defineStore(StoreIds.GAME, () => {
  const { getGame: fetchGameFromApi, cancelGame: cancelGameFromApi } = useFetchGames();

  const game = ref<Game>(new Game());
  const fetchingGameStatus = ref<AsyncDataRequestStatus>("idle");
  const cancelingGameStatus = ref<AsyncDataRequestStatus>("idle");

  function resetGame(): void {
    game.value = new Game();
  }

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

  async function cancelGame(gameId: string): Promise<void> {
    cancelingGameStatus.value = "pending";
    const canceledGame = await cancelGameFromApi(gameId);
    if (!canceledGame) {
      fetchingGameStatus.value = "error";

      return;
    }
    game.value = canceledGame;
    cancelingGameStatus.value = "success";
  }
  return {
    game,
    fetchingGameStatus,
    cancelingGameStatus,
    resetGame,
    fetchAndSetGame,
    cancelGame,
  };
});

export { useGameStore };