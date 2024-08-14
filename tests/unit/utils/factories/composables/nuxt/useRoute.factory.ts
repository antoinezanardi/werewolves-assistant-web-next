import { createFakeLocationNormalizedGuard } from "@tests/unit/utils/factories/composables/nuxt/useRouter.factory";
import type { RouteLocationNormalizedLoaded } from "vue-router";

function createFakeUseRoute(useRoute: Partial<RouteLocationNormalizedLoaded> = {}): RouteLocationNormalizedLoaded {
  return {
    ...createFakeLocationNormalizedGuard(useRoute),
    ...useRoute,
  };
}

export { createFakeUseRoute };