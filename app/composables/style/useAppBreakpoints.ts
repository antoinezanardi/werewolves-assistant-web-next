import type { Ref } from "vue";
import { breakpointsTailwind, useBreakpoints as useVueUseBreakpoints } from "@vueuse/core";

import { BreakpointTypes } from "~/utils/enums/breakpoint.enums";

type UseAppBreakpoints = {
  isSmallerThanMdBreakpoint: Ref<boolean>;
};

function useAppBreakpoints(): UseAppBreakpoints {
  const breakpoints = useVueUseBreakpoints(breakpointsTailwind);
  const isSmallerThanMdBreakpoint = breakpoints.smaller(BreakpointTypes.MD);

  return {
    isSmallerThanMdBreakpoint,
  };
}

export { useAppBreakpoints };