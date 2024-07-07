import type { $Fetch } from "nitropack";
import { vi } from "vitest";
import type Qs from "qs";

import { useFetchRandomGameComposition } from "~/composables/api/game/useFetchRandomGameComposition";
import * as UseWerewolvesAssistantApi from "~/composables/api/useWerewolvesAssistantApi";

const hoistedMocks = vi.hoisted(() => ({ qs: { stringify: vi.fn() } }));

vi.mock("qs", async importOriginal => ({
  ...await importOriginal<typeof Qs>(),
  ...hoistedMocks.qs,
}));

describe("Use Fetch Random Game Composition", () => {
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

  describe("fetchRandomGameComposition", () => {
    it("should fetch random game composition when called.", async() => {
      hoistedMocks.qs.stringify.mockReturnValue("stringifiedQuery");
      const expectedUrl = `/games/random-composition?stringifiedQuery`;
      await useFetchRandomGameComposition().fetchRandomGameComposition({
        players: [
          { name: "Player 1" },
          { name: "Player 2" },
          { name: "Player 3" },
        ],
      });

      expect(mocks.composables.useWerewolvesAssistantApi.fetchWerewolvesAssistantApi).toHaveBeenCalledExactlyOnceWith(expectedUrl, { method: "GET" });
    });
  });
});