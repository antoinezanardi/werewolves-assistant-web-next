import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { DialogHeaderTitleOnlyProps } from "~/components/shared/dialogs/DialogHeaderTitleOnly/dialog-header-title-only.types";
import DialogHeaderTitleOnly from "~/components/shared/dialogs/DialogHeaderTitleOnly/DialogHeaderTitleOnly.vue";

describe("Dialog Header Title Only Component", () => {
  let wrapper: ReturnType<typeof mount<typeof DialogHeaderTitleOnly>>;
  const defaultProps: DialogHeaderTitleOnlyProps = {
    title: "Dialog Title",
    iconClass: "pi pi-info-circle",
  };

  async function mountDialogHeaderTitleOnlyComponent(options: ComponentMountingOptions<typeof DialogHeaderTitleOnly> = {}):
  Promise<ReturnType<typeof mount<typeof DialogHeaderTitleOnly>>> {
    return mountSuspendedComponent(DialogHeaderTitleOnly, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountDialogHeaderTitleOnlyComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Title", () => {
    it("should render icon when icon classes are set in props.", () => {
      const icon = wrapper.find<HTMLSpanElement>("#game-lobby-options-hub-header-title-icon");

      expect(icon.attributes("class")).toBe("me-3 pi pi-info-circle");
    });

    it("should not render icon when icon classes are not set in props.", async() => {
      wrapper = await mountDialogHeaderTitleOnlyComponent({ props: { ...defaultProps, iconClass: undefined } });
      const icon = wrapper.find<HTMLSpanElement>("#game-lobby-options-hub-header-title-icon");

      expect(icon.exists()).toBeFalsy();
    });

    it("should set title text when rendered.", () => {
      const title = wrapper.find<HTMLSpanElement>("#game-lobby-options-hub-header-title-text");

      expect(title.text()).toBe("Dialog Title");
    });
  });
});