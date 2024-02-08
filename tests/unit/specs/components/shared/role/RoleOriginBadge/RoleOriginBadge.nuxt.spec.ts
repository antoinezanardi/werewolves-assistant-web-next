import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import { expect } from "vitest";

import type { VuePrimeBadge } from "#components";
import type { RoleOriginBadgeProps } from "~/components/shared/role/RoleOriginBadge/role-origin-badge.types";
import RoleOriginBadge from "~/components/shared/role/RoleOriginBadge/RoleOriginBadge.vue";
import { RoleOrigins } from "~/composables/api/role/enums/role.enums";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Role Origin Badge Component", () => {
  let wrapper: ReturnType<typeof mount<typeof RoleOriginBadge>>;
  const defaultProps: RoleOriginBadgeProps = { roleOrigin: RoleOrigins.CLASSIC };

  async function mountRoleOriginBadgeComponent(options: ComponentMountingOptions<typeof RoleOriginBadge> = {}): Promise<ReturnType<typeof mount<typeof RoleOriginBadge>>> {
    return mountSuspendedComponent(RoleOriginBadge, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountRoleOriginBadgeComponent();
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Badge", () => {
    it("should have tooltip when mounted.", () => {
      const badge = wrapper.findComponent<typeof VuePrimeBadge>("[aria-label='Role Origin']");

      expect(badge.attributes("data-pd-tooltip")).toBe("true");
    });

    it("should translate role origin when mounted.", () => {
      const badge = wrapper.findComponent<typeof VuePrimeBadge>("[aria-label='Role Origin']");

      expect(badge.attributes("value")).toBe("Base Game");
    });
  });
});