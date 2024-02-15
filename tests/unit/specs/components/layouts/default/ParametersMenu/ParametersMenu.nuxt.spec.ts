import type { mount } from "@vue/test-utils";
import { MouseEvent } from "happy-dom";
import Menu from "primevue/menu";
import type { MenuItem } from "primevue/menuitem";
import type { Mock } from "vitest";
import { expect } from "vitest";
import type { Ref } from "vue";

import type { VuePrimeButton } from "#components";
import ParametersMenu from "~/components/layouts/default/NavBar/ParametersMenu/ParametersMenu.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Parameters Menu Component", () => {
  let wrapper: ReturnType<typeof mount<typeof ParametersMenu>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(ParametersMenu);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Parameters Menu Button", () => {
    let toggleMenuMock: Mock;

    beforeEach(async() => {
      toggleMenuMock = vi.fn();
      wrapper = await mountSuspendedComponent(ParametersMenu, {
        global: {
          stubs: {
            Menu: {
              template: "<div></div>",
              methods: { toggle: toggleMenuMock },
            },
          },
        },
      });
    });

    it("should open the parameters menu when clicked.", async() => {
      const parametersMenuButton = wrapper.findComponent<typeof VuePrimeButton>("[aria-label='Parameters']");
      await parametersMenuButton.trigger("click");

      expect(toggleMenuMock).toHaveBeenCalledExactlyOnceWith(expect.any(MouseEvent));
    });

    it("should not open the parameters menu and throw error when clicked if the menu is not found in refs.", async() => {
      wrapper = await mountSuspendedComponent(ParametersMenu, {
        global: {
          stubs: {
            Menu: {
              template: "<div></div>",
              methods: { toggle: toggleMenuMock },
            },
          },
        },
      });
      (wrapper.vm.$root?.$refs.VTU_COMPONENT as { parametersMenu: Ref }).parametersMenu.value = null;
      const parametersMenuButton = wrapper.findComponent<typeof VuePrimeButton>("[aria-label='Parameters']");
      await parametersMenuButton.trigger("click");

      expect(toggleMenuMock).not.toHaveBeenCalled();
      expect(createError).toHaveBeenCalledExactlyOnceWith("Parameters Menu is not initialized");
    });
  });

  describe("Parameters Menu", () => {
    beforeEach(async() => {
      wrapper = await mountSuspendedComponent(ParametersMenu, { shallow: false });
      const parametersMenuButton = wrapper.findComponent<typeof VuePrimeButton>("[aria-label='Parameters']");
      await parametersMenuButton.trigger("click");
    });

    it("should pass the correct items to the menu when rendered.", () => {
      const parametersMenu = wrapper.findComponent<typeof Menu>(Menu);

      expect(parametersMenu.props("model")).toStrictEqual<MenuItem[]>([
        {
          label: "components.ParametersMenu.backToHome",
          icon: "fa fa-sign-out",
          arialLabel: "components.ParametersMenu.backToHome",
          command: expect.any(Function) as () => Promise<void>,
        },
      ]);
    });

    it("should navigate to home page when clicking on back to home button.", () => {
      document.querySelector<HTMLElement>("[aria-label=\"components.ParametersMenu.backToHome\"] .p-menuitem-link")?.click();

      expect(navigateTo).toHaveBeenCalledExactlyOnceWith("/");
    });
  });
});