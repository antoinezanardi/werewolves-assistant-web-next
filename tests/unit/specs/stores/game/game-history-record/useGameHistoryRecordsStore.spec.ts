import { createPinia, setActivePinia } from "pinia";

import * as UseFetchGameHistoryRecords from "~/composables/api/game/game-history-record/useFetchGameHistoryRecords";
import type { GameHistoryRecord } from "~/composables/api/game/types/game-history-record/game-history-record.class";
import { useGameHistoryRecordsStore } from "~/stores/game/game-history-record/useGameHistoryRecordsStore";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeUseFetchGameHistoryRecords } from "@tests/unit/utils/factories/composables/api/game/game-history-record/useFetchGameHistoryRecords.factory";

describe("Game History Records Store", () => {
  let mocks: {
    composables: {
      useFetchGameHistoryRecords: ReturnType<typeof createFakeUseFetchGameHistoryRecords>;
    };
  };

  beforeEach(() => {
    mocks = { composables: { useFetchGameHistoryRecords: createFakeUseFetchGameHistoryRecords() } };
    vi.spyOn(UseFetchGameHistoryRecords, "useFetchGameHistoryRecords").mockImplementation(() => mocks.composables.useFetchGameHistoryRecords);
    setActivePinia(createPinia());
  });

  it("should have initial state when created.", () => {
    const gameHistoryRecordsStore = useGameHistoryRecordsStore();

    expect(gameHistoryRecordsStore.gameHistoryRecords).toStrictEqual<GameHistoryRecord[]>([]);
    expect(gameHistoryRecordsStore.fetchingGameHistoryRecordsStatus).toBe("idle");
  });

  describe("fetchAndSetGameHistoryRecords", () => {
    it("should fetch game history records when called.", async() => {
      const gameHistoryRecordsStore = useGameHistoryRecordsStore();
      await gameHistoryRecordsStore.fetchAndSetGameHistoryRecords("gameId");

      expect(mocks.composables.useFetchGameHistoryRecords.getGameHistoryRecords).toHaveBeenCalledExactlyOnceWith("gameId");
    });

    it("should set game history records when called.", async() => {
      const expectedGameHistoryRecords = [
        createFakeGameHistoryRecord(),
        createFakeGameHistoryRecord(),
        createFakeGameHistoryRecord(),
      ];
      mocks.composables.useFetchGameHistoryRecords.getGameHistoryRecords.mockResolvedValue(expectedGameHistoryRecords);
      const gameHistoryRecordsStore = useGameHistoryRecordsStore();
      await gameHistoryRecordsStore.fetchAndSetGameHistoryRecords("gameId");

      expect(gameHistoryRecordsStore.gameHistoryRecords).toStrictEqual<GameHistoryRecord[]>(expectedGameHistoryRecords);
    });
  });
});