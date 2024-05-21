import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyOptionsHubRolesTab from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTab.vue";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Options Hub Roles Tab Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTab>>;

  async function mountGameLobbyOptionsHubRolesTabComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTab> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTab>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTab, { ...options });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyOptionsHubRolesTabComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});