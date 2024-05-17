import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type ToggleButton from "primevue/togglebutton";
import AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Affirmative Toggle Button Component", () => {
  let wrapper: ReturnType<typeof mount<typeof AffirmativeToggleButton>>;

  async function mountAffirmativeToggleButtonComponent(options: ComponentMountingOptions<typeof AffirmativeToggleButton> = {}):
  Promise<ReturnType<typeof mount<typeof AffirmativeToggleButton>>> {
    return mountSuspendedComponent(AffirmativeToggleButton, {
      props: { modelValue: true },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountAffirmativeToggleButtonComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Toggle Button", () => {
    it("should pass v-model value to the toggle button when rendered.", () => {
      const toggleButton = wrapper.findComponent<typeof ToggleButton>("#affirmative-toggle-button");

      expect(toggleButton.attributes("modelvalue")).toBe("true");
    });

    it("should change v-model value when toggle button emits input event.", async() => {
      wrapper = await mountAffirmativeToggleButtonComponent({ shallow: false });
      const toggleButtonCheckbox = wrapper.find<HTMLInputElement>("#affirmative-toggle-button > .p-togglebutton-input");
      await toggleButtonCheckbox.setValue(false);

      expect(toggleButtonCheckbox.attributes("value")).toBe("false");
    });

    it("should translate no label when rendered.", () => {
      const toggleButton = wrapper.findComponent<typeof ToggleButton>("#affirmative-toggle-button");

      expect(toggleButton.attributes("off-label")).toBe("No");
    });
  });
});