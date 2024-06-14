import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Divider from "primevue/divider";
import type { GameOptionInputGroupProps } from "~/components/shared/game/game-options/GameOptionInputGroup/game-option-input-group.types";
import GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Option Input Group Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOptionInputGroup>>;
  const defaultProps: GameOptionInputGroupProps = {
    optionLabel: "label",
    optionIconClass: "icon",
    optionDescription: "description",
  };

  async function mountGameOptionInputGroupComponent(options: ComponentMountingOptions<typeof GameOptionInputGroup> = {}):
  Promise<ReturnType<typeof mount<typeof GameOptionInputGroup>>> {
    return mountSuspendedComponent(GameOptionInputGroup, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOptionInputGroupComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Label Icon", () => {
    it("should pass the icon class from props to the label icon when rendered.", () => {
      const labelIcon = wrapper.find<HTMLSpanElement>("#game-option-label-icon");

      expect(labelIcon.classes()).toContain(defaultProps.optionIconClass);
    });
  });

  describe("Label Text", () => {
    it("should pass the label text from props to the label text when rendered.", () => {
      const labelText = wrapper.find<HTMLHeadingElement>("#game-option-label");

      expect(labelText.text()).toBe(defaultProps.optionLabel);
    });
  });

  describe("Description", () => {
    it("should pass the description text from props to the description when rendered.", () => {
      const description = wrapper.find<HTMLParagraphElement>("#game-option-description");

      expect(description.text()).toBe(defaultProps.optionDescription);
    });
  });

  describe("Bottom Divider", () => {
    it("should not render the bottom divider when doesHaveBottomDivider prop is not provided.", () => {
      const divider = wrapper.findComponent<typeof Divider>("#game-option-bottom-divider");

      expect(divider.exists()).toBeFalsy();
    });

    it("should render the bottom divider when doesHaveBottomDivider prop is provided as true.", async() => {
      wrapper = await mountGameOptionInputGroupComponent({
        props: {
          ...defaultProps,
          doesHaveBottomDivider: true,
        },
      });
      const divider = wrapper.findComponent<typeof Divider>("#game-option-bottom-divider");

      expect(divider.exists()).toBeTruthy();
    });
  });
});