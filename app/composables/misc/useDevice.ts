import type { ComputedRef } from "vue";

type UseDevice = {
  isOnTouchDevice: ComputedRef<boolean>;
};

function useDevice(): UseDevice {
  const isOnTouchDevice = computed<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  });

  return {
    isOnTouchDevice,
  };
}

export {
  useDevice,
};