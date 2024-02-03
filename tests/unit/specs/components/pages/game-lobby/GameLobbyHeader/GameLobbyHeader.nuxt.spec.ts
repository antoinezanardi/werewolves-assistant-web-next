import type { mount } from "@vue/test-utils";

import GameLobbyHeader from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeader.vue";
import type GameLobbyPlayerInput from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyPlayerInput/GameLobbyPlayerInput.vue";
import { mountSuspendedComponent } from "~/tests/unit/utils/mount.utils";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Header Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyHeader>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameLobbyHeader);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Lobby Player Input", () => {
    it("should pass empty input value when rendered.", () => {
      const gameLobbyPlayerInput = wrapper.findComponent<typeof GameLobbyPlayerInput>("#game-lobby-player-input");

      expect(gameLobbyPlayerInput.props("modelValue")).toBe("");
    });

    it("should update ref when input emits update event.", async() => {
      const gameLobbyPlayerInput = wrapper.findComponent<typeof GameLobbyPlayerInput>("#game-lobby-player-input");

      (gameLobbyPlayerInput.vm as VueVm).$emit("update:modelValue", "Player 1");
      await nextTick();

      expect(gameLobbyPlayerInput.props("modelValue")).toBe("Player 1");
    });
  });
});