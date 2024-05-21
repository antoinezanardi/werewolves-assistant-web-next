import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type GameLobbyHeaderOptionsButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderOptionsButton/GameLobbyHeaderOptionsButton.vue";
import GameLobbyHeaderSetupButtons from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderSetupButtons.vue";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Header Setup Buttons Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyHeaderSetupButtons>>;

  async function mountGameLobbyHeaderSetupButtonsComponent(options: ComponentMountingOptions<typeof GameLobbyHeaderSetupButtons> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyHeaderSetupButtons>>> {
    return mountSuspendedComponent(GameLobbyHeaderSetupButtons, {
      global: { stubs: { ButtonGroup: false } },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyHeaderSetupButtonsComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Options Button", () => {
    it("should emit 'gameOptionsButtonClick' event when clicked.", () => {
      const optionsButton = wrapper.findComponent<typeof GameLobbyHeaderOptionsButton>("#game-lobby-header-options-button");
      (optionsButton.vm as VueVm).$emit("gameOptionsButtonClick");

      expect(wrapper.emitted("gameOptionsButtonClick")).toBeTruthy();
    });
  });
});