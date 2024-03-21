import type { mount } from "@vue/test-utils";

import GameLobbyRolePickerFooter from "~/components/pages/game-lobby/GameLobbyRolePicker/GameLobbyRolePickerFooter/GameLobbyRolePickerFooter.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Role Picker Footer Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRolePickerFooter>>;

  async function mountGameLobbyRolePickerFooterComponent(): Promise<ReturnType<typeof mount<typeof GameLobbyRolePickerFooter>>> {
    return mountSuspendedComponent(GameLobbyRolePickerFooter);
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyRolePickerFooterComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});