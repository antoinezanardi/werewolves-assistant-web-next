import type { ToastMessageOptions } from "primevue/toast";
import { useToast } from "primevue/usetoast";

import { DEFAULT_VUE_PRIME_TOAST_OPTIONS } from "~/composables/vue-prime/constants/vue-prime.constants";

type UseVuePrimeToasts = {
  addToast: (options: ToastMessageOptions) => void;
  addSuccessToast: (options: ToastMessageOptions) => void;
  addInfoToast: (options: ToastMessageOptions) => void;
  addWarnToast: (options: ToastMessageOptions) => void;
  addErrorToast: (options: ToastMessageOptions) => void;
};

function useVuePrimeToasts(): UseVuePrimeToasts {
  const toast = useToast();

  function addToast(options: ToastMessageOptions): void {
    toast.add({
      ...DEFAULT_VUE_PRIME_TOAST_OPTIONS,
      ...options,
    });
  }

  function addSuccessToast(options: ToastMessageOptions): void {
    addToast({ severity: "success", ...options });
  }

  function addInfoToast(options: ToastMessageOptions): void {
    addToast({ severity: "info", ...options });
  }

  function addWarnToast(options: ToastMessageOptions): void {
    addToast({ severity: "warn", ...options });
  }

  function addErrorToast(options: ToastMessageOptions): void {
    addToast({ severity: "error", ...options });
  }
  return {
    addToast,
    addSuccessToast,
    addInfoToast,
    addWarnToast,
    addErrorToast,
  };
}

export { useVuePrimeToasts };