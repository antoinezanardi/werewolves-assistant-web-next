import type { GameHistoryRecord } from "~/composables/api/game/types/game-history-record/game-history-record.class";
import { useWerewolvesAssistantApi } from "~/composables/api/useWerewolvesAssistantApi";

type UseFetchGameHistory = {
  getGameHistoryRecords: (gameId: string) => Promise<ReturnType<typeof $fetch<GameHistoryRecord[]>> | null>;
};

function useFetchGameHistoryRecords(): UseFetchGameHistory {
  const { fetchWerewolvesAssistantApi } = useWerewolvesAssistantApi();

  async function getGameHistoryRecords(gameId: string): Promise<ReturnType<typeof $fetch<GameHistoryRecord[]>> | null> {
    try {
      return await fetchWerewolvesAssistantApi<GameHistoryRecord[]>(`/games/${gameId}/history`, { method: "GET" });
    } catch (error) {
      return null;
    }
  }
  return { getGameHistoryRecords };
}

export { useFetchGameHistoryRecords };