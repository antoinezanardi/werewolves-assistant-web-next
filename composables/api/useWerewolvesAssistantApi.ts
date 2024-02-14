import { createFetch } from "ofetch";

import { useWerewolvesAssistantApiError } from "~/composables/api/error/useWerewolvesAssistantApiError";
import { removeTrailingSlashes } from "~/utils/url.utils";

type UseWerewolvesAssistantApi = {
  fetchWerewolvesAssistantApi: typeof $fetch;
};

function useWerewolvesAssistantApi(): UseWerewolvesAssistantApi {
  const config = useRuntimeConfig();
  const { baseUrl } = config.public.werewolvesAssistantApi;
  const { handleWerewolvesAssistantApiError } = useWerewolvesAssistantApiError();

  const fetchWerewolvesAssistantApi = createFetch().create({
    baseURL: removeTrailingSlashes(baseUrl),
    headers: { "Content-Type": "application/json" },
    onResponseError: handleWerewolvesAssistantApiError,
  });

  return { fetchWerewolvesAssistantApi };
}

export { useWerewolvesAssistantApi };