import type { FetchResponse } from "ofetch";
import * as UseToast from "primevue/usetoast";
import type { Mock, MockInstance } from "vitest";

import type { WerewolvesAssistantApiError } from "~/composables/api/error/types/api-error.types";
import { useWerewolvesAssistantApiError } from "~/composables/api/error/useWerewolvesAssistantApiError";

describe("Use Werewolves Assistant Api Error Composable", () => {
  let mocks: {
    console: {
      error: MockInstance;
    };
    composables: {
      useToast: {
        add: Mock;
        remove: Mock;
        removeGroup: Mock;
        removeAllGroups: Mock;
      };
    };
  };

  beforeEach(() => {
    mocks = {
      console: { error: vi.spyOn(console, "error").mockImplementation(vi.fn()) },
      composables: {
        useToast: {
          add: vi.fn(),
          remove: vi.fn(),
          removeGroup: vi.fn(),
          removeAllGroups: vi.fn(),
        },
      },
    };
    vi.spyOn(UseToast, "useToast").mockReturnValue(mocks.composables.useToast);
  });

  describe("handleWerewolvesAssistantApiError", () => {
    it("should log error in console when called.", () => {
      const response = { _data: "error-data" } as unknown as FetchResponse<WerewolvesAssistantApiError>;
      useWerewolvesAssistantApiError().handleWerewolvesAssistantApiError({ response });
      const { _data: expectedData } = response;

      expect(mocks.console.error).toHaveBeenCalledExactlyOnceWith(expectedData);
    });

    it("should add error toast when called.", () => {
      const response = { status: 404 } as unknown as FetchResponse<WerewolvesAssistantApiError>;
      useWerewolvesAssistantApiError().handleWerewolvesAssistantApiError({ response });

      expect(mocks.composables.useToast.add).toHaveBeenCalledExactlyOnceWith({
        closable: true,
        life: 4000,
        severity: "error",
        summary: "composables.useWerewolvesAssistantApiError.statusCode.404",
        detail: "composables.useWerewolvesAssistantApiError.checkConsoleForMoreDetails",
      });
    });
  });
});