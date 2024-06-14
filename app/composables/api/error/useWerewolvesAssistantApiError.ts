import type { FetchResponse } from "ofetch";

import type { WerewolvesAssistantApiError } from "~/composables/api/error/types/api-error.types";
import { useVuePrimeToasts } from "~/composables/vue-prime/useVuePrimeToasts";

type UseWerewolvesAssistantApiError = {
  handleWerewolvesAssistantApiError: (error: { response: FetchResponse<WerewolvesAssistantApiError> }) => void;
};

function useWerewolvesAssistantApiError(): UseWerewolvesAssistantApiError {
  const { addErrorToast } = useVuePrimeToasts();
  const { t } = useI18n();

  function handleWerewolvesAssistantApiError({ response }: { response: FetchResponse<WerewolvesAssistantApiError> }): void {
    const { _data: errorData } = response;
    // eslint-disable-next-line no-console
    console.error(errorData);
    addErrorToast({
      summary: t(`composables.useWerewolvesAssistantApiError.statusCode.${response.status}`),
      detail: t(`composables.useWerewolvesAssistantApiError.checkConsoleForMoreDetails`),
    });
  }
  return { handleWerewolvesAssistantApiError };
}

export { useWerewolvesAssistantApiError };