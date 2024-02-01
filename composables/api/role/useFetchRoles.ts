import type { UseFetchOptions } from "#app";

import { DEFAULT_USE_FETCH_OPTIONS } from "~/composables/api/api.constants";
import type { Role } from "~/composables/api/role/types/role.types";
import { removeTrailingSlashes } from "~/utils/url.utils";

type UseFetchRoles = {
  fetchRoles: (options?: UseFetchOptions<Role[]>) => Promise<ReturnType<typeof useFetch<Role[] | null>>>;
};

function useFetchRoles(): UseFetchRoles {
  const config = useRuntimeConfig();
  const baseUrl = removeTrailingSlashes(config.public.werewolvesAssistantApi.baseUrl);

  async function fetchRoles(options: UseFetchOptions<Role[]> = {}): Promise<ReturnType<typeof useFetch<Role[] | null>>> {
    return useFetch<Role[]>(`${baseUrl}/roles`, {
      method: "GET",
      ...DEFAULT_USE_FETCH_OPTIONS,
      ...options,
    });
  }
  return { fetchRoles };
}

export { useFetchRoles };