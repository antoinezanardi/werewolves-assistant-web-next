import type { mount } from "@vue/test-utils";

import GameLobby from "~/pages/game-lobby.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Page", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobby>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameLobby);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Lobby Players Party", () => {
    it("should reset create game dto when rendered.", () => {
      const createGameDtoStore = useCreateGameDtoStore();

      expect(createGameDtoStore.resetCreateGameDto).toHaveBeenCalledExactlyOnceWith();
    });
  });
});