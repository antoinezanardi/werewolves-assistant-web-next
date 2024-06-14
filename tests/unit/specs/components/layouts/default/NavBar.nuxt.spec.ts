import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { NuxtImg, NuxtLink } from "@nuxt/components";
import type MuteButton from "~/components/layouts/default/NavBar/MuteButton/MuteButton.vue";
import * as UseWerewolvesAssistantRoutes from "~/composables/route/useWerewolvesAssistantRoutes";
import NavBar from "~/components/layouts/default/NavBar/NavBar.vue";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";

describe("NavBar Component", () => {
  const isOnGamePage = ref<boolean>(true);
  let mocks: { composables: { useWerewolvesAssistantRoutes: ReturnType<typeof UseWerewolvesAssistantRoutes.useWerewolvesAssistantRoutes> } };
  let wrapper: ReturnType<typeof mount<typeof NavBar>>;

  async function mountNavBarComponent(options: ComponentMountingOptions<typeof NavBar> = {}): Promise<ReturnType<typeof mount<typeof NavBar>>> {
    const defaultMountingOptions: ComponentMountingOptions<typeof NavBar> = { global: { stubs: { ParametersMenu: true } } };

    return mountSuspendedComponent(NavBar, {
      ...defaultMountingOptions,
      ...options,
    });
  }

  beforeEach(async() => {
    isOnGamePage.value = true;
    mocks = { composables: { useWerewolvesAssistantRoutes: { isOnGamePage: computed<boolean>(() => isOnGamePage.value) } } };
    vi.spyOn(UseWerewolvesAssistantRoutes, "useWerewolvesAssistantRoutes").mockReturnValue(mocks.composables.useWerewolvesAssistantRoutes);
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

  describe("Mute Button", () => {
    it("should render when on game page.", () => {
      const muteButton = wrapper.findComponent<typeof MuteButton>("#navbar-mute-button");

      expect(muteButton.exists()).toBeTruthy();
    });

    it("should not render when not on game page.", async() => {
      isOnGamePage.value = false;
      await nextTick();
      const muteButton = wrapper.findComponent<typeof MuteButton>("#navbar-mute-button");

      expect(muteButton.exists()).toBeFalsy();
    });
  });

  describe("Parameters Menu", () => {
    it("should have left tooltip when rendered.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#navbar-parameters-menu") };
      wrapper = await mountNavBarComponent({ shallow: false, global: { directives } });

      expect(tooltip.value).toBe("Parameters");
    });
  });
});