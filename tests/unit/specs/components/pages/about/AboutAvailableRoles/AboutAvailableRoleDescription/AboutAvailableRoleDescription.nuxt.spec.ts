import type { mount } from "@vue/test-utils";

import type { AboutAvailableRoleDescriptionProps } from "~/components/pages/about/AboutAvailableRoles/AboutAvailableRoleDescription/about-available-role-description.types";
import AboutAvailableRoleDescription from "~/components/pages/about/AboutAvailableRoles/AboutAvailableRoleDescription/AboutAvailableRoleDescription.vue";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import type RoleOriginBadge from "~/components/shared/role/RoleOriginBadge/RoleOriginBadge.vue";
import type RoleTypeBadge from "~/components/shared/role/RoleTypeBadge/RoleTypeBadge.vue";
import type { Role } from "~/composables/api/role/types/role.class";
import { createFakeRole } from "~/tests/unit/utils/factories/composables/api/role/role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("About Available Role Description Component", () => {
  let wrapper: ReturnType<typeof mount<typeof AboutAvailableRoleDescription>>;
  const defaultRole: Role = createFakeRole({
    name: "werewolf",
    type: "werewolf",
    origin: "classic",
  });
  const defaultProps: AboutAvailableRoleDescriptionProps = { role: defaultRole };

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(AboutAvailableRoleDescription, { props: defaultProps });
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Role Left Description", () => {
    describe("Role Image", () => {
      it("should display role image when rendered.", () => {
        const roleImage = wrapper.findComponent<typeof RoleImage>(".available-role-description-role-image");

        expect(roleImage.props("roleName")).toBe("werewolf");
      });

      it("should display role image with correct alt when rendered.", () => {
        const roleImage = wrapper.find<HTMLImageElement>(".available-role-description-role-image");

        expect(roleImage.attributes("alt")).toBe("components.AboutAvailableRoleDescription.roleDescriptionLeftImageAlt, {\"role\":\"shared.role.name.werewolf\"}");
      });
    });

    it("should display role name when rendered.", () => {
      const roleName = wrapper.find<HTMLHeadElement>(".available-role-description-role-name");

      expect(roleName.text()).toBe("shared.role.name.werewolf");
    });

    it("should display role type badge when rendered.", () => {
      const roleTypeBadge = wrapper.findComponent<typeof RoleTypeBadge>(".available-role-description-role-type-badge");

      expect(roleTypeBadge.props("roleType")).toBe("werewolf");
    });

    it("should display role origin badge when rendered.", () => {
      const roleOriginBadge = wrapper.findComponent<typeof RoleOriginBadge>(".available-role-description-role-origin-badge");

      expect(roleOriginBadge.props("roleOrigin")).toBe("classic");
    });
  });
});