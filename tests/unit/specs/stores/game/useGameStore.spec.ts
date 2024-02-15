import { createPinia, setActivePinia } from "pinia";
import type { Mock } from "vitest";

import * as UseFetchGames from "~/composables/api/game/useFetchGames";
import { Game } from "~/composables/api/game/types/game.class";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";

describe("Game Store", () => {
  let mocks: {
    composables: {
      useFetchGames: {
        getGame: Mock;
        createGame: Mock;
      }
    }
  };

  beforeEach(() => {
    mocks = {
      composables: {
        useFetchGames: {
          createGame: vi.fn(),
          getGame: vi.fn(),
        },
      },
    };
    vi.spyOn(UseFetchGames, "useFetchGames").mockImplementation(() => mocks.composables.useFetchGames);
    setActivePinia(createPinia());
  });

  it("should have initial state when created.", () => {
    const gameStore = useGameStore();
    const expectedGame = new Game();

    expect(gameStore.game).toStrictEqual<Game>(expectedGame);
    expect(gameStore.fetchingGameStatus).toBe("idle");
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
});