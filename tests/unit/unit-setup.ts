import { beforeAll, expect } from "vitest";
import matchers from "jest-extended";

import { setupMswServer } from "~/tests/unit/utils/helpers/msw.helpers";
import { mockNuxtImports, mockPrimeVueComposables } from "~/tests/unit/utils/helpers/mock.helpers";

expect.extend(matchers);

const server = setupMswServer();

declare module "vitest" {
  type Assertion<T = unknown> = CustomMatchers<T>;

  type AsymmetricMatchersContaining<T = unknown> = CustomMatchers<T>;

  type ExpectStatic<T = unknown> = CustomMatchers<T>;
}

beforeAll(() => {
  server.listen();

  mockNuxtImports();

  mockPrimeVueComposables();
});

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());