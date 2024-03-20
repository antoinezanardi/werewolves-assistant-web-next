import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import { expect } from "vitest";

import type { VuePrimeBadge } from "#components";
import type { RoleOriginBadgeProps } from "~/components/shared/role/RoleOriginBadge/role-origin-badge.types";
import RoleOriginBadge from "~/components/shared/role/RoleOriginBadge/RoleOriginBadge.vue";
import { pTooltipDirectiveBinder } from "~/tests/unit/utils/helpers/directive.helpers";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { BoundTooltip } from "~/tests/unit/utils/types/directive.types";

describe("Role Origin Badge Component", () => {
  let wrapper: ReturnType<typeof mount<typeof RoleOriginBadge>>;
  const defaultProps: RoleOriginBadgeProps = { roleOrigin: "classic" };

  async function mountRoleOriginBadgeComponent(options: ComponentMountingOptions<typeof RoleOriginBadge> = {}): Promise<ReturnType<typeof mount<typeof RoleOriginBadge>>> {
    return mountSuspendedComponent(RoleOriginBadge, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountRoleOriginBadgeComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Badge", () => {
    it("should have tooltip when rendered.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, ".role-origin-badge") };
      wrapper = await mountRoleOriginBadgeComponent({ global: { directives } });

      expect(tooltip.value).toBe("Role Origin");
    });

    it("should translate role origin when rendered.", () => {
      const badge = wrapper.findComponent<typeof VuePrimeBadge>(".role-origin-badge");

      expect(badge.attributes("value")).toBe("Base Game");
    });
  });
});