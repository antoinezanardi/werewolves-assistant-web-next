import type { AsyncDataRequestStatus } from "nuxt/app";
import { defineStore } from "pinia";

import type { CreateGameFeedbackDto } from "~/composables/api/game/dto/create-game-feedback/create-game-feedback.dto";
import type { MakeGamePlayDto } from "~/composables/api/game/dto/make-game-play/make-game-play.dto";
import type { GameOptions } from "~/composables/api/game/types/game-options/game-options.class";
import { Game } from "~/composables/api/game/types/game.class";
import { useFetchGames } from "~/composables/api/game/useFetchGames";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";

const useGameStore = defineStore(StoreIds.GAME, () => {
  const {
    getGame: fetchGameFromApi,
    cancelGame: cancelGameFromApi,
    makeGamePlay: makeGamePlayFromApi,
    createGameFeedback: createGameFeedbackFromApi,
  } = useFetchGames();

  const game = ref<Game>(new Game());
  const gameOptions = computed<GameOptions>(() => game.value.options);

  const gamePlayerGroups = computed<string[]>(() => game.value.playerGroups ?? []);

  const fetchingGameStatus = ref<AsyncDataRequestStatus>("idle");
  const cancelingGameStatus = ref<AsyncDataRequestStatus>("idle");
  const makingGamePlayStatus = ref<AsyncDataRequestStatus>("idle");
  const creatingGameFeedbackStatus = ref<AsyncDataRequestStatus>("idle");

  const { resetGameEventIndex } = useGameEventsStore();

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
    resetGameEventIndex();
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
    resetGameEventIndex();
    game.value = playedGame;
    makingGamePlayStatus.value = "success";
  }

  async function skipGamePlay(): Promise<void> {
    return makeGamePlay({});
  }

  async function createGameFeedback(createGameFeedbackDto: CreateGameFeedbackDto): Promise<void> {
    creatingGameFeedbackStatus.value = "pending";
    const gameWithFeedback = await createGameFeedbackFromApi(game.value._id, createGameFeedbackDto);
    if (!gameWithFeedback) {
      creatingGameFeedbackStatus.value = "error";

      return;
    }
    game.value = gameWithFeedback;
    creatingGameFeedbackStatus.value = "success";
  }
  return {
    game,
    gameOptions,
    gamePlayerGroups,
    fetchingGameStatus,
    cancelingGameStatus,
    makingGamePlayStatus,
    creatingGameFeedbackStatus,
    resetGame,
    fetchAndSetGame,
    cancelGame,
    makeGamePlay,
    skipGamePlay,
    createGameFeedback,
  };
});

export { useGameStore };