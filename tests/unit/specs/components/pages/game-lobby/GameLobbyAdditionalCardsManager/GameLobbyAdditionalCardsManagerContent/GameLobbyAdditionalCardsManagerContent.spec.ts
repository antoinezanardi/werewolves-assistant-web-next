import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGamePlayerRoleDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player-role/create-game-player-role.dto.factory";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { mockPiniaStore } from "@tests/unit/utils/helpers/mock.helpers";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyAdditionalCardsManagerContent from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/GameLobbyAdditionalCardsManagerContent.vue";
import type RecipientRoleAdditionalCardsManager from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/RecipientRoleAdditionalCardsManager/RecipientRoleAdditionalCardsManager.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

describe("Game Lobby Additional Cards Manager Component", () => {
  const defaultCreateGameDto = createFakeCreateGameDto({
    players: [
      createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "thief" }) }),
      createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "seer" }) }),
    ],
  });
  let wrapper: ReturnType<typeof mount<typeof GameLobbyAdditionalCardsManagerContent>>;
  const testingPinia = { initialState: { [StoreIds.CREATE_GAME_DTO]: { createGameDto: defaultCreateGameDto } } };

  async function mountGameLobbyAdditionalCardsManagerContentComponent(options: ComponentMountingOptions<typeof GameLobbyAdditionalCardsManagerContent> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyAdditionalCardsManagerContent>>> {
    return mountSuspendedComponent(GameLobbyAdditionalCardsManagerContent, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    const pinia = createTestingPinia(testingPinia);
    const createGameDtoStore = mockPiniaStore(useCreateGameDtoStore);
    createGameDtoStore.isRoleInCreateGameDto.mockReturnValueOnce(true);
    createGameDtoStore.isRoleInCreateGameDto.mockReturnValueOnce(false);
    createGameDtoStore.getRoleLeftCountToReachMinInCreateGameDto.mockReturnValue(1);
    wrapper = await mountGameLobbyAdditionalCardsManagerContentComponent({
      global: {
        plugins: [pinia],
      },
    });
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Recipient Role Additional Cards Managers", () => {
    it("should render a recipient role additional cards manager for each recipient role present in the create game dto when render.", () => {
      const recipientRoleAdditionalCardsManagers = wrapper.findAllComponents<typeof RecipientRoleAdditionalCardsManager>(".recipient-role-additional-cards-manager");

      expect(recipientRoleAdditionalCardsManagers).toHaveLength(1);
    });
  });
});