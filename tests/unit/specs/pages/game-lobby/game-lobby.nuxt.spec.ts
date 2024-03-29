import type { mount } from "@vue/test-utils";
import type { UseHeadInput } from "unhead";
import type { Mock } from "vitest";
import { expect } from "vitest";
import type { Ref } from "vue";

import type GameLobbyPlayersParty from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayersParty.vue";
import GameLobby from "~/pages/game-lobby.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeCreateGamePlayerDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { getError } from "~/tests/unit/utils/helpers/exception.helpers";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Page", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobby>>;
  let mocks: {
    components: {
      gameLobbyRolePicker: {
        openToPickRoleForPlayer: Mock;
      }
    }
  };

  async function mountGameLobbyPageComponent(): Promise<ReturnType<typeof mount<typeof GameLobby>>> {
    mocks = { components: { gameLobbyRolePicker: { openToPickRoleForPlayer: vi.fn() } } };

    return mountSuspendedComponent(GameLobby, {
      global: {
        stubs: {
          GameLobbyRolePicker: {
            template: "<div id='game-lobby-role-picker-stub'></div>",
            methods: mocks.components.gameLobbyRolePicker,
          },
        },
      },
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyPageComponent();
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

  describe("Game Lobby Role Picker", () => {
    it("should open role picker modal when game lobby players party emits pick role for player event.", async() => {
      const emittedPlayer = createFakeCreateGamePlayerDto();
      const gameLobbyPlayersParty = wrapper.findComponent<typeof GameLobbyPlayersParty>("#game-lobby-players-party");
      (gameLobbyPlayersParty.vm as VueVm).$emit("pick-role-for-player", emittedPlayer);
      await nextTick();

      expect(mocks.components.gameLobbyRolePicker.openToPickRoleForPlayer).toHaveBeenCalledExactlyOnceWith(emittedPlayer);
    });

    it("should not open role picker modal when game lobby players party emits pick role for player event with no player.", async() => {
      const gameLobbyPlayersParty = wrapper.findComponent<typeof GameLobbyPlayersParty>("#game-lobby-players-party");
      (gameLobbyPlayersParty.vm as VueVm).$emit("pick-role-for-player", undefined);
      await nextTick();

      expect(mocks.components.gameLobbyRolePicker.openToPickRoleForPlayer).not.toHaveBeenCalled();
    });

    it("should throw error when game lobby players party emits pick role for player event but the role picker is not found in refs.", async() => {
      wrapper = await mountGameLobbyPageComponent();
      (wrapper.vm.$root?.$refs.VTU_COMPONENT as { gameLobbyRolePicker: Ref }).gameLobbyRolePicker.value = null;
      const gameLobbyPlayersParty = wrapper.findComponent<typeof GameLobbyPlayersParty>("#game-lobby-players-party");
      await getError(() => (gameLobbyPlayersParty.vm as VueVm).$emit("pick-role-for-player", createFakeCreateGamePlayerDto()));
      expect(createError).toHaveBeenCalledExactlyOnceWith("Game Lobby Role Picker is not defined");
    });
  });
});