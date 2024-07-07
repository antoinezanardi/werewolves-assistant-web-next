import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import type { mount } from "@vue/test-utils";

import GameLobbyFooter from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyFooter.vue";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type GameLobbyStartGameButton from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameButton.vue";

describe("Game Lobby Footer Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyFooter>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameLobbyFooter);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Lobby Start Game Button", () => {
    it("should emit reject players position step when game lobby start game button emits the same.", () => {
      const gameLobbyStartGameButton = wrapper.findComponent<typeof GameLobbyStartGameButton>("#game-lobby-start-game-button");
      (gameLobbyStartGameButton.vm as VueVm).$emit("rejectPlayersPositionStep");

      expect(wrapper.emitted("rejectPlayersPositionStep")).toHaveLength(1);
    });
  });
});