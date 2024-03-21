import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import GameLobbyRolePicker from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePicker.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Role Picker Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRolePicker>>;

  async function mountGameLobbyRolePickerComponent(options: ComponentMountingOptions<typeof GameLobbyRolePicker> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyRolePicker>>> {
    return mountSuspendedComponent(GameLobbyRolePicker, {
      shallow: false,
      global: {
        stubs: {
          GameLobbyRolePickerHeader: true,
          GameLobbyRolePickerDescription: true,
          GameLobbyRolePickerGrid: true,
          GameLobbyRolePickerFooter: true,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyRolePickerComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});