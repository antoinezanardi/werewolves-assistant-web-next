import type { useVuePrimeToasts } from "~/composables/vue-prime/useVuePrimeToasts";

function createFakeUseVuePrimeToasts(): ReturnType<typeof useVuePrimeToasts> {
  return {
    addToast: vi.fn(),
    addSuccessToast: vi.fn(),
    addInfoToast: vi.fn(),
    addWarnToast: vi.fn(),
    addErrorToast: vi.fn(),
  };
}

export { createFakeUseVuePrimeToasts };