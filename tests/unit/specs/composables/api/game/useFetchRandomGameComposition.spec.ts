import type { $Fetch } from "nitropack";

import { useFetchRandomGameComposition } from "~/composables/api/game/useFetchRandomGameComposition";
import * as UseWerewolvesAssistantApi from "~/composables/api/useWerewolvesAssistantApi";

const { stringifyMock } = vi.hoisted(() => ({ stringifyMock: vi.fn() }));

vi.mock("qs", () => ({ stringify: stringifyMock }));

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
      stringifyMock.mockReturnValue("stringifiedQuery");
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