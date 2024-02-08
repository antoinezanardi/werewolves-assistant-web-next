import { createFetch } from "ofetch";

import { removeTrailingSlashes } from "~/utils/url.utils";

type UseWerewolvesAssistantApi = {
  fetchWerewolvesAssistantApi: typeof $fetch;
};

function useWerewolvesAssistantApi(): UseWerewolvesAssistantApi {
  const config = useRuntimeConfig();
  const { baseUrl } = config.public.werewolvesAssistantApi;

  const fetchWerewolvesAssistantApi = createFetch().create({
    baseURL: removeTrailingSlashes(baseUrl),
    headers: { "Content-Type": "application/json" },
  });

  return { fetchWerewolvesAssistantApi };
}

export { useWerewolvesAssistantApi };