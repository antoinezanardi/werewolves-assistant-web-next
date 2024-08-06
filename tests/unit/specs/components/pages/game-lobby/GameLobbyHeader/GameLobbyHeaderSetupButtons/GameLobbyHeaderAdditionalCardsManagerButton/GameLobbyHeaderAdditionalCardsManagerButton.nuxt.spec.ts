import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGamePlayerRoleDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player-role/create-game-player-role.dto.factory";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { createFakeGameAdditionalCard } from "@tests/unit/utils/factories/composables/api/game/game-additional-card/game-additional-card.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyHeaderAdditionalCardsManagerButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderAdditionalCardsManagerButton/GameLobbyHeaderAdditionalCardsManagerButton.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

describe("Game Lobby Header Additional Manager Button Component", () => {
  const defaultCreateGameDto = createFakeCreateGameDto({
    players: [createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "thief" }) })],
  });
  let wrapper: ReturnType<typeof mount<typeof GameLobbyHeaderAdditionalCardsManagerButton>>;
  const testingPinia = {
    initialState: {
      [StoreIds.CREATE_GAME_DTO]: {
        createGameDto: createFakeCreateGameDto({
          players: [createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "thief" }) })],
        }),
      },
    },
  };

  async function mountGameLobbyHeaderAdditionalCardsManagerButtonComponent(options: ComponentMountingOptions<typeof GameLobbyHeaderAdditionalCardsManagerButton> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyHeaderAdditionalCardsManagerButton>>> {
    return mountSuspendedComponent(GameLobbyHeaderAdditionalCardsManagerButton, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
        stubs: {
          Button: false,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyHeaderAdditionalCardsManagerButtonComponent();
    const createGameDtoStore = useCreateGameDtoStore();
    createGameDtoStore.createGameDto = createFakeCreateGameDto(defaultCreateGameDto);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Button", () => {
    it("should show warning icon when additional cards are not set.", () => {
      const disclaimer = wrapper.find<HTMLSpanElement>("#additional-cards-not-set-warning-icon");

      expect(disclaimer.exists()).toBeTruthy();
    });

    it("should not show warning icon when additional cards are set.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.additionalCards = [
        createFakeGameAdditionalCard({ recipient: "thief" }),
        createFakeGameAdditionalCard({ recipient: "thief" }),
      ];
      await nextTick();
      const disclaimer = wrapper.find<HTMLSpanElement>("#additional-cards-not-set-warning-icon");

      expect(disclaimer.exists()).toBeFalsy();
    });

    it("should translate button text when rendered.", () => {
      const buttonText = wrapper.find<HTMLSpanElement>("#game-lobby-header-additional-cards-manager-button-text");

      expect(buttonText.text()).toBe("Additional cards");
    });

    it("should emit additional cards manager button click event when clicked.", async() => {
      const button = wrapper.find<HTMLButtonElement>("#game-lobby-header-additional-cards-manager-button");
      await button.trigger("click");

      expect(wrapper.emitted("additionalCardsManagerButtonClick")).toBeTruthy();
    });
  });
});