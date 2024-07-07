import { useWerewolvesAssistantApi } from "~/composables/api/useWerewolvesAssistantApi";

const hoistedMocks = vi.hoisted(() => ({ oFetch: { create: vi.fn() } }));

vi.mock("ofetch", () => ({
  createFetch: vi.fn(() => hoistedMocks.oFetch),
}));

describe("Use Werewolves Assistant Api Composable", () => {
  describe("fetchWerewolvesAssistantApi", () => {
    it("should create a fetch instance for Werewolves Assistant API when called.", () => {
      useWerewolvesAssistantApi();

      expect(hoistedMocks.oFetch.create).toHaveBeenCalledExactlyOnceWith({
        baseURL: "http://127.0.0.1",
        headers: { "Content-Type": "application/json" },
        onResponseError: expect.any(Function) as () => void,
      });
    });
  });
});