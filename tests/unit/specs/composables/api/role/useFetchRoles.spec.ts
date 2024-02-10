import type { $Fetch } from "nitropack";

import { useFetchRoles } from "~/composables/api/role/useFetchRoles";
import * as UseWerewolvesAssistantApi from "~/composables/api/useWerewolvesAssistantApi";

describe("Use Fetch Roles Composable", () => {
  let mocks: {
    composables: {
      useWerewolvesAssistantApi: {
        fetchWerewolvesAssistantApi: $Fetch;
      }
    }
  };

  beforeEach(() => {
    mocks = { composables: { useWerewolvesAssistantApi: { fetchWerewolvesAssistantApi: vi.fn() as unknown as $Fetch } } };
    vi.spyOn(UseWerewolvesAssistantApi, "useWerewolvesAssistantApi").mockReturnValue(mocks.composables.useWerewolvesAssistantApi);
  });

  describe("fetchRoles", () => {
    it("should fetch roles when called.", async() => {
      await useFetchRoles().fetchRoles();

      expect(mocks.composables.useWerewolvesAssistantApi.fetchWerewolvesAssistantApi).toHaveBeenCalledExactlyOnceWith(`/roles`, { method: "GET" });
    });

    it("should return null when fetch roles throws.", async() => {
      vi.spyOn(mocks.composables.useWerewolvesAssistantApi, "fetchWerewolvesAssistantApi").mockRejectedValue(new Error("error"));
      const result = await useFetchRoles().fetchRoles();

      expect(result).toBeNull();
    });
  });
});