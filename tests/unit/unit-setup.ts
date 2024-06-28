import "vi-canvas-mock";
import { beforeAll, expect } from "vitest";
import matchers from "jest-extended";

import { setupMswServer } from "@tests/unit/utils/helpers/msw.helpers";
import { mockNuxtImports, mockPrimeVueComposables } from "@tests/unit/utils/helpers/mock.helpers";

expect.extend(matchers);

const server = setupMswServer();

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