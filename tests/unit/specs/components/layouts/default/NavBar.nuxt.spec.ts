import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { NuxtImg, NuxtLink } from "#components";
import NavBar from "~/components/layouts/default/NavBar/NavBar.vue";
import type ParametersMenu from "~/components/layouts/default/NavBar/ParametersMenu/ParametersMenu.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("NavBar Component", () => {
  let wrapper: ReturnType<typeof mount<typeof NavBar>>;

  async function mountNavBarComponent(options: ComponentMountingOptions<typeof NavBar> = {}): Promise<ReturnType<typeof mount<typeof NavBar>>> {
    const defaultMountingOptions: ComponentMountingOptions<typeof NavBar> = { global: { stubs: { ParametersMenu: true } } };

    return mountSuspendedComponent(NavBar, {
      ...defaultMountingOptions,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountNavBarComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Home Page Link", () => {
    it("should have the prop 'to' set to home page when rendered.", () => {
      const homePageLink = wrapper.findComponent<typeof NuxtLink>("#navbar-logo-link");

      expect(homePageLink.props("to")).toBe("/");
    });

    describe("Werewolves Assistant Logo", () => {
      it("should have the prop 'src' set to the small logo when rendered.", async() => {
        wrapper = await mountNavBarComponent({ shallow: false });
        const werewolvesAssistantLogo = wrapper.findComponent<typeof NuxtImg>("[alt='Werewolves Assistant logo']");

        expect(werewolvesAssistantLogo.attributes("src")).toBe("/_ipx/_/img/logo/square/werewolves-logo-small.png");
      });
    });

    describe("Werewolves Assistant Logo Text", () => {
      it("should translate the logo text when rendered.", async() => {
        wrapper = await mountNavBarComponent({ shallow: false });
        const werewolvesAssistantLogoText = wrapper.find<HTMLHeadElement>("#navbar-werewolves-assistant-logo-text");

        expect(werewolvesAssistantLogoText.text()).toBe("Werewolves Assistant");
      });
    });
  });

  describe("Parameters Menu", () => {
    it("should have left tooltip when rendered.", async() => {
      wrapper = await mountNavBarComponent({ shallow: false });
      const parametersMenu = wrapper.findComponent<typeof ParametersMenu>("#navbar-parameters-menu");

      expect(parametersMenu.attributes("data-pd-tooltip")).toBe("true");
    });
  });
});