import { createPinia, setActivePinia } from "pinia";

import { Game } from "~/composables/api/game/types/game.class";
import * as UseFetchGames from "~/composables/api/game/useFetchGames";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeUseFetchGames } from "~/tests/unit/utils/factories/composables/api/game/useFetchGames.factory";

describe("Game Store", () => {
  let mocks: {
    composables: {
      useFetchGames: ReturnType<typeof createFakeUseFetchGames>
    }
  };

  beforeEach(() => {
    mocks = { composables: { useFetchGames: createFakeUseFetchGames() } };
    vi.spyOn(UseFetchGames, "useFetchGames").mockImplementation(() => mocks.composables.useFetchGames);
    setActivePinia(createPinia());
  });

  it("should have initial state when created.", () => {
    const gameStore = useGameStore();
    const expectedGame = new Game();

    expect(gameStore.game).toStrictEqual<Game>(expectedGame);
    expect(gameStore.fetchingGameStatus).toBe("idle");
  });

  describe("resetGame", () => {
    it("should reset game when called.", () => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame();
      gameStore.resetGame();

      expect(gameStore.game).toStrictEqual<Game>(new Game());
    });
  });

  describe("fetchAndSetGame", () => {
    it("should fetch game when called.", async() => {
      const gameStore = useGameStore();
      await gameStore.fetchAndSetGame("gameId");

      expect(mocks.composables.useFetchGames.getGame).toHaveBeenCalledExactlyOnceWith("gameId");
    });

    it("should set game when called.", async() => {
      const game = createFakeGame();
      mocks.composables.useFetchGames.getGame.mockResolvedValue(game);
      const gameStore = useGameStore();
      await gameStore.fetchAndSetGame("gameId");

      expect(gameStore.game).toStrictEqual<Game>(game);
    });
  });

  describe("cancelGame", () => {
    it("should cancel game when called.", async() => {
      const gameStore = useGameStore();
      await gameStore.cancelGame("gameId");

      expect(mocks.composables.useFetchGames.cancelGame).toHaveBeenCalledExactlyOnceWith("gameId");
    });

    it("should set game when called.", async() => {
      const game = createFakeGame();
      mocks.composables.useFetchGames.cancelGame.mockResolvedValue(game);
      const gameStore = useGameStore();
      await gameStore.cancelGame("gameId");

      expect(gameStore.game).toStrictEqual<Game>(game);
    });
  });
});