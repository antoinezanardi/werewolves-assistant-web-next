import type { Role } from "~/composables/api/role/types/role.class";
import { useWerewolvesAssistantApi } from "~/composables/api/useWerewolvesAssistantApi";

type UseFetchRoles = {
  fetchRoles: () => Promise<ReturnType<typeof $fetch<Role[] | null>>>;
};

function useFetchRoles(): UseFetchRoles {
  const { fetchWerewolvesAssistantApi } = useWerewolvesAssistantApi();

  async function fetchRoles(): Promise<ReturnType<typeof $fetch<Role[] | null>>> {
    return fetchWerewolvesAssistantApi<Role[] | null>(`/roles`, { method: "GET" });
  }
  return { fetchRoles };
}

export { useFetchRoles };