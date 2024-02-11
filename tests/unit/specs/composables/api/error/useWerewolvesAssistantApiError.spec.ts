import type { FetchResponse } from "ofetch";
import type { Mock, MockInstance } from "vitest";

import type { WerewolvesAssistantApiError } from "~/composables/api/error/types/api-error.types";
import { useWerewolvesAssistantApiError } from "~/composables/api/error/useWerewolvesAssistantApiError";
import * as UseVuePrimeToasts from "~/composables/vue-prime/useVuePrimeToasts";

describe("Use Werewolves Assistant Api Error Composable", () => {
  let mocks: {
    console: {
      error: MockInstance;
    };
    composables: {
      useVuePrimeToasts: {
        addToast: Mock;
        addSuccessToast: Mock;
        addInfoToast: Mock;
        addWarnToast: Mock;
        addErrorToast: Mock;
      }
    }
  };

  beforeEach(() => {
    mocks = {
      console: { error: vi.spyOn(console, "error").mockImplementation(vi.fn()) },
      composables: {
        useVuePrimeToasts: {
          addToast: vi.fn(),
          addErrorToast: vi.fn(),
          addInfoToast: vi.fn(),
          addSuccessToast: vi.fn(),
          addWarnToast: vi.fn(),
        },
      },
    };
    vi.spyOn(UseVuePrimeToasts, "useVuePrimeToasts").mockReturnValue(mocks.composables.useVuePrimeToasts);
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

      expect(mocks.composables.useVuePrimeToasts.addErrorToast).toHaveBeenCalledExactlyOnceWith({
        summary: "composables.useWerewolvesAssistantApiError.statusCode.404",
        detail: "composables.useWerewolvesAssistantApiError.checkConsoleForMoreDetails",
      });
    });
  });
});