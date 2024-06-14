import type { ComputedRef } from "vue";
import type { TempUseRoute } from "~/utils/types/temp.types";

type UseWerewolvesAssistantRoutes = {
  isOnGamePage: ComputedRef<boolean>;
};

function useWerewolvesAssistantRoutes(): UseWerewolvesAssistantRoutes {
  // TODO: Remove this comment when the issue is resolved.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const route = useRoute() as TempUseRoute;
  const isOnGamePage = computed<boolean>(() => route.name === "game-id");

  return { isOnGamePage };
}

export { useWerewolvesAssistantRoutes };