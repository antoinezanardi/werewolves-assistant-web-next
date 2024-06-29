import type { WritableComputedRef } from "vue";

function createFakeUseScroll(): ReturnType<typeof useScroll> {
  return {
    x: ref<number>(0) as WritableComputedRef<number>,
    y: ref<number>(0) as WritableComputedRef<number>,
    isScrolling: ref<boolean>(false),
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