import type { mount } from "@vue/test-utils";

import GameLobbyFooter from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyFooter.vue";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Footer Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyFooter>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameLobbyFooter);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});