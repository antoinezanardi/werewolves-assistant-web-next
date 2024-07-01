import type { ToastMessageOptions } from "primevue/toast";
import { useToast } from "primevue/usetoast";

import { DEFAULT_PRIME_VUE_TOAST_OPTIONS } from "~/composables/prime-vue/constants/prime-vue.constants";

type UsePrimeVueToasts = {
  addToast: (options: ToastMessageOptions) => void;
  addSuccessToast: (options: ToastMessageOptions) => void;
  addInfoToast: (options: ToastMessageOptions) => void;
  addWarnToast: (options: ToastMessageOptions) => void;
  addErrorToast: (options: ToastMessageOptions) => void;
};

function usePrimeVueToasts(): UsePrimeVueToasts {
  const toast = useToast();

  function addToast(options: ToastMessageOptions): void {
    toast.add({
      ...DEFAULT_PRIME_VUE_TOAST_OPTIONS,
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

export { usePrimeVueToasts };