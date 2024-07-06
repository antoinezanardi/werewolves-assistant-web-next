import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyStartGameConfirmDialog from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialog.vue";
import { StoreIds } from "~/stores/enums/store.enum";

describe("Game Lobby Start Game Confirm Dialog Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialog>>;
  const defaultCreateGameDto = createFakeCreateGameDto({
    players: [
      createFakeCreateGamePlayerDto(),
      createFakeCreateGamePlayerDto(),
      createFakeCreateGamePlayerDto(),
      createFakeCreateGamePlayerDto(),
    ],
  });
  const testingPinia = { initialState: { [StoreIds.CREATE_GAME_DTO]: { createGameDto: defaultCreateGameDto } } };

  async function mountGameLobbyStartGameConfirmDialogComponent(options: ComponentMountingOptions<typeof GameLobbyStartGameConfirmDialog> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialog>>> {
    return mountSuspendedComponent(GameLobbyStartGameConfirmDialog, {
      shallow: false,
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});