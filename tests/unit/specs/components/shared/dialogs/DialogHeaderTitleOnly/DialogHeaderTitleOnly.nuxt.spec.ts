import type { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { DialogHeaderTitleOnlyProps } from "~/components/shared/dialogs/DialogHeaderTitleOnly/dialog-header-title-only.types";
import DialogHeaderTitleOnly from "~/components/shared/dialogs/DialogHeaderTitleOnly/DialogHeaderTitleOnly.vue";

describe("Dialog Header Title Only Component", () => {
  let wrapper: ReturnType<typeof mount<typeof DialogHeaderTitleOnly>>;
  const defaultProps: DialogHeaderTitleOnlyProps = {
    title: "Dialog Title",
    icon: "info-circle",
    iconClass: "text-success",
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
    it("should render icon when icon is set in props.", () => {
      const icon = wrapper.findComponent<typeof FontAwesomeIcon>("#game-lobby-options-hub-header-title-icon");

      expect(icon.props("icon")).toBe("info-circle");
    });

    it("should render icon classes when icon classes are set in props.", () => {
      const icon = wrapper.findComponent<typeof FontAwesomeIcon>("#game-lobby-options-hub-header-title-icon");

      expect(icon.classes()).toContainValues(["text-success"]);
    });

    it("should set title text when rendered.", () => {
      const title = wrapper.find<HTMLSpanElement>("#game-lobby-options-hub-header-title-text");

      expect(title.text()).toBe("Dialog Title");
    });
  });
});