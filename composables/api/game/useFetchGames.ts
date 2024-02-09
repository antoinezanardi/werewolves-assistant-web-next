import type { CreateGameDto } from "~/composables/api/game/dto/create-game/create-game.dto";
import type { Game } from "~/composables/api/game/types/game.class";
import { useWerewolvesAssistantApi } from "~/composables/api/useWerewolvesAssistantApi";

type UseFetchGames = {
  createGame: (createGameDto: CreateGameDto) => Promise<ReturnType<typeof $fetch<Game | null>>>;
  getGame: (gameId: string) => Promise<ReturnType<typeof $fetch<Game | null>>>;
};

function useFetchGames(): UseFetchGames {
  const { fetchWerewolvesAssistantApi } = useWerewolvesAssistantApi();

  async function createGame(createGameDto: CreateGameDto): Promise<ReturnType<typeof $fetch<Game | null>>> {
    return fetchWerewolvesAssistantApi<Game | null>(`/games`, {
      method: "POST",
      body: JSON.stringify(createGameDto),
    });
  }

  async function getGame(gameId: string): Promise<ReturnType<typeof $fetch<Game | null>>> {
    return fetchWerewolvesAssistantApi<Game | null>(`/games/${gameId}`, { method: "GET" });
  }
  return {
    createGame,
    getGame,
  };
}

export { useFetchGames };