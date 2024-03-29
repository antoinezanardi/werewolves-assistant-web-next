import type { Mock } from "vitest";

import { useFetchGameHistoryRecords } from "~/composables/api/game/game-history-record/useFetchGameHistoryRecords";
import * as UseWerewolvesAssistantApi from "~/composables/api/useWerewolvesAssistantApi";

describe("Use Fetch Game History Records", () => {
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

  describe("getGameHistoryRecords", () => {
    it("should get game history records when called.", async() => {
      const gameId = "gameId";
      await useFetchGameHistoryRecords().getGameHistoryRecords(gameId);

      expect(mocks.composables.useWerewolvesAssistantApi.fetchWerewolvesAssistantApi).toHaveBeenCalledExactlyOnceWith(`/games/${gameId}/history`, { method: "GET" });
    });

    it("should return null when an error is thrown.", async() => {
      mocks.composables.useWerewolvesAssistantApi.fetchWerewolvesAssistantApi.mockRejectedValue(undefined);
      const gameId = "gameId";
      const result = await useFetchGameHistoryRecords().getGameHistoryRecords(gameId);

      expect(result).toBeNull();
    });
  });
});