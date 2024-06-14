import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyOptionsHubHeader from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubHeader/GameLobbyOptionsHubHeader.vue";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Options Hub Header Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubHeader>>;

  async function mountGameLobbyOptionsHubHeaderComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubHeader> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubHeader>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubHeader, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyOptionsHubHeaderComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});