import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { useBreakpoints } from "@vueuse/core";
import type Button from "primevue/button";
import type { Mock } from "vitest";
import type { Ref } from "vue";

import GameLobbyRandomCompositionButton from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyRandomCompositionButton/GameLobbyRandomCompositionButton.vue";
import * as UseFetchRandomGameComposition from "~/composables/api/game/useFetchRandomGameComposition";
import * as UseBreakpoints from "@vueuse/core";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";

describe("Game Lobby Random Composition Button Component", () => {
  const isSmallerThanMd = ref<boolean>(false);
  const defaultCreateGameDto = createFakeCreateGameDto();
  const testingPinia = { initialState: { [StoreIds.CREATE_GAME_DTO]: { createGameDto: defaultCreateGameDto } } };
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRandomCompositionButton>>;
  let mocks: {
    composables: {
      useFetchRandomGameComposition: {
        fetchRandomGameComposition: Mock;
      };
      useBreakpoints: {
        smaller: Mock;
      };
    };
  };

  async function mountGameLobbyRandomCompositionButtonComponent(options: ComponentMountingOptions<typeof GameLobbyRandomCompositionButton> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyRandomCompositionButton>>> {
    return mountSuspendedComponent(GameLobbyRandomCompositionButton, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    isSmallerThanMd.value = false;
    mocks = {
      composables: {
        useFetchRandomGameComposition: { fetchRandomGameComposition: vi.fn(() => []) },
        useBreakpoints: { smaller: vi.fn(() => isSmallerThanMd) },
      },
    };
    vi.spyOn(UseFetchRandomGameComposition, "useFetchRandomGameComposition").mockImplementation(() => mocks.composables.useFetchRandomGameComposition);
    vi.spyOn(UseBreakpoints, "useBreakpoints").mockReturnValue(mocks.composables.useBreakpoints as unknown as ReturnType<typeof useBreakpoints>);
    wrapper = await mountGameLobbyRandomCompositionButtonComponent();
    const createGameDtoStore = useCreateGameDtoStore();
    createGameDtoStore.createGameDto = createFakeCreateGameDto(defaultCreateGameDto);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Button container", () => {
    it("should assign tooltip when button is disabled.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#game-lobby-random-composition-button-container") };
      wrapper = await mountGameLobbyRandomCompositionButtonComponent({
        global: {
          plugins: [createTestingPinia(testingPinia)],
          directives,
        },
      });
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto({ players: [] });
      await nextTick();

      expect(tooltip.value).toBe("components.GameLobbyRandomCompositionButton.minPlayersNotReached");
    });

    it("should not assign tooltip when button is enabled.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#game-lobby-random-composition-button-container") };
      wrapper = await mountGameLobbyRandomCompositionButtonComponent({
        global: {
          plugins: [createTestingPinia(testingPinia)],
          directives,
        },
      });
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players: [
          createFakeCreateGamePlayerDto({ name: "Player 1" }),
          createFakeCreateGamePlayerDto({ name: "Player 2" }),
          createFakeCreateGamePlayerDto({ name: "Player 3" }),
          createFakeCreateGamePlayerDto({ name: "Player 4" }),
        ],
      });
      await nextTick();

      expect(tooltip.value).toBeUndefined();
    });

    describe("Button", () => {
      it("should have label when screen is not smaller than md.", async() => {
        wrapper = await mountGameLobbyRandomCompositionButtonComponent({
          global: {
            stubs: { Button: false },
            plugins: [createTestingPinia(testingPinia)],
          },
        });
        const button = wrapper.findComponent<typeof Button>(".random-composition-button");

        expect(button.text()).toBe("components.GameLobbyRandomCompositionButton.randomComposition");
      });

      it("should not have label when screen is smaller than md.", async() => {
        wrapper = await mountGameLobbyRandomCompositionButtonComponent({
          global: {
            stubs: { Button: false },
            plugins: [createTestingPinia(testingPinia)],
          },
        });
        isSmallerThanMd.value = true;
        await nextTick();
        const button = wrapper.findComponent<typeof Button>(".random-composition-button");

        expect(button.text()).toBe("");
      });

      it("should have large size when screen is not smaller than md.", () => {
        const button = wrapper.findComponent<typeof Button>(".random-composition-button");

        expect(button.attributes("size")).toBe("large");
      });

      it("should have small size when screen is smaller than md.", async() => {
        isSmallerThanMd.value = true;
        await nextTick();
        const button = wrapper.findComponent<typeof Button>(".random-composition-button");

        expect(button.attributes("size")).toBe("small");
      });

      it("should be disabled when min of players is not reached.", async() => {
        const createGameDtoStore = useCreateGameDtoStore();
        createGameDtoStore.createGameDto = createFakeCreateGameDto({ players: [] });
        await nextTick();
        const button = wrapper.findComponent<typeof Button>(".random-composition-button");

        expect(button.attributes("disabled")).toBe("true");
      });

      it("should be enabled when min of players is reached.", async() => {
        const createGameDtoStore = useCreateGameDtoStore();
        createGameDtoStore.createGameDto = createFakeCreateGameDto({
          players: [
            createFakeCreateGamePlayerDto({ name: "Player 1" }),
            createFakeCreateGamePlayerDto({ name: "Player 2" }),
            createFakeCreateGamePlayerDto({ name: "Player 3" }),
            createFakeCreateGamePlayerDto({ name: "Player 4" }),
          ],
        });
        await nextTick();
        const button = wrapper.findComponent<typeof Button>(".random-composition-button");

        expect(button.attributes("disabled")).toBe("false");
      });

      describe("Click on button", () => {
        beforeEach(() => {
          const createGameDtoStore = useCreateGameDtoStore();
          createGameDtoStore.createGameDto = createFakeCreateGameDto({
            players: [
              createFakeCreateGamePlayerDto({ name: "Player 1" }),
              createFakeCreateGamePlayerDto({ name: "Player 2" }),
              createFakeCreateGamePlayerDto({ name: "Player 3" }),
              createFakeCreateGamePlayerDto({ name: "Player 4" }),
            ],
          });
        });

        it("should fetch random game composition when clicked.", async() => {
          const createGameDtoStore = useCreateGameDtoStore();
          const button = wrapper.findComponent<typeof Button>(".random-composition-button");
          await button.trigger("click");
          await nextTick();

          expect(mocks.composables.useFetchRandomGameComposition.fetchRandomGameComposition).toHaveBeenCalledExactlyOnceWith({
            players: createGameDtoStore.createGameDto.players,
          });
        });

        it("should set fetched random game composition to create game dto and assign previous groups when fetched.", async() => {
          const createGameDtoStore = useCreateGameDtoStore();
          const randomComposition = [
            createFakeCreateGamePlayerDto({ name: "Player 1" }),
            createFakeCreateGamePlayerDto({ name: "Player 2" }),
            createFakeCreateGamePlayerDto({ name: "Player 3" }),
            createFakeCreateGamePlayerDto({ name: "Player 4" }),
          ];
          createGameDtoStore.createGameDto = createFakeCreateGameDto({
            players: [
              createFakeCreateGamePlayerDto({
                ...randomComposition[0],
                group: "Group 1",
              }),
              createFakeCreateGamePlayerDto({
                ...randomComposition[1],
                group: "Group 2",
              }),
              createFakeCreateGamePlayerDto({
                ...randomComposition[2],
                group: "Group 1",
              }),
              createFakeCreateGamePlayerDto({
                ...randomComposition[3],
                group: "Group 2",
              }),
            ],
          });
          mocks.composables.useFetchRandomGameComposition.fetchRandomGameComposition.mockResolvedValue(randomComposition);
          const button = wrapper.findComponent<typeof Button>(".random-composition-button");
          await button.trigger("click");
          await nextTick();
          mocks.composables.useFetchRandomGameComposition.fetchRandomGameComposition.mockResolvedValue(randomComposition);
          const expectedPlayers = [
            createFakeCreateGamePlayerDto({
              ...randomComposition[0],
              group: "Group 1",
            }),
            createFakeCreateGamePlayerDto({
              ...randomComposition[1],
              group: "Group 2",
            }),
            createFakeCreateGamePlayerDto({
              ...randomComposition[2],
              group: "Group 1",
            }),
            createFakeCreateGamePlayerDto({
              ...randomComposition[3],
              group: "Group 2",
            }),
          ];

          expect(createGameDtoStore.setPlayersToCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedPlayers);
        });

        it("should not set fetched random game composition to create game dto when fetch returned null.", async() => {
          const createGameDtoStore = useCreateGameDtoStore();
          createGameDtoStore.createGameDto = createFakeCreateGameDto({
            players: [
              createFakeCreateGamePlayerDto({ name: "Player 1" }),
              createFakeCreateGamePlayerDto({ name: "Player 2" }),
              createFakeCreateGamePlayerDto({ name: "Player 3" }),
              createFakeCreateGamePlayerDto({ name: "Player 4" }),
            ],
          });
          await nextTick();
          mocks.composables.useFetchRandomGameComposition.fetchRandomGameComposition.mockResolvedValue(null);
          const button = wrapper.findComponent<typeof Button>(".random-composition-button");
          await button.trigger("click");
          await nextTick();

          expect(createGameDtoStore.setPlayersToCreateGameDto).not.toHaveBeenCalled();
        });

        it("should remove obsolete additional cards from create game dto when fetched.", async() => {
          const createGameDtoStore = useCreateGameDtoStore();
          const randomComposition = [
            createFakeCreateGamePlayerDto({ name: "Player 1" }),
            createFakeCreateGamePlayerDto({ name: "Player 2" }),
            createFakeCreateGamePlayerDto({ name: "Player 3" }),
            createFakeCreateGamePlayerDto({ name: "Player 4" }),
          ];
          mocks.composables.useFetchRandomGameComposition.fetchRandomGameComposition.mockResolvedValue(randomComposition);
          const button = wrapper.findComponent<typeof Button>(".random-composition-button");
          await button.trigger("click");
          await nextTick();
          mocks.composables.useFetchRandomGameComposition.fetchRandomGameComposition.mockResolvedValue(randomComposition);

          expect(createGameDtoStore.removeObsoleteAdditionalCardsFromCreateGameDto).toHaveBeenCalledExactlyOnceWith();
        });

        it("should not remove obsolete additional cards from create game dto when fetch returned null.", async() => {
          const createGameDtoStore = useCreateGameDtoStore();
          createGameDtoStore.createGameDto = createFakeCreateGameDto({
            players: [
              createFakeCreateGamePlayerDto({ name: "Player 1" }),
              createFakeCreateGamePlayerDto({ name: "Player 2" }),
              createFakeCreateGamePlayerDto({ name: "Player 3" }),
              createFakeCreateGamePlayerDto({ name: "Player 4" }),
            ],
          });
          await nextTick();
          mocks.composables.useFetchRandomGameComposition.fetchRandomGameComposition.mockResolvedValue(null);
          const button = wrapper.findComponent<typeof Button>(".random-composition-button");
          await button.trigger("click");
          await nextTick();

          expect(createGameDtoStore.removeObsoleteAdditionalCardsFromCreateGameDto).not.toHaveBeenCalled();
        });

        it("should be loading when fetch is in progress.", () => {
          const button = wrapper.findComponent<typeof Button>(".random-composition-button");
          void button.trigger("click");

          expect((wrapper.vm as unknown as { isLoadingGetRandomGameComposition: Ref<boolean> }).isLoadingGetRandomGameComposition.value).toBeTrue();
        });

        it("should not be loading when fetch returned.", async() => {
          const button = wrapper.findComponent<typeof Button>(".random-composition-button");
          await button.trigger("click");

          expect(button.attributes("loading")).toBe("false");
        });
      });
    });
  });
});