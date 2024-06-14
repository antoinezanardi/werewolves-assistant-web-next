import type { AsyncDataRequestStatus } from "nuxt/app";
import { defineStore } from "pinia";

import { useFetchGameHistoryRecords } from "~/composables/api/game/game-history-record/useFetchGameHistoryRecords";
import type { GameHistoryRecord } from "~/composables/api/game/types/game-history-record/game-history-record.class";
import { StoreIds } from "~/stores/enums/store.enum";

const useGameHistoryRecordsStore = defineStore(StoreIds.GAME_HISTORY_RECORDS, () => {
  const { getGameHistoryRecords } = useFetchGameHistoryRecords();

  const gameHistoryRecords = ref<GameHistoryRecord[]>([]);
  const fetchingGameHistoryRecordsStatus = ref<AsyncDataRequestStatus>("idle");

  async function fetchAndSetGameHistoryRecords(gameId: string): Promise<void> {
    fetchingGameHistoryRecordsStatus.value = "pending";
    const fetchedGameHistoryRecords = await getGameHistoryRecords(gameId);
    if (!fetchedGameHistoryRecords) {
      fetchingGameHistoryRecordsStatus.value = "error";

      return;
    }
    gameHistoryRecords.value = fetchedGameHistoryRecords;
    fetchingGameHistoryRecordsStatus.value = "success";
  }
  return {
    gameHistoryRecords,
    fetchingGameHistoryRecordsStatus,
    fetchAndSetGameHistoryRecords,
  };
});

export { useGameHistoryRecordsStore };