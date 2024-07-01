import type { usePrimeVueToasts } from "~/composables/prime-vue/usePrimeVueToasts";

function createFakeUsePrimeVueToasts(): ReturnType<typeof usePrimeVueToasts> {
  return {
    addToast: vi.fn(),
    addSuccessToast: vi.fn(),
    addInfoToast: vi.fn(),
    addWarnToast: vi.fn(),
    addErrorToast: vi.fn(),
  };
}

export { createFakeUsePrimeVueToasts };