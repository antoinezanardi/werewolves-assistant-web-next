import type { $Fetch } from "nitropack";

import { useFetchGames } from "~/composables/api/game/useFetchGames";
import * as UseWerewolvesAssistantApi from "~/composables/api/useWerewolvesAssistantApi";
import { createFakeCreateGameDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

describe("Use Fetch Game Composable", () => {
  let mocks: {
    composables: {
      useWerewolvesAssistantApi: {
        fetchWerewolvesAssistantApi: $Fetch;
      }
    }
  };

  beforeEach(() => {
    mocks = { composables: { useWerewolvesAssistantApi: { fetchWerewolvesAssistantApi: vi.fn() as unknown as $Fetch } } };
    vi.spyOn(UseWerewolvesAssistantApi, "useWerewolvesAssistantApi").mockReturnValue(mocks.composables.useWerewolvesAssistantApi);
  });

  describe("createGame", () => {
    it("should create game when called.", async() => {
      const createGameDto = createFakeCreateGameDto();
      await useFetchGames().createGame(createGameDto);
      const expectedOptions = { method: "POST", body: createGameDto };

      expect(mocks.composables.useWerewolvesAssistantApi.fetchWerewolvesAssistantApi).toHaveBeenCalledExactlyOnceWith(`/games`, expectedOptions);
    });
  });

  describe("getGame", () => {
    it("should get game when called.", async() => {
      const gameId = "game-id";
      await useFetchGames().getGame(gameId);

      expect(mocks.composables.useWerewolvesAssistantApi.fetchWerewolvesAssistantApi).toHaveBeenCalledExactlyOnceWith(`/games/${gameId}`, { method: "GET" });
    });
  });
});