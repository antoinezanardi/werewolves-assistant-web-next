import type { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import type { Game } from "~/composables/api/game/types/game.class";
import { useWerewolvesAssistantApi } from "~/composables/api/useWerewolvesAssistantApi";

type UseFetchGames = {
  createGame: (createGameDto: CreateGameDto) => Promise<ReturnType<typeof $fetch<Game>> | null>;
  getGame: (gameId: string) => Promise<ReturnType<typeof $fetch<Game>> | null>;
};

function useFetchGames(): UseFetchGames {
  const { fetchWerewolvesAssistantApi } = useWerewolvesAssistantApi();

  async function createGame(createGameDto: CreateGameDto): Promise<ReturnType<typeof $fetch<Game>> | null> {
    try {
      return await fetchWerewolvesAssistantApi<Game>(`/games`, {
        method: "POST",
        body: JSON.stringify(createGameDto),
      });
    } catch (error) {
      return null;
    }
  }

  async function getGame(gameId: string): Promise<ReturnType<typeof $fetch<Game>> | null> {
    try {
      return await fetchWerewolvesAssistantApi<Game>(`/games/${gameId}`, { method: "GET" });
    } catch (error) {
      return null;
    }
  }
  return {
    createGame,
    getGame,
  };
}

export { useFetchGames };