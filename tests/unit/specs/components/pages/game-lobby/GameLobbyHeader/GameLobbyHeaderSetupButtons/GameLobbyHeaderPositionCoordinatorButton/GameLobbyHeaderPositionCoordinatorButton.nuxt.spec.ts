import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Button from "primevue/button";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import GameLobbyHeaderPositionCoordinatorButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderPositionCoordinatorButton/GameLobbyHeaderPositionCoordinatorButton.vue";

describe("Game Lobby Header Position Coordinator Button Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyHeaderPositionCoordinatorButton>>;

  async function mountGameLobbyHeaderPositionCoordinatorButtonComponent(options: ComponentMountingOptions<typeof GameLobbyHeaderPositionCoordinatorButton> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyHeaderPositionCoordinatorButton>>> {
    return mountSuspendedComponent(GameLobbyHeaderPositionCoordinatorButton, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyHeaderPositionCoordinatorButtonComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Position Coordinator button", () => {
    it("should translate button label when rendered.", async() => {
      wrapper = await mountGameLobbyHeaderPositionCoordinatorButtonComponent({
        global: {
          stubs: {
            Button: false,
          },
        },
      });
      const button = wrapper.findComponent<typeof Button>("#game-lobby-header-position-coordinator-button");

      expect(button.text()).toBe("Players positions");
    });

    describe("Click on button", () => {
      it("should emit 'positionCoordinatorButtonClick' event when clicked.", async() => {
        const button = wrapper.findComponent<typeof Button>("#game-lobby-header-position-coordinator-button");
        await button.trigger("click");

        expect(wrapper.emitted("positionCoordinatorButtonClick")).toBeTruthy();
      });
    });
  });
});