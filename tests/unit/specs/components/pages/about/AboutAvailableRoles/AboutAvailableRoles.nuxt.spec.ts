import type { mount } from "@vue/test-utils";
import AccordionTab from "primevue/accordiontab";
import { nextTick } from "vue";

import AboutAvailableRoleDescription from "~/components/pages/about/AboutAvailableRoles/AboutAvailableRoleDescription/AboutAvailableRoleDescription.vue";
import AboutAvailableRoles from "~/components/pages/about/AboutAvailableRoles/AboutAvailableRoles.vue";
import type RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
import type { Role } from "~/composables/api/role/types/role.types";
import { useRolesStore } from "~/stores/role/useRolesStore";
import { createFakeRole } from "~/tests/unit/utils/factories/composables/api/role/role.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/mount.utils";

describe("About Available Roles Component", () => {
  let wrapper: ReturnType<typeof mount<typeof AboutAvailableRoles>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(AboutAvailableRoles);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Title", () => {
    it("should display role image with angel when rendered.", () => {
      const roleImage = wrapper.findComponent<typeof RoleImage>("#about-available-roles-title-role-image");

      expect(roleImage.props("roleName")).toBe(RoleNames.ANGEL);
    });

    it("should translate title when rendered.", () => {
      const title = wrapper.find<HTMLHeadElement>("#about-available-roles-title");

      expect(title.text()).toBe("Available roles");
    });
  });

  describe("Available Roles Accordion", () => {
    describe("Roles are not set yet", () => {
      beforeEach(async() => {
        const rolesStore = useRolesStore();
        rolesStore.roles = null;
        await nextTick();
      });

      it("should display loading roles container when roles are not set yet.", () => {
        const loadingRolesContainer = wrapper.find<HTMLDivElement>("#loading-roles-container");

        expect(loadingRolesContainer.exists()).toBeTruthy();
      });

      it("should translate loading roles text when roles are not set yet.", () => {
        const loadingRolesText = wrapper.find<HTMLDivElement>("#loading-roles-container");

        expect(loadingRolesText.text()).toBe("Loading roles…");
      });
    });

    describe("Roles are set", () => {
      const roles = [
        createFakeRole({ name: RoleNames.WEREWOLF }),
        createFakeRole({ name: RoleNames.ANGEL }),
        createFakeRole({ name: RoleNames.ACCURSED_WOLF_FATHER }),
      ];

      beforeEach(async() => {
        wrapper = await mountSuspendedComponent(AboutAvailableRoles, {
          shallow: false,
          global: { stubs: { AboutAvailableRoleDescription: true } },
        });
        const rolesStore = useRolesStore();
        rolesStore.roles = roles;
        await nextTick();
      });

      it("should translate first section when roles are set.", () => {
        const firstSection = wrapper.find<HTMLDivElement>("#about-available-roles-first-section");

        expect(firstSection.text()).toBe("components.AboutAvailableRoles.assistantHasManyRoles");
      });

      it("should display 3 available roles accordion tabs when 3 roles are set.", () => {
        const availableRolesAccordionTabs = wrapper.findAllComponents<typeof AccordionTab>(AccordionTab);

        expect(availableRolesAccordionTabs).toHaveLength(3);
      });

      it("should display werewolf role description for first accordion tab when first accordion tab is for werewolf role.", () => {
        const availableRolesAccordionTabs = wrapper.findAllComponents<typeof AccordionTab>(AccordionTab);
        const firstAccordionTab = availableRolesAccordionTabs[0];
        const aboutAvailableRoleDescription = firstAccordionTab.findComponent<typeof AboutAvailableRoleDescription>(AboutAvailableRoleDescription);

        expect(aboutAvailableRoleDescription.props("role")).toStrictEqual<Role>(roles[0]);
      });
    });
  });
});