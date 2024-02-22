import { stringify } from "qs";

import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import type { RoleNames } from "~/composables/api/role/enums/role.enums";
import { useWerewolvesAssistantApi } from "~/composables/api/useWerewolvesAssistantApi";

type GetRandomGameCompositionQuery = {
  players: { name: string }[];
  excludedRoles?: RoleNames[];
};

type UseFetchRandomGameComposition = {
  fetchRandomGameComposition: (
    query: GetRandomGameCompositionQuery,
  ) => Promise<ReturnType<typeof $fetch<CreateGamePlayerDto[] | null>>>;
};

function useFetchRandomGameComposition(): UseFetchRandomGameComposition {
  const { fetchWerewolvesAssistantApi } = useWerewolvesAssistantApi();

  async function fetchRandomGameComposition(query: GetRandomGameCompositionQuery): Promise<ReturnType<typeof $fetch<CreateGamePlayerDto[] | null>>> {
    const stringifiedQuery = stringify(query);

    return fetchWerewolvesAssistantApi<CreateGamePlayerDto[] | null>(`/games/random-composition?${stringifiedQuery}`, { method: "GET" });
  }
  return { fetchRandomGameComposition };
}

export { useFetchRandomGameComposition };