import type { Mock } from "vitest";

import { useFetchGames } from "~/composables/api/game/useFetchGames";
import * as UseWerewolvesAssistantApi from "~/composables/api/useWerewolvesAssistantApi";
import { createFakeCreateGameDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

describe("Use Fetch Game Composable", () => {
  let mocks: {
    composables: {
      useWerewolvesAssistantApi: {
        fetchWerewolvesAssistantApi: Mock;
      }
    }
  };

  beforeEach(() => {
    mocks = { composables: { useWerewolvesAssistantApi: { fetchWerewolvesAssistantApi: vi.fn() } } };
    const useWerewolvesAssistantApiMock = mocks.composables.useWerewolvesAssistantApi as unknown as ReturnType<typeof UseWerewolvesAssistantApi.useWerewolvesAssistantApi>;
    vi.spyOn(UseWerewolvesAssistantApi, "useWerewolvesAssistantApi").mockReturnValue(useWerewolvesAssistantApiMock);
  });

  describe("createGame", () => {
    it("should create game when called.", async() => {
      const createGameDto = createFakeCreateGameDto();
      await useFetchGames().createGame(createGameDto);
      const expectedOptions = { method: "POST", body: JSON.stringify(createGameDto) };

      expect(mocks.composables.useWerewolvesAssistantApi.fetchWerewolvesAssistantApi).toHaveBeenCalledExactlyOnceWith(`/games`, expectedOptions);
    });

    it("should return null when create game throws.", async() => {
      vi.spyOn(mocks.composables.useWerewolvesAssistantApi, "fetchWerewolvesAssistantApi").mockRejectedValue(undefined);
      const result = await useFetchGames().createGame(createFakeCreateGameDto());

      expect(result).toBeNull();
    });
  });

  describe("getGame", () => {
    it("should get game when called.", async() => {
      const gameId = "game-id";
      await useFetchGames().getGame(gameId);

      expect(mocks.composables.useWerewolvesAssistantApi.fetchWerewolvesAssistantApi).toHaveBeenCalledExactlyOnceWith(`/games/${gameId}`, { method: "GET" });
    });

    it("should return null when get game throws.", async() => {
      vi.spyOn(mocks.composables.useWerewolvesAssistantApi, "fetchWerewolvesAssistantApi").mockRejectedValue(new Error("error"));
      const result = await useFetchGames().getGame("game-id");

      expect(result).toBeNull();
    });
  });

  describe("cancelGame", () => {
    it("should cancel game when called.", async() => {
      const gameId = "game-id";
      await useFetchGames().cancelGame(gameId);

      expect(mocks.composables.useWerewolvesAssistantApi.fetchWerewolvesAssistantApi).toHaveBeenCalledExactlyOnceWith(`/games/${gameId}`, { method: "DELETE" });
    });

    it("should return null when cancel game throws.", async() => {
      vi.spyOn(mocks.composables.useWerewolvesAssistantApi, "fetchWerewolvesAssistantApi").mockRejectedValue(new Error("error"));
      const result = await useFetchGames().cancelGame("game-id");

      expect(result).toBeNull();
    });
  });
});