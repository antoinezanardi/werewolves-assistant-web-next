import type { RouteLocationNormalizedLoaded } from "vue-router";

function createFakeUseRoute(useRoute: Partial<RouteLocationNormalizedLoaded> = {}): RouteLocationNormalizedLoaded {
  return {
    fullPath: "/",
    hash: "",
    meta: {},
    name: "index",
    params: {},
    path: "/",
    query: {},
    matched: [],
    redirectedFrom: undefined,
    ...useRoute,
  };
}

export { createFakeUseRoute };