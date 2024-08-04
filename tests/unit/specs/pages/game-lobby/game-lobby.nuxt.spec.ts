import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { createFakeUseRoute } from "@tests/unit/utils/factories/composables/nuxt/useRoute.factory";
import type { mount } from "@vue/test-utils";
import type { UseHeadInput } from "unhead";
import type { Mock } from "vitest";
import { expect } from "vitest";
import type { Ref } from "vue";
import type GameLobbyFooter from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyFooter.vue";
import type GameLobbyHeader from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeader.vue";

import type GameLobbyPlayersParty from "~/components/pages/game-lobby/GameLobbyPlayersParty/GameLobbyPlayersParty.vue";
import GameLobby from "~/pages/game-lobby.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { getError } from "@tests/unit/utils/helpers/exception.helpers";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";

const hoistedMocks = vi.hoisted(() => ({
  useRoute: {} as unknown as ReturnType<typeof useRoute>,
}));

mockNuxtImport("useRoute", () => vi.fn(() => hoistedMocks.useRoute));

describe("Game Lobby Page", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobby>>;
  let mocks: {
    components: {
      gameLobbyHeader: {
        highlightPositionCoordinatorButton: Mock;
      };
      gameLobbyRolePicker: {
        openToPickRoleForPlayer: Mock;
      };
      gameLobbyOptionsHub: {
        open: Mock;
      };
      gameLobbyPositionCoordinator: {
        open: Mock;
      };
    };
  };

  async function mountGameLobbyPageComponent(): Promise<ReturnType<typeof mount<typeof GameLobby>>> {
    mocks = {
      components: {
        gameLobbyHeader: { highlightPositionCoordinatorButton: vi.fn() },
        gameLobbyRolePicker: { openToPickRoleForPlayer: vi.fn() },
        gameLobbyOptionsHub: { open: vi.fn() },
        gameLobbyPositionCoordinator: { open: vi.fn() },
      },
    };

    return mountSuspendedComponent(GameLobby, {
      global: {
        stubs: {
          GameLobbyHeader: {
            template: "<div id='game-lobby-header-stub'></div>",
            methods: mocks.components.gameLobbyHeader,
          },
          GameLobbyRolePicker: {
            template: "<div id='game-lobby-role-picker-stub'></div>",
            methods: mocks.components.gameLobbyRolePicker,
          },
          GameLobbyOptionsHub: {
            template: "<div id='game-lobby-options-hub-stub'></div>",
            methods: mocks.components.gameLobbyOptionsHub,
          },
          GameLobbyPositionCoordinator: {
            template: "<div id='game-lobby-position-coordinator-stub'></div>",
            methods: mocks.components.gameLobbyPositionCoordinator,
          },
        },
      },
    });
  }

  beforeEach(async() => {
    hoistedMocks.useRoute = createFakeUseRoute();
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

    it("should load all audios when rendered.", () => {
      const audioStore = useAudioStore();

      expect(audioStore.loadAllAudios).toHaveBeenCalledExactlyOnceWith();
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

  describe("Game Lobby Options Hub", () => {
    it("should open game lobby options hub when game lobby players party emits open options hub event.", async() => {
      const gameLobbyHeader = wrapper.findComponent<typeof GameLobbyHeader>("#game-lobby-header");
      (gameLobbyHeader.vm as VueVm).$emit("game-options-button-click");
      await nextTick();

      expect(mocks.components.gameLobbyOptionsHub.open).toHaveBeenCalledExactlyOnceWith();
    });

    it("should throw error when game lobby header emits game options button click event but the options hub is not found in refs.", async() => {
      wrapper = await mountGameLobbyPageComponent();
      (wrapper.vm.$root?.$refs.VTU_COMPONENT as { gameLobbyOptionsHub: Ref }).gameLobbyOptionsHub.value = null;
      const gameLobbyHeader = wrapper.findComponent<typeof GameLobbyHeader>("#game-lobby-header");
      await getError(() => (gameLobbyHeader.vm as VueVm).$emit("game-options-button-click"));

      expect(createError).toHaveBeenCalledExactlyOnceWith("Game Lobby Options Hub is not defined");
    });
  });

  describe("Game Lobby Position Coordinator", () => {
    it("should open game lobby position coordinator when game lobby players party emits position coordinator button click event.", async() => {
      const gameLobbyHeader = wrapper.findComponent<typeof GameLobbyHeader>("#game-lobby-header");
      (gameLobbyHeader.vm as VueVm).$emit("position-coordinator-button-click");
      await nextTick();

      expect(mocks.components.gameLobbyPositionCoordinator.open).toHaveBeenCalledExactlyOnceWith();
    });

    it("should throw error when game lobby header emits position coordinator button click event but the position coordinator is not found in refs.", async() => {
      wrapper = await mountGameLobbyPageComponent();
      (wrapper.vm.$root?.$refs.VTU_COMPONENT as { gameLobbyPositionCoordinator: Ref }).gameLobbyPositionCoordinator.value = null;
      const gameLobbyHeader = wrapper.findComponent<typeof GameLobbyHeader>("#game-lobby-header");
      await getError(() => (gameLobbyHeader.vm as VueVm).$emit("position-coordinator-button-click"));

      expect(createError).toHaveBeenCalledExactlyOnceWith("Game Lobby Position Coordinator is not defined");
    });
  });

  describe("Reject Players Position Step", () => {
    it("should throw error when reject players position step event is emitted by footer but header is not defined in refs.", async() => {
      wrapper = await mountGameLobbyPageComponent();
      (wrapper.vm.$root?.$refs.VTU_COMPONENT as { gameLobbyHeader: Ref }).gameLobbyHeader.value = null;
      const gameLobbyFooter = wrapper.findComponent<typeof GameLobbyFooter>("#game-lobby-footer");
      await getError(() => (gameLobbyFooter.vm as VueVm).$emit("reject-players-position-step"));

      expect(createError).toHaveBeenCalledExactlyOnceWith("Game Lobby Header is not defined");
    });

    it("should highlight position coordinator button when reject players position step event is emitted by footer.", async() => {
      const gameLobbyFooter = wrapper.findComponent<typeof GameLobbyFooter>("#game-lobby-footer");
      (gameLobbyFooter.vm as VueVm).$emit("reject-players-position-step");
      await nextTick();

      expect(mocks.components.gameLobbyHeader.highlightPositionCoordinatorButton).toHaveBeenCalledExactlyOnceWith();
    });

    it("should open position coordinator after timeout when reject players position step event is emitted by footer.", async() => {
      const gameLobbyFooter = wrapper.findComponent<typeof GameLobbyFooter>("#game-lobby-footer");
      (gameLobbyFooter.vm as VueVm).$emit("reject-players-position-step");
      vi.advanceTimersByTime(1000);
      await nextTick();

      expect(mocks.components.gameLobbyPositionCoordinator.open).toHaveBeenCalledExactlyOnceWith();
    });
  });

  describe("Inject player from query", () => {
    it("should set players to create game dto when query is fulfilled with player names.", async() => {
      hoistedMocks.useRoute.query = { playerNames: ["Antoine", "Benoit", "Corentin"] };
      wrapper = await mountGameLobbyPageComponent();
      const createGameDtoStore = useCreateGameDtoStore();

      expect(createGameDtoStore.setPlayersToCreateGameDto).toHaveBeenCalledExactlyOnceWith([
        createFakeCreateGamePlayerDto({ name: "Antoine" }),
        createFakeCreateGamePlayerDto({ name: "Benoit" }),
        createFakeCreateGamePlayerDto({ name: "Corentin" }),
      ]);
    });

    it("should not set players to create game dto when query is not fulfilled with player names.", async() => {
      hoistedMocks.useRoute.query = { toto: "tata" };
      wrapper = await mountGameLobbyPageComponent();
      const createGameDtoStore = useCreateGameDtoStore();

      expect(createGameDtoStore.setPlayersToCreateGameDto).not.toHaveBeenCalled();
    });
  });
});