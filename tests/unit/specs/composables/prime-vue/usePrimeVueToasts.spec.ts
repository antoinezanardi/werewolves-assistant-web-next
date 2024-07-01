import type { ToastMessageOptions } from "primevue/toast";
import type { Mock } from "vitest";
import * as UseToast from "primevue/usetoast";

import { usePrimeVueToasts } from "~/composables/prime-vue/usePrimeVueToasts";

describe("Use Prime Vue Toasts Composable", () => {
  let mocks: {
    composables: {
      useToast: {
        add: Mock;
        remove: Mock;
        removeGroup: Mock;
        removeAllGroups: Mock;
      };
    };
  };

  beforeEach(() => {
    mocks = {
      composables: {
        useToast: {
          add: vi.fn(),
          remove: vi.fn(),
          removeGroup: vi.fn(),
          removeAllGroups: vi.fn(),
        },
      },
    };
    vi.spyOn(UseToast, "useToast").mockReturnValue(mocks.composables.useToast);
  });

  describe("addToast", () => {
    it("should add a toast with default options when called.", () => {
      const { addToast } = usePrimeVueToasts();
      const options: ToastMessageOptions = { summary: "summary", detail: "detail" };
      addToast(options);
      const expectedOptions = { life: 4000, closable: true, ...options };

      expect(mocks.composables.useToast.add).toHaveBeenCalledExactlyOnceWith(expectedOptions);
    });
  });

  describe("addSuccessToast", () => {
    it("should add a success toast with default options when called.", () => {
      const { addSuccessToast } = usePrimeVueToasts();
      const options: ToastMessageOptions = { summary: "summary", detail: "detail" };
      addSuccessToast(options);
      const expectedOptions = { severity: "success", life: 4000, closable: true, ...options };

      expect(mocks.composables.useToast.add).toHaveBeenCalledExactlyOnceWith(expectedOptions);
    });
  });

  describe("addInfoToast", () => {
    it("should add an info toast with default options when called.", () => {
      const { addInfoToast } = usePrimeVueToasts();
      const options: ToastMessageOptions = { summary: "summary", detail: "detail" };
      addInfoToast(options);
      const expectedOptions = { severity: "info", life: 4000, closable: true, ...options };

      expect(mocks.composables.useToast.add).toHaveBeenCalledExactlyOnceWith(expectedOptions);
    });
  });

  describe("addWarnToast", () => {
    it("should add a warn toast with default options when called.", () => {
      const { addWarnToast } = usePrimeVueToasts();
      const options: ToastMessageOptions = { summary: "summary", detail: "detail" };
      addWarnToast(options);
      const expectedOptions = { severity: "warn", life: 4000, closable: true, ...options };

      expect(mocks.composables.useToast.add).toHaveBeenCalledExactlyOnceWith(expectedOptions);
    });
  });

  describe("addErrorToast", () => {
    it("should add an error toast with default options when called.", () => {
      const { addErrorToast } = usePrimeVueToasts();
      const options: ToastMessageOptions = { summary: "summary", detail: "detail" };
      addErrorToast(options);
      const expectedOptions = { severity: "error", life: 4000, closable: true, ...options };

      expect(mocks.composables.useToast.add).toHaveBeenCalledExactlyOnceWith(expectedOptions);
    });
  });
});