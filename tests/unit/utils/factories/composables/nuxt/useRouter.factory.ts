import type { RouteLocationNormalizedGeneric } from "#vue-router";
import { faker } from "@faker-js/faker";
import { vi } from "vitest";

function createFakeLocationNormalizedGuard(guard: Partial<RouteLocationNormalizedGeneric>): RouteLocationNormalizedGeneric {
  return {
    fullPath: guard.fullPath ?? faker.internet.url(),
    hash: guard.hash ?? faker.internet.url(),
    meta: guard.meta ?? {},
    name: guard.name ?? faker.word.sample(),
    params: guard.params ?? {},
    path: guard.path ?? faker.internet.url(),
    query: guard.query ?? {},
    matched: guard.matched ?? [],
    redirectedFrom: guard.redirectedFrom,
  };
}

function createFakeUseRouter(): Partial<ReturnType<typeof useRouter>> {
  return {
    beforeEach: vi.fn(),
    beforeResolve: vi.fn(),
    onError: vi.fn(),
    afterEach: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    resolve: vi.fn().mockReturnValue({}),
    addRoute: vi.fn().mockReturnValue(vi.fn()),
  };
}

export {
  createFakeLocationNormalizedGuard,
  createFakeUseRouter,
};