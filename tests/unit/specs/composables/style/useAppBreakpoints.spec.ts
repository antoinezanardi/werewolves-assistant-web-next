import type VueUseCore from "@vueuse/core";

import { useAppBreakpoints } from "~/composables/style/useAppBreakpoints";

const hoistedMocks = vi.hoisted(() => ({
  useBreakpoints: {
    smaller: vi.fn(),
  },
}));

vi.mock("@vueuse/core", async importOriginal => ({
  ...await importOriginal<typeof VueUseCore>(),
  useBreakpoints: (): typeof hoistedMocks.useBreakpoints => hoistedMocks.useBreakpoints,
}));

describe("Use App Breakpoints", () => {
  describe("breakpoints", () => {
    it("should call smaller with MD breakpoint when called.", () => {
      useAppBreakpoints();

      expect(hoistedMocks.useBreakpoints.smaller).toHaveBeenCalledWith("md");
    });
  });
});