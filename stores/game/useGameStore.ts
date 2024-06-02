import type { AsyncDataRequestStatus } from "#app/composables/asyncData";
import { defineStore } from "pinia";

import type { MakeGamePlayDto } from "~/composables/api/game/dto/make-game-play/make-game-play.dto";
import { Game } from "~/composables/api/game/types/game.class";
import { useFetchGames } from "~/composables/api/game/useFetchGames";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";

const useGameStore = defineStore(StoreIds.GAME, () => {
  const {
    getGame: fetchGameFromApi,
    cancelGame: cancelGameFromApi,
    makeGamePlay: makeGamePlayFromApi,
  } = useFetchGames();

  const game = ref<Game>(new Game());
  const fetchingGameStatus = ref<AsyncDataRequestStatus>("idle");
  const cancelingGameStatus = ref<AsyncDataRequestStatus>("idle");
  const makingGamePlayStatus = ref<AsyncDataRequestStatus>("idle");

  const { generateAndSetGameEventsFromGame } = useGameEventsStore();

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
    generateAndSetGameEventsFromGame(fetchedGame);
    game.value = fetchedGame;
    fetchingGameStatus.value = "success";
  }

  async function cancelGame(): Promise<void> {
    cancelingGameStatus.value = "pending";
    const canceledGame = await cancelGameFromApi(game.value._id);
    if (!canceledGame) {
      fetchingGameStatus.value = "error";

      return;
    }
    game.value = canceledGame;
    cancelingGameStatus.value = "success";
  }

  async function makeGamePlay(makeGamePlayDto: MakeGamePlayDto): Promise<void> {
    makingGamePlayStatus.value = "pending";
    const playedGame = await makeGamePlayFromApi(game.value._id, makeGamePlayDto);
    if (!playedGame) {
      fetchingGameStatus.value = "error";

      return;
    }
    generateAndSetGameEventsFromGame(playedGame);
    game.value = playedGame;
    makingGamePlayStatus.value = "success";
  }

  async function skipGamePlay(): Promise<void> {
    return makeGamePlay({});
  }
  return {
    game,
    fetchingGameStatus,
    cancelingGameStatus,
    makingGamePlayStatus,
    resetGame,
    fetchAndSetGame,
    cancelGame,
    makeGamePlay,
    skipGamePlay,
  };
});

export { useGameStore };