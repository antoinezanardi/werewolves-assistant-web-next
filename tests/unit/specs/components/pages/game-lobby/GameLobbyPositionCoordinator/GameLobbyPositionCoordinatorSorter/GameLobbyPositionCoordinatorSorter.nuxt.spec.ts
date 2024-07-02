import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type VueDraggable from "vuedraggable";
import GameLobbyPositionCoordinatorSorter from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/GameLobbyPositionCoordinatorSorter/GameLobbyPositionCoordinatorSorter.vue";
import type { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

describe("Game Lobby Position Coordinator Sorter Component", () => {
  const defaultCreateGameDto = createFakeCreateGameDto({
    players: [
      createFakeCreateGamePlayerDto({ name: "Player 1" }),
      createFakeCreateGamePlayerDto({ name: "Player 2" }),
      createFakeCreateGamePlayerDto({ name: "Player 3" }),
      createFakeCreateGamePlayerDto({ name: "Player 4" }),
    ],
  });
  let wrapper: ReturnType<typeof mount<typeof GameLobbyPositionCoordinatorSorter>>;
  const testingPinia = { initialState: { [StoreIds.CREATE_GAME_DTO]: { createGameDto: defaultCreateGameDto } } };

  async function mountGameLobbyPositionCoordinatorSorterComponent(options: ComponentMountingOptions<typeof GameLobbyPositionCoordinatorSorter> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyPositionCoordinatorSorter>>> {
    return mountSuspendedComponent(GameLobbyPositionCoordinatorSorter, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyPositionCoordinatorSorterComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when shallow rendered.", async() => {
    wrapper = await mountGameLobbyPositionCoordinatorSorterComponent({ shallow: true });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Left Neighbors Disclaimer", () => {
    it("should translate left neighbors disclaimer text when rendered.", () => {
      const leftNeighborsDisclaimer = wrapper.find<HTMLSpanElement>("#sorter-left-neighbors-text");

      expect(leftNeighborsDisclaimer.text()).toBe("Left neighbors");
    });
  });

  describe("Sorter", () => {
    it("should update players in store when update model value event is emitted.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const sorterComponent = wrapper.findComponent<typeof VueDraggable>("#game-lobby-position-coordinator-sorter");
      const newPlayers = [
        createFakeCreateGamePlayerDto({ name: "Player 4" }),
        createFakeCreateGamePlayerDto({ name: "Player 3" }),
        createFakeCreateGamePlayerDto({ name: "Player 2" }),
        createFakeCreateGamePlayerDto({ name: "Player 1" }),
      ];
      (sorterComponent.vm as VueVm).$emit("update:modelValue", newPlayers);
      await nextTick();

      expect(createGameDtoStore.createGameDto.players).toStrictEqual<CreateGamePlayerDto[]>(newPlayers);
    });
  });

  describe("Right Neighbors Disclaimer", () => {
    it("should translate right neighbors disclaimer text when rendered.", () => {
      const rightNeighborsDisclaimer = wrapper.find<HTMLSpanElement>("#sorter-right-neighbors-text");

      expect(rightNeighborsDisclaimer.text()).toBe("Right neighbors");
    });
  });
});