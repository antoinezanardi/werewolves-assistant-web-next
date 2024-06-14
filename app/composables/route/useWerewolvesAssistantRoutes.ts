import type { ComputedRef } from "vue";

type UseWerewolvesAssistantRoutes = {
  isOnGamePage: ComputedRef<boolean>;
};

function useWerewolvesAssistantRoutes(): UseWerewolvesAssistantRoutes {
  const route = useRoute();
  const isOnGamePage = computed<boolean>(() => route.name === "game-id");

  return { isOnGamePage };
}

export { useWerewolvesAssistantRoutes };