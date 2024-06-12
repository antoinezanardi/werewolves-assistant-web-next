import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { RouteLocationNormalizedLoaded } from "vue-router";
import { useWerewolvesAssistantRoutes } from "~/composables/route/useWerewolvesAssistantRoutes";

const { mockedUseRoute } = vi.hoisted(() => ({ mockedUseRoute: { name: "home" } }));

describe("Use Werewolves Assistant Routes Composable", () => {
  beforeEach(() => {
    mockNuxtImport<typeof useRoute>("useRoute", () => vi.fn(() => mockedUseRoute as RouteLocationNormalizedLoaded));
  });

  describe("isOnGamePage", () => {
    it("should be set to true when route name is game.", () => {
      const route = useRoute();
      route.name = "game-id";
      const { isOnGamePage } = useWerewolvesAssistantRoutes();

      expect(isOnGamePage.value).toBeTruthy();
    });

    it("should be set to false when route name is not game.", () => {
      const route = useRoute();
      route.name = "home";
      const { isOnGamePage } = useWerewolvesAssistantRoutes();

      expect(isOnGamePage.value).toBeFalsy();
    });
  });
});