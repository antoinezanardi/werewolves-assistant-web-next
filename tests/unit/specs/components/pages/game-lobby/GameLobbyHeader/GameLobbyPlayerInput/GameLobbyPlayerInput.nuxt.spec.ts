import type { mount } from "@vue/test-utils";

import GameLobbyPlayerInput from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyPlayerInput/GameLobbyPlayerInput.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/mount.utils";

describe("Game Lobby Player Input Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyPlayerInput>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameLobbyPlayerInput);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});