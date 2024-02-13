import type { mount } from "@vue/test-utils";
import type Button from "primevue/button";
import type { Mock } from "vitest";
import type { Ref } from "vue";

import GameLobbyRandomCompositionButton from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyRandomCompositionButton/GameLobbyRandomCompositionButton.vue";
import * as UseFetchRandomGameComposition from "~/composables/api/game/useFetchRandomGameComposition";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGamePlayerDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { pTooltipDirectiveBinder } from "~/tests/unit/utils/helpers/directive.helpers";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Lobby Random Composition Button Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyRandomCompositionButton>>;
  let mocks: {
    composables: {
      useFetchRandomGameComposition: {
        fetchRandomGameComposition: Mock;
      }
    }
  };

  beforeEach(async() => {
    mocks = { composables: { useFetchRandomGameComposition: { fetchRandomGameComposition: vi.fn() } } };
    vi.spyOn(UseFetchRandomGameComposition, "useFetchRandomGameComposition").mockImplementation(() => mocks.composables.useFetchRandomGameComposition);
    wrapper = await mountSuspendedComponent(GameLobbyRandomCompositionButton);
  });

  it("should render component and match snapshot when mounted.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Button container", () => {
    it("should assign tooltip when button is disabled.", async() => {
      const tooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#game-lobby-random-composition-button-container") };
      wrapper = await mountSuspendedComponent(GameLobbyRandomCompositionButton, { global: { directives } });
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto({ players: [] });
      await nextTick();

      expect(tooltip.value).toBe("components.GameLobbyRandomCompositionButton.minPlayersNotReached");
    });

    it("should not assign tooltip when button is enabled.", async() => {
      const tooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#game-lobby-random-composition-button-container") };
      wrapper = await mountSuspendedComponent(GameLobbyRandomCompositionButton, { global: { directives } });
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
      it("should be disabled when min of players is not reached.", async() => {
        const createGameDtoStore = useCreateGameDtoStore();
        createGameDtoStore.createGameDto = createFakeCreateGameDto({ players: [] });
        await nextTick();
        const button = wrapper.findComponent<Button>(".random-composition-button");

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
        const button = wrapper.findComponent<Button>(".random-composition-button");

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
          const button = wrapper.findComponent<Button>(".random-composition-button");
          await button.trigger("click");
          await nextTick();

          expect(mocks.composables.useFetchRandomGameComposition.fetchRandomGameComposition).toHaveBeenCalledWith({ players: createGameDtoStore.createGameDto.players });
        });

        it("should set fetched random game composition to create game dto when fetched.", async() => {
          const createGameDtoStore = useCreateGameDtoStore();
          const randomComposition = [
            createFakeCreateGamePlayerDto({ name: "Player 1" }),
            createFakeCreateGamePlayerDto({ name: "Player 2" }),
            createFakeCreateGamePlayerDto({ name: "Player 3" }),
            createFakeCreateGamePlayerDto({ name: "Player 4" }),
          ];
          mocks.composables.useFetchRandomGameComposition.fetchRandomGameComposition.mockResolvedValue(randomComposition);
          const button = wrapper.findComponent<Button>(".random-composition-button");
          await button.trigger("click");
          await nextTick();
          mocks.composables.useFetchRandomGameComposition.fetchRandomGameComposition.mockResolvedValue(randomComposition);

          expect(createGameDtoStore.setPlayersToCreateGameDto).toHaveBeenCalledExactlyOnceWith(randomComposition);
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
          const button = wrapper.findComponent<Button>(".random-composition-button");
          await button.trigger("click");
          await nextTick();

          expect(createGameDtoStore.setPlayersToCreateGameDto).not.toHaveBeenCalled();
        });

        it("should be loading when fetch is in progress.", () => {
          const button = wrapper.findComponent<Button>(".random-composition-button");
          void button.trigger("click");

          expect((wrapper.vm as unknown as { isLoadingGetRandomGameComposition: Ref<boolean> }).isLoadingGetRandomGameComposition.value).toBeTrue();
        });

        it("should not be loading when fetch returned.", async() => {
          const button = wrapper.findComponent<Button>(".random-composition-button");
          await button.trigger("click");

          expect(button.attributes("loading")).toBe("false");
        });
      });
    });
  });
});