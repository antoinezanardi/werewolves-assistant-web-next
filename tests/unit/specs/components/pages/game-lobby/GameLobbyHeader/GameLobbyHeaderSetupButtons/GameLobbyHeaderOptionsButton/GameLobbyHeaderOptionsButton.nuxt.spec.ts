import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Button from "primevue/button";
import GameLobbyHeaderOptionsButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderOptionsButton/GameLobbyHeaderOptionsButton.vue";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Header Options Button Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyHeaderOptionsButton>>;

  async function mountGameLobbyHeaderOptionsButtonComponent(options: ComponentMountingOptions<typeof GameLobbyHeaderOptionsButton> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyHeaderOptionsButton>>> {
    return mountSuspendedComponent(GameLobbyHeaderOptionsButton, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyHeaderOptionsButtonComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Options Button", () => {
    it("should translate button label when rendered.", async() => {
      wrapper = await mountGameLobbyHeaderOptionsButtonComponent({
        global: {
          stubs: {
            Button: false,
          },
        },
      });
      const button = wrapper.findComponent<typeof Button>("#game-lobby-header-options-button");

      expect(button.text()).toBe("Game options");
    });

    describe("Click on button", () => {
      it("should emit 'gameOptionsButtonClick' event when clicked.", async() => {
        const button = wrapper.findComponent<typeof Button>("#game-lobby-header-options-button");
        await button.trigger("click");

        expect(wrapper.emitted("gameOptionsButtonClick")).toBeTruthy();
      });
    });
  });
});