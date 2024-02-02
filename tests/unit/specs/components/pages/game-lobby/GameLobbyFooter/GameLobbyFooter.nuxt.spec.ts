import type { mount } from "@vue/test-utils";

import GameLobbyFooter from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyFooter.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/mount.utils";

describe("Game Lobby Footer Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyFooter>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameLobbyFooter);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});