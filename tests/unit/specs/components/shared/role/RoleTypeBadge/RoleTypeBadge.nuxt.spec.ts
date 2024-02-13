import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { RoleTypeBadgeProps } from "~/components/shared/role/RoleTypeBadge/role-type-badge-types";
import RoleTypeBadge from "~/components/shared/role/RoleTypeBadge/RoleTypeBadge.vue";
import { RoleTypes } from "~/composables/api/role/enums/role.enums";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Role Type Badge Component", () => {
  let wrapper: ReturnType<typeof mount<typeof RoleTypeBadge>>;
  const defaultProps: RoleTypeBadgeProps = { roleType: RoleTypes.WEREWOLF };

  async function mountRoleTypeBadgeComponent(options: ComponentMountingOptions<typeof RoleTypeBadge> = {}): Promise<ReturnType<typeof mount<typeof RoleTypeBadge>>> {
    return mountSuspendedComponent(RoleTypeBadge, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountRoleTypeBadgeComponent();
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Badge", () => {
    it("should have tooltip when mounted.", () => {
      const badge = wrapper.findComponent("[aria-label='Role Type']");

      expect(badge.attributes("data-pd-tooltip")).toBe("true");
    });

    it("should translate role type when mounted.", () => {
      const badge = wrapper.findComponent("[aria-label='Role Type']");

      expect(badge.attributes("value")).toBe("Werewolf");
    });

    it.each< {
      roleType: RoleTypes;
      expectedSeverity: "danger" | "info" | "success" | "warning";
      test: string;
    }>([
      {
        roleType: RoleTypes.WEREWOLF,
        expectedSeverity: "danger",
        test: "should have severity of danger when role type is werewolf.",
      },
      {
        roleType: RoleTypes.VILLAGER,
        expectedSeverity: "success",
        test: "should have severity of success when role type is villager.",
      },
      {
        roleType: RoleTypes.AMBIGUOUS,
        expectedSeverity: "warning",
        test: "should have severity of warning when role type is ambiguous.",
      },
      {
        roleType: RoleTypes.LONELY,
        expectedSeverity: "info",
        test: "should have severity of info when role type is lonely.",
      },
    ])("$test", async({ roleType, expectedSeverity }) => {
      await wrapper.setProps({ roleType });
      const badge = wrapper.findComponent("[aria-label='Role Type']");

      expect(badge.attributes("severity")).toBe(expectedSeverity);
    });
  });
});