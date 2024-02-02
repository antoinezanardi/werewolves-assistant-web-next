import type { mount } from "@vue/test-utils";

import GameLobbyPlayersParty from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayersParty.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/mount.utils";

describe("Game Lobby Players Party Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyPlayersParty>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameLobbyPlayersParty);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});