import type { mount } from "@vue/test-utils";
import type { UseHeadInput } from "unhead";
import { expect } from "vitest";

import GameLobby from "~/pages/game-lobby.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Page", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobby>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameLobby);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should set head title and meta tags when rendered.", () => {
    const expectedUseHeadInput: UseHeadInput<object> = {
      title: "pages.gameLobby.startGame",
      meta: [{ name: "description", content: "pages.gameLobby.seoDescription" }],
    };

    expect(useHead).toHaveBeenCalledExactlyOnceWith(expectedUseHeadInput);
  });

  describe("Game Lobby Players Party", () => {
    it("should reset create game dto when rendered.", () => {
      const createGameDtoStore = useCreateGameDtoStore();

      expect(createGameDtoStore.resetCreateGameDto).toHaveBeenCalledExactlyOnceWith();
    });

    it("should reset game when rendered.", () => {
      const gameStore = useGameStore();

      expect(gameStore.resetGame).toHaveBeenCalledExactlyOnceWith();
    });
  });
});