import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameOptionRoleLegendProps } from "~/components/shared/game/game-options/GameOptionRoleLegend/game-option-role-legend.types";
import GameOptionRoleLegend from "~/components/shared/game/game-options/GameOptionRoleLegend/GameOptionRoleLegend.vue";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Option Role Legend Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOptionRoleLegend>>;
  const defaultProps: GameOptionRoleLegendProps = { roleName: "werewolf" };

  async function mountGameOptionRoleLegendComponent(options: ComponentMountingOptions<typeof GameOptionRoleLegend> = {}):
  Promise<ReturnType<typeof mount<typeof GameOptionRoleLegend>>> {
    return mountSuspendedComponent(GameOptionRoleLegend, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOptionRoleLegendComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Role Image", () => {
    it("should pass the role name in props to role image component when rendered.", () => {
      const roleImage = wrapper.findComponent<typeof RoleImage>("#game-option-role-legend-image");

      expect(roleImage.props("roleName")).toBe(defaultProps.roleName);
    });
  });

  describe("Title", () => {
    it("should translate title as role name when rendered.", () => {
      const title = wrapper.find<HTMLHeadingElement>("#game-option-role-legend-title");

      expect(title.text()).toBe("shared.role.name.werewolf");
    });
  });
});