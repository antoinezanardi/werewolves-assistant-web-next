import { mockNuxtImport } from "@nuxt/test-utils/runtime";

import { useFetchRoles } from "~/composables/api/role/useFetchRoles";
import { createFakeUseRuntimeConfig } from "~/tests/unit/utils/factories/composables/nuxt/useRuntimeConfig";

const { useFetchMock, useRuntimeConfig } = vi.hoisted(() => ({
  useFetchMock: vi.fn(),
  useRuntimeConfig: vi.fn(),
}));

describe("Use Fetch Roles Composable", () => {
  beforeAll(() => {
    mockNuxtImport("useRuntimeConfig", () => useRuntimeConfig);
    mockNuxtImport("useFetch", () => useFetchMock);
  });
  beforeEach(() => {
    useRuntimeConfig.mockReturnValue(createFakeUseRuntimeConfig());
  });

  describe("fetchRoles", () => {
    it("should fetch roles when called without options.", async() => {
      await useFetchRoles().fetchRoles();

      expect(useFetchMock).toHaveBeenCalledExactlyOnceWith("http://127.0.0.1/roles", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }, "$dk08ZMi4Ri");
    });

    it("should fetch roles when called with options.", async() => {
      await useFetchRoles().fetchRoles({ method: "POST" });

      expect(useFetchMock).toHaveBeenCalledExactlyOnceWith("http://127.0.0.1/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }, "$dk08ZMi4Ri");
    });
  });
});