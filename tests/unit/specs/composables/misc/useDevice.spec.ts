import { beforeEach } from "vitest";

import { useDevice } from "~/composables/misc/useDevice";

describe("Use Device Composable", () => {
  describe("isOnTouchDevice", () => {
    const originalWindow = global.window;

    beforeEach(() => {
      vi.stubGlobal("navigator", { maxTouchPoints: 0 });
      vi.stubGlobal("window", {});
    });

    afterEach(() => {
      vi.stubGlobal("window", originalWindow);
      vi.unstubAllGlobals();
    });

    it("should return true when on touchstartevent is available on window object.", () => {
      vi.stubGlobal("window", { ontouchstart: () => ({}) });
      const { isOnTouchDevice } = useDevice();

      expect(isOnTouchDevice.value).toBeTruthy();
    });

    it("should return true when navigator.maxTouchPoints is greater than 0.", () => {
      vi.stubGlobal("navigator", { maxTouchPoints: 2 });
      const { isOnTouchDevice } = useDevice();

      expect(isOnTouchDevice.value).toBeTruthy();
    });

    it("should return false when neither 'ontouchstart' nor navigator.maxTouchPoints are available.", () => {
      const { isOnTouchDevice } = useDevice();

      expect(isOnTouchDevice.value).toBeFalsy();
    });

    it("should return false when window is undefined.", () => {
      vi.stubGlobal("navigator", { maxTouchPoints: 2 });
      vi.stubGlobal("window", undefined);

      const { isOnTouchDevice } = useDevice();

      expect(isOnTouchDevice.value).toBeFalsy();
    });
  });
});