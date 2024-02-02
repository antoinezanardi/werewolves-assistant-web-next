import type { mount } from "@vue/test-utils";

import GameLobby from "~/pages/game-lobby.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/mount.utils";

describe("Game Lobby Page", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobby>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameLobby);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});