import type { mount } from "@vue/test-utils";

import GameLobbyRolePickerHeader from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerHeader/GameLobbyRolePickerHeader.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Role Picker Header Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRolePickerHeader>>;

  async function mountGameLobbyRolePickerHeaderComponent(): Promise<ReturnType<typeof mount<typeof GameLobbyRolePickerHeader>>> {
    return mountSuspendedComponent(GameLobbyRolePickerHeader);
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyRolePickerHeaderComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});