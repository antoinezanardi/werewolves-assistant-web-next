import type { mount } from "@vue/test-utils";
import Accordion from "primevue/accordion";
import type { AccordionTabPassThroughOptions } from "primevue/accordiontab";
import AccordionTab from "primevue/accordiontab";
import { nextTick } from "vue";

import AboutAvailableRoleDescription from "~/components/pages/about/AboutAvailableRoles/AboutAvailableRoleDescription/AboutAvailableRoleDescription.vue";
import AboutAvailableRoles from "~/components/pages/about/AboutAvailableRoles/AboutAvailableRoles.vue";
import type TextProgressSpinner from "~/components/shared/misc/TextProgressSpinner/TextProgressSpinner.vue";
import RoleImage from "~/components/shared/role/RoleImage/RoleImage.vue";
import type { Role } from "~/composables/api/role/types/role.class";
import type { RoleName } from "~/composables/api/role/types/role.types";
import * as UseRoleName from "~/composables/api/role/useRoleName";
import { useRolesStore } from "~/stores/role/useRolesStore";
import { createFakeRole } from "@tests/unit/utils/factories/composables/api/role/role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("About Available Roles Component", () => {
  let wrapper: ReturnType<typeof mount<typeof AboutAvailableRoles>>;

  beforeEach(async() => {
    vi.spyOn(UseRoleName, "useRoleName").mockReturnValue({
      getRoleNameLabel: vi.fn((roleName: RoleName) => roleName),
      getDefiniteRoleNameLabel: vi.fn((roleName: RoleName, count: number) => `${roleName} ${count}`),
    });
    wrapper = await mountSuspendedComponent(AboutAvailableRoles);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Title", () => {
    it("should display role image with angel when rendered.", () => {
      const roleImage = wrapper.findComponent<typeof RoleImage>("#about-available-roles-title-role-image");

      expect(roleImage.props("roleName")).toBe("angel");
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
        const loadingRolesSpinner = wrapper.findComponent<typeof TextProgressSpinner>("#loading-roles-spinner");

        expect(loadingRolesSpinner.props("text")).toBe("Loading roles…");
      });
    });

    describe("Roles are set", () => {
      const roles = [
        createFakeRole({ name: "werewolf" }),
        createFakeRole({ name: "angel" }),
        createFakeRole({ name: "accursed-wolf-father" }),
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

        expect(firstSection.text()).toBe("components.AboutAvailableRoles.assistantHasManyRoles, 3");
      });

      it("should display 3 available roles accordion tabs when 3 roles are set.", () => {
        const availableRolesAccordionTabs = wrapper.findAllComponents<typeof AccordionTab>(AccordionTab);

        expect(availableRolesAccordionTabs).toHaveLength(3);
      });

      it("should render roles accordion tabs with header aria labels when roles are set.", () => {
        const availableRolesAccordionTabs = wrapper.findAllComponents<typeof AccordionTab>(AccordionTab);
        const expectedWerewolfAriaLabel = "components.AboutAvailableRoles.clickToExpandRoleDescription, {\"role\":\"werewolf\"}";
        const expectedAngelAriaLabel = "components.AboutAvailableRoles.clickToExpandRoleDescription, {\"role\":\"angel\"}";
        const expectedAccursedWolfFatherAriaLabel = "components.AboutAvailableRoles.clickToExpandRoleDescription, {\"role\":\"accursed-wolf-father\"}";
        const expectedWerewolfPassThroughOptions: AccordionTabPassThroughOptions = { headerAction: { "aria-label": expectedWerewolfAriaLabel } };
        const expectedAngelPassThroughOptions: AccordionTabPassThroughOptions = { headerAction: { "aria-label": expectedAngelAriaLabel } };
        const expectedAccursedWolfFatherPassThroughOptions: AccordionTabPassThroughOptions = { headerAction: { "aria-label": expectedAccursedWolfFatherAriaLabel } };

        expect(availableRolesAccordionTabs[0].props("pt")).toStrictEqual<AccordionTabPassThroughOptions>(expectedWerewolfPassThroughOptions);
        expect(availableRolesAccordionTabs[1].props("pt")).toStrictEqual<AccordionTabPassThroughOptions>(expectedAngelPassThroughOptions);
        expect(availableRolesAccordionTabs[2].props("pt")).toStrictEqual<AccordionTabPassThroughOptions>(expectedAccursedWolfFatherPassThroughOptions);
      });

      it("should render roles accordion tabs with header images when roles are set.", () => {
        const availableRolesAccordion = wrapper.findComponent<typeof Accordion>(Accordion);
        const roleImages = availableRolesAccordion.findAllComponents<typeof RoleImage>(RoleImage);

        expect(roleImages).toHaveLength(3);
        expect(roleImages[0].props("alt")).toBe("components.AboutAvailableRoles.availableRoleImage, {\"role\":\"werewolf\"}");
        expect(roleImages[0].props("roleName")).toBe("werewolf");
        expect(roleImages[1].props("alt")).toBe("components.AboutAvailableRoles.availableRoleImage, {\"role\":\"angel\"}");
        expect(roleImages[1].props("roleName")).toBe("angel");
        expect(roleImages[2].props("alt")).toBe("components.AboutAvailableRoles.availableRoleImage, {\"role\":\"accursed-wolf-father\"}");
        expect(roleImages[2].props("roleName")).toBe("accursed-wolf-father");
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