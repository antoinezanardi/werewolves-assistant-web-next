import { beforeEach } from "vitest";

import { useDevice } from "~/composables/misc/useDevice";

describe("Use Device Composable", () => {
  describe("isOnTouchDevice", () => {
    beforeEach(() => {
      // eslint-disable-next-line no-underscore-dangle
      (navigator as unknown as { __defineGetter__: (prop: string, getter: () => unknown) => void }).__defineGetter__("maxTouchPoints", () => 0);
      delete window.ontouchstart;
    });

    afterAll(() => {
      delete window.ontouchstart;
    });

    it("should return true when on touchstartevent is available on window object.", () => {
      window.ontouchstart = (): object => ({});
      const { isOnTouchDevice } = useDevice();

      expect(isOnTouchDevice.value).toBeTruthy();
    });

    it("should return true when navigator.maxTouchPoints is greater than 0.", () => {
      // eslint-disable-next-line no-underscore-dangle
      (navigator as unknown as { __defineGetter__: (prop: string, getter: () => unknown) => void }).__defineGetter__("maxTouchPoints", () => 2);
      const { isOnTouchDevice } = useDevice();

      expect(isOnTouchDevice.value).toBeTruthy();
    });

    it("should return false when neither 'ontouchstart' nor navigator.maxTouchPoints are available.", () => {
      const { isOnTouchDevice } = useDevice();

      expect(isOnTouchDevice.value).toBeFalsy();
    });
  });
});