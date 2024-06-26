import type { mount } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import type Button from "primevue/button";
import type { Ref } from "vue";

import GameLobbyStartGameButton from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameButton.vue";
import * as UseFetchGames from "~/composables/api/game/useFetchGames";
import * as UsePrimeVueToasts from "~/composables/prime-vue/usePrimeVueToasts";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { useRolesStore } from "~/stores/role/useRolesStore";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeUseFetchGames } from "@tests/unit/utils/factories/composables/api/game/useFetchGames.factory";
import { createFakeRole } from "@tests/unit/utils/factories/composables/api/role/role.factory";
import { createFakeUsePrimeVueToasts } from "@tests/unit/utils/factories/composables/prime-vue/usePrimeVueToasts.factory";
import { pTooltipDirectiveBinder } from "@tests/unit/utils/helpers/directive.helpers";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { BoundTooltip } from "@tests/unit/utils/types/directive.types";

describe("Game Lobby Start Game Button Component", () => {
  const validCreateGameDto = createFakeCreateGameDto({
    players: [
      createFakeCreateGamePlayerDto({
        name: "Player 1",
        role: { name: "villager" },
        side: { current: "villagers" },
      }),
      createFakeCreateGamePlayerDto({
        name: "Player 2",
        role: { name: "werewolf" },
        side: { current: "werewolves" },
      }),
      createFakeCreateGamePlayerDto({
        name: "Player 3",
        role: { name: "werewolf" },
        side: { current: "werewolves" },
      }),
      createFakeCreateGamePlayerDto({
        name: "Player 4",
        role: { name: "werewolf" },
        side: { current: "werewolves" },
      }),
    ],
  });

  let wrapper: ReturnType<typeof mount<typeof GameLobbyStartGameButton>>;
  let mocks: {
    composables: {
      useFetchGames: ReturnType<typeof createFakeUseFetchGames>;
      usePrimeVueToasts: ReturnType<typeof createFakeUsePrimeVueToasts>;
    }
  };

  beforeEach(async() => {
    mocks = {
      composables: {
        useFetchGames: createFakeUseFetchGames(),
        usePrimeVueToasts: createFakeUsePrimeVueToasts(),
      },
    };
    vi.spyOn(UseFetchGames, "useFetchGames").mockReturnValue(mocks.composables.useFetchGames);
    vi.spyOn(UsePrimeVueToasts, "usePrimeVueToasts").mockReturnValue(mocks.composables.usePrimeVueToasts);
    wrapper = await mountSuspendedComponent(GameLobbyStartGameButton);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Button container", () => {
    it("should assign tooltip when button is disabled.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#game-lobby-start-game-button-container") };
      wrapper = await mountSuspendedComponent(GameLobbyStartGameButton, { global: { directives } });
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto({ players: [] });
      await nextTick();

      expect(tooltip.value).toBe("composables.useCreateGameDtoValidation.minimumOfPlayersNotReached");
    });

    it("should not assign tooltip when button is enabled.", async() => {
      const tooltip: BoundTooltip = { value: undefined };
      const directives = { ...pTooltipDirectiveBinder(tooltip, "#game-lobby-start-game-button-container") };
      wrapper = await mountSuspendedComponent(GameLobbyStartGameButton, { global: { directives } });
      const rolesStore = useRolesStore();
      rolesStore.roles = [
        createFakeRole({ name: "two-sisters", minInGame: 2 }),
        createFakeRole({ name: "three-brothers", minInGame: 3 }),
      ];
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = validCreateGameDto;
      await nextTick();

      expect(tooltip.value).toBeUndefined();
    });
  });

  describe("Button", () => {
    beforeEach(() => {
      const rolesStore = useRolesStore();
      rolesStore.roles = [
        createFakeRole({ name: "two-sisters", minInGame: 2 }),
        createFakeRole({ name: "three-brothers", minInGame: 3 }),
      ];
    });

    it("should be disabled when minimum players are not reached.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto({ players: [] });
      await nextTick();

      const button = wrapper.find(".start-game-button");
      expect(button.attributes("disabled")).toBe("true");
    });

    it("should be enabled when game can be created.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = validCreateGameDto;
      await nextTick();

      const button = wrapper.find(".start-game-button");
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

      it("should create game when clicked.", async() => {
        const createGameDtoStore = useCreateGameDtoStore();
        const button = wrapper.find(".start-game-button");
        await button.trigger("click");

        expect(mocks.composables.useFetchGames.createGame).toHaveBeenCalledExactlyOnceWith(createGameDtoStore.createGameDto);
      });

      it("should navigate to game with id in params when game is created.", async() => {
        const createdGame = createFakeGame();
        mocks.composables.useFetchGames.createGame.mockResolvedValue(createdGame);
        const button = wrapper.find(".start-game-button");
        await button.trigger("click");
        await flushPromises();

        expect(navigateTo).toHaveBeenCalledExactlyOnceWith(`/game/${createdGame._id}`);
      });

      it("should add success toast when game is created.", async() => {
        mocks.composables.useFetchGames.createGame.mockResolvedValue(createFakeGame());
        const button = wrapper.find(".start-game-button");
        await button.trigger("click");
        await flushPromises();

        expect(mocks.composables.usePrimeVueToasts.addSuccessToast).toHaveBeenCalledExactlyOnceWith({ summary: "components.GameLobbyStartGameButton.gameCreated" });
      });

      it("should not add success toast when game is not created.", async() => {
        mocks.composables.useFetchGames.createGame.mockResolvedValue(null);
        const button = wrapper.find(".start-game-button");
        await button.trigger("click");

        expect(mocks.composables.usePrimeVueToasts.addSuccessToast).not.toHaveBeenCalled();
      });

      it("should be loading when fetch is in progress.", () => {
        const button = wrapper.findComponent<Button>(".start-game-button");
        void button.trigger("click");

        expect((wrapper.vm as unknown as { isLoadingCreateGame: Ref<boolean> }).isLoadingCreateGame.value).toBeTrue();
      });

      it("should not be loading when fetch returned.", async() => {
        const button = wrapper.findComponent<Button>(".start-game-button");
        await button.trigger("click");

        expect(button.attributes("loading")).toBe("false");
      });
    });
  });
});