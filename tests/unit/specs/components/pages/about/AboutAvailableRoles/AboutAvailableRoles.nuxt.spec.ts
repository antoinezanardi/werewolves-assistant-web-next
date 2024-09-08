import type { mount } from "@vue/test-utils";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
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
    wrapper = await mountSuspendedComponent(AboutAvailableRoles, {
      global: {
        stubs: {
          ClientOnly: false,
          Accordion: false,
          AccordionPanel: false,
          AccordionHeader: false,
          AccordionContent: false,
        },
      },
    });
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

      it("should display 3 available roles accordion panels when 3 roles are set.", () => {
        const availableRolesAccordionPanels = wrapper.findAllComponents<typeof AccordionPanel>(AccordionPanel);

        expect(availableRolesAccordionPanels).toHaveLength(3);
      });

      it("should render roles accordion panels with header aria labels when roles are set.", () => {
        const availableRolesAccordionHeaders = wrapper.findAllComponents<typeof AccordionHeader>(AccordionHeader);
        const expectedWerewolfAriaLabel = "components.AboutAvailableRoles.clickToExpandRoleDescription, {\"role\":\"werewolf\"}";
        const expectedAngelAriaLabel = "components.AboutAvailableRoles.clickToExpandRoleDescription, {\"role\":\"angel\"}";
        const expectedAccursedWolfFatherAriaLabel = "components.AboutAvailableRoles.clickToExpandRoleDescription, {\"role\":\"accursed-wolf-father\"}";
        const firstAriaLabel = availableRolesAccordionHeaders[0].attributes("aria-label");
        const secondAriaLabel = availableRolesAccordionHeaders[1].attributes("aria-label");
        const thirdAriaLabel = availableRolesAccordionHeaders[2].attributes("aria-label");

        expect(firstAriaLabel).toBe(expectedWerewolfAriaLabel);
        expect(secondAriaLabel).toBe(expectedAngelAriaLabel);
        expect(thirdAriaLabel).toBe(expectedAccursedWolfFatherAriaLabel);
      });

      it("should render roles accordion panels with header images when roles are set.", () => {
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

      it("should display werewolf role description for first accordion panel when first accordion panel is for werewolf role.", () => {
        const availableRolesAccordionPanels = wrapper.findAllComponents<typeof AccordionPanel>(AccordionPanel);
        const firstAccordionPanel = availableRolesAccordionPanels[0];
        const aboutAvailableRoleDescription = firstAccordionPanel.findComponent<typeof AboutAvailableRoleDescription>(AboutAvailableRoleDescription);

        expect(aboutAvailableRoleDescription.props("role")).toStrictEqual<Role>(roles[0]);
      });
    });
  });
});