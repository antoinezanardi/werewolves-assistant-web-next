import type { FetchResponse } from "ofetch";
import { useToast } from "primevue/usetoast";

import type { WerewolvesAssistantApiError } from "~/composables/api/error/types/api-error.types";
import { DEFAULT_VUE_PRIME_TOAST_OPTIONS } from "~/plugins/vue-prime/constants/vue-prime.constants";

type UseWerewolvesAssistantApiError = {
  handleWerewolvesAssistantApiError: (error: { response: FetchResponse<WerewolvesAssistantApiError> }) => void;
};

function useWerewolvesAssistantApiError(): UseWerewolvesAssistantApiError {
  const toast = useToast();
  const { t } = useI18n();

  function handleWerewolvesAssistantApiError({ response }: { response: FetchResponse<WerewolvesAssistantApiError> }): void {
    const { _data: errorData } = response;
    // eslint-disable-next-line no-console
    console.error(errorData);
    toast.add({
      ...DEFAULT_VUE_PRIME_TOAST_OPTIONS,
      severity: "error",
      summary: t(`composables.useWerewolvesAssistantApiError.statusCode.${response.status}`),
      detail: t(`composables.useWerewolvesAssistantApiError.checkConsoleForMoreDetails`),
    });
  }
  return { handleWerewolvesAssistantApiError };
}

export { useWerewolvesAssistantApiError };