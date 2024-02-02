import type { mount } from "@vue/test-utils";

import GameLobbyHeader from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeader.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/mount.utils";

describe("Game Lobby Header Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyHeader>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameLobbyHeader);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});