import { useWerewolvesAssistantApi } from "~/composables/api/useWerewolvesAssistantApi";

const { createMock } = vi.hoisted(() => ({ createMock: vi.fn() }));
vi.mock("ofetch", () => ({ createFetch: vi.fn(() => ({ create: createMock })) }));

describe("Use Werewolves Assistant Api Composable", () => {
  describe("fetchWerewolvesAssistantApi", () => {
    it("should create a fetch instance for Werewolves Assistant API when called.", () => {
      useWerewolvesAssistantApi();

      expect(createMock).toHaveBeenCalledExactlyOnceWith({
        baseURL: "http://127.0.0.1",
        headers: { "Content-Type": "application/json" },
        onResponseError: expect.any(Function) as () => void,
      });
    });
  });
});