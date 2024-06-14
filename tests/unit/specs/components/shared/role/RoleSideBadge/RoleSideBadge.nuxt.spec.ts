import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Badge from "primevue/badge";

import type { RoleSideBadgeProps } from "~/components/shared/role/RoleSideBadge/role-side-badge-types";
import RoleSideBadge from "~/components/shared/role/RoleSideBadge/RoleSideBadge.vue";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Role Side Badge Component", () => {
  let wrapper: ReturnType<typeof mount<typeof RoleSideBadge>>;
  const defaultProps: RoleSideBadgeProps = { roleSide: "villagers" };

  async function mountRoleSideBadgeComponent(options: ComponentMountingOptions<typeof RoleSideBadge> = {}):
  Promise<ReturnType<typeof mount<typeof RoleSideBadge>>> {
    return mountSuspendedComponent(
      RoleSideBadge,
      {
        props: defaultProps,
        ...options,
      },
    );
  }

  beforeEach(async() => {
    wrapper = await mountRoleSideBadgeComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Badge", () => {
    it("should translate role side when side is villagers.", () => {
      const badge = wrapper.findComponent<typeof Badge>("#role-side-badge");

      expect(badge.attributes("value")).toBe("components.RoleSideBadge.villagersSide");
    });

    it("should translate role side when side is werewolves.", async() => {
      wrapper = await mountRoleSideBadgeComponent({ props: { roleSide: "werewolves" } });
      const badge = wrapper.findComponent<typeof Badge>("#role-side-badge");

      expect(badge.attributes("value")).toBe("components.RoleSideBadge.werewolvesSide");
    });

    it("should set severity to success when side is villagers.", () => {
      const badge = wrapper.findComponent<typeof Badge>("#role-side-badge");

      expect(badge.attributes("severity")).toBe("success");
    });

    it("should set severity to danger when side is werewolves.", async() => {
      wrapper = await mountRoleSideBadgeComponent({ props: { roleSide: "werewolves" } });
      const badge = wrapper.findComponent<typeof Badge>("#role-side-badge");

      expect(badge.attributes("severity")).toBe("danger");
    });
  });
});