import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyOptionsHubRolesTabSheriffElection from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabSheriff/GameLobbyOptionsHubRolesTabSheriffElection/GameLobbyOptionsHubRolesTabSheriffElection.vue";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Options Hub Roles Tab Sheriff Election Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabSheriffElection>>;

  async function mountGameLobbyOptionsHubRolesTabSheriffElectionComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabSheriffElection> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabSheriffElection>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabSheriffElection, {
      global: {
        stubs: {
          Fieldset: false,
          GameOptionInputGroup: false,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyOptionsHubRolesTabSheriffElectionComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});