import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Button from "primevue/button";
import DialogFooterCloseButtonOnly from "~/components/shared/dialogs/DialogFooterCloseButtonOnly/DialogFooterCloseButtonOnly.vue";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Dialog Footer Close Button Only Component", () => {
  let wrapper: ReturnType<typeof mount<typeof DialogFooterCloseButtonOnly>>;

  async function mountDialogFooterCloseButtonOnlyComponent(options: ComponentMountingOptions<typeof DialogFooterCloseButtonOnly> = {}):
  Promise<ReturnType<typeof mount<typeof DialogFooterCloseButtonOnly>>> {
    return mountSuspendedComponent(DialogFooterCloseButtonOnly, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountDialogFooterCloseButtonOnlyComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Close Button", () => {
    it("should translate close button when rendered.", () => {
      const closeButton = wrapper.findComponent<typeof Button>("#close-button-only-dialog-footer-close-button");

      expect(closeButton.attributes("label")).toBe("Close");
    });

    it("should emit close event when close button is clicked.", async() => {
      const closeButton = wrapper.findComponent<typeof Button>("#close-button-only-dialog-footer-close-button");
      await closeButton.trigger("click");

      expect(wrapper.emitted("closeDialog")).toBeTruthy();
    });
  });
});