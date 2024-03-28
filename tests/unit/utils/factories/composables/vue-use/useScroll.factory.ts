import type { WritableComputedRef } from "vue";

function createFakeUseScroll(): ReturnType<typeof useScroll> {
  return {
    x: ref(0) as WritableComputedRef<number>,
    y: ref(0) as WritableComputedRef<number>,
    isScrolling: ref(false),
    directions: {
      left: false,
      right: false,
      top: false,
      bottom: false,
    },
    arrivedState: {
      left: false,
      right: false,
      top: false,
      bottom: false,
    },
    measure: vi.fn(),
  };
}

export { createFakeUseScroll };