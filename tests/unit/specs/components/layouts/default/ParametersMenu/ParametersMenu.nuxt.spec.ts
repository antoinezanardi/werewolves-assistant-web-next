import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { mount } from "@vue/test-utils";
import { MouseEvent } from "happy-dom";
import type { Mock } from "vitest";

import type { VuePrimeButton } from "#components";
import ParametersMenu from "~/components/layouts/default/NavBar/ParametersMenu/ParametersMenu.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/mount.utils";

const { tMock } = vi.hoisted(() => ({ tMock: vi.fn() }));

describe("Parameters Menu Component", () => {
  let wrapper: ReturnType<typeof mount<typeof ParametersMenu>>;

  beforeAll(() => {
    mockNuxtImport("useI18n", () => (): { t: Mock } => ({ t: tMock }));
  });

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(ParametersMenu);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Parameters Menu Button", () => {
    it("should open the parameters menu when clicked.", async() => {
      const toggleMenuMock = vi.fn();
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
      const parametersMenuButton = wrapper.findComponent<typeof VuePrimeButton>("[aria-label='Parameters']");
      await parametersMenuButton.trigger("click");

      expect(toggleMenuMock).toHaveBeenCalledExactlyOnceWith(expect.any(MouseEvent));
    });
  });
});