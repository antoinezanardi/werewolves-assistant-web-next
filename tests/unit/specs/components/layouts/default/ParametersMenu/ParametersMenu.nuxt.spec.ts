import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import { MouseEvent } from "happy-dom";
import Menu from "primevue/menu";
import type { MenuItem } from "primevue/menuitem";
import type { Mock } from "vitest";
import { beforeAll, expect } from "vitest";
import type { Ref } from "vue";

import type { VuePrimeButton } from "@nuxt/components";
import ParametersMenu from "~/components/layouts/default/NavBar/ParametersMenu/ParametersMenu.vue";
import { Game } from "~/composables/api/game/types/game.class";
import * as UseVuePrimeToasts from "~/composables/vue-prime/useVuePrimeToasts";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeUseVuePrimeToasts } from "@tests/unit/utils/factories/composables/vue-prime/useVuePrimeToasts.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Parameters Menu Component", () => {
  let wrapper: ReturnType<typeof mount<typeof ParametersMenu>>;
  let mocks: {
    composables: {
      useVuePrimeToasts: ReturnType<typeof createFakeUseVuePrimeToasts>;
    };
  };

  beforeEach(async() => {
    mocks = { composables: { useVuePrimeToasts: createFakeUseVuePrimeToasts() } };
    vi.spyOn(UseVuePrimeToasts, "useVuePrimeToasts").mockReturnValue(mocks.composables.useVuePrimeToasts);
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
    let testingPinia: ReturnType<typeof createTestingPinia>;
    let gameStore: ReturnType<typeof useGameStore>;

    beforeAll(() => {
      testingPinia = createTestingPinia();
      gameStore = useGameStore(testingPinia);
    });

    beforeEach(async() => {
      wrapper = await mountSuspendedComponent(ParametersMenu, {
        shallow: false,
        global: { plugins: [testingPinia] },
      });
      const parametersMenuButton = wrapper.findComponent<typeof VuePrimeButton>("[aria-label='Parameters']");
      await parametersMenuButton.trigger("click");
    });

    it("should show success toast when game is canceled.", async() => {
      gameStore.game = createFakeGame({ status: "playing" });
      await nextTick();
      document.querySelector<HTMLElement>("[aria-label=\"components.ParametersMenu.cancelGame\"] .p-menuitem-link")?.click();

      expect(mocks.composables.useVuePrimeToasts.addSuccessToast).toHaveBeenCalledExactlyOnceWith({ summary: "components.ParametersMenu.gameCanceled" });
    });

    it("should pass the default items to the menu when rendered.", async() => {
      gameStore.game = new Game();
      await nextTick();
      const parametersMenu = wrapper.findComponent<typeof Menu>(Menu);

      expect(parametersMenu.props("model")).toStrictEqual<MenuItem[]>([
        {
          visible: false,
          items: [
            {
              label: "components.ParametersMenu.cancelGame",
              disabled: true,
              icon: "fa fa-ban text-danger",
              command: expect.any(Function) as () => Promise<void>,
            },
          ],
          label: "components.ParametersMenu.game",
        },
        {
          label: "components.ParametersMenu.backToHome",
          icon: "fa fa-sign-out",
          arialLabel: "components.ParametersMenu.backToHome",
          command: expect.any(Function) as () => Promise<void>,
        },
      ]);
    });

    it("should pass the default items and game items to the menu when game is defined and playing.", async() => {
      gameStore.game = createFakeGame({ status: "playing" });
      await nextTick();
      const parametersMenu = wrapper.findComponent<typeof Menu>(Menu);

      expect(parametersMenu.props("model")).toStrictEqual<MenuItem[]>([
        {
          visible: true,
          items: [
            {
              label: "components.ParametersMenu.cancelGame",
              disabled: false,
              icon: "fa fa-ban text-danger",
              command: expect.any(Function) as () => Promise<void>,
            },
          ],
          label: "components.ParametersMenu.game",
        },
        {
          label: "components.ParametersMenu.backToHome",
          icon: "fa fa-sign-out",
          arialLabel: "components.ParametersMenu.backToHome",
          command: expect.any(Function) as () => Promise<void>,
        },
      ]);
    });

    it("should pass the default items and game items to the menu with cancel game to disabled when game is defined and not playing.", async() => {
      const store = useGameStore();
      store.game = createFakeGame({ status: "canceled" });
      await nextTick();
      const parametersMenu = wrapper.findComponent<typeof Menu>(Menu);

      expect(parametersMenu.props("model")).toStrictEqual<MenuItem[]>([
        {
          visible: true,
          items: [
            {
              label: "components.ParametersMenu.cancelGame",
              disabled: true,
              icon: "fa fa-ban text-danger",
              command: expect.any(Function) as () => Promise<void>,
            },
          ],
          label: "components.ParametersMenu.game",
        },
        {
          label: "components.ParametersMenu.backToHome",
          icon: "fa fa-sign-out",
          arialLabel: "components.ParametersMenu.backToHome",
          command: expect.any(Function) as () => Promise<void>,
        },
      ]);
    });

    it("should cancel game when clicking on cancel game button.", async() => {
      gameStore.game = createFakeGame({ status: "playing" });
      await nextTick();
      document.querySelector<HTMLElement>("[aria-label=\"components.ParametersMenu.cancelGame\"] .p-menuitem-link")?.click();

      expect(gameStore.cancelGame).toHaveBeenCalledExactlyOnceWith();
    });

    it("should navigate to home page when clicking on back to home button.", () => {
      document.querySelector<HTMLElement>("[aria-label=\"components.ParametersMenu.backToHome\"] .p-menuitem-link")?.click();

      expect(navigateTo).toHaveBeenCalledExactlyOnceWith("/");
    });
  });
});