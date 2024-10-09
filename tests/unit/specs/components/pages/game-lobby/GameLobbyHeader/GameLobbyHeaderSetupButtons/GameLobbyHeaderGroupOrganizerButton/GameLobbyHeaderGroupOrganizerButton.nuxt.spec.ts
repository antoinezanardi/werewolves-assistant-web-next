import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import { createFakeCreateGamePlayerRoleDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player-role/create-game-player-role.dto.factory";
import { createFakeCreateGamePlayerDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game-player/create-game-player.dto.factory";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import GameLobbyHeaderGroupOrganizerButton from "~/components/pages/game-lobby/GameLobbyHeader/GameLobbyHeaderSetupButtons/GameLobbyHeaderGroupOrganizerButton/GameLobbyHeaderGroupOrganizerButton.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

describe("Game Lobby Header Group Organizer Button Component", () => {
  const defaultCreateGameDto = createFakeCreateGameDto({
    players: [createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "prejudiced-manipulator" }) })],
  });
  let wrapper: ReturnType<typeof mount<typeof GameLobbyHeaderGroupOrganizerButton>>;
  const testingPinia = {
    initialState: {
      [StoreIds.CREATE_GAME_DTO]: {
        createGameDto: createFakeCreateGameDto(defaultCreateGameDto),
      },
    },
  };

  async function mountGameLobbyHeaderGroupOrganizerButtonComponent(options: ComponentMountingOptions<typeof GameLobbyHeaderGroupOrganizerButton> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyHeaderGroupOrganizerButton>>> {
    return mountSuspendedComponent(GameLobbyHeaderGroupOrganizerButton, {
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
    wrapper = await mountGameLobbyHeaderGroupOrganizerButtonComponent();
    const createGameDtoStore = useCreateGameDtoStore();
    createGameDtoStore.createGameDto = createFakeCreateGameDto(defaultCreateGameDto);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Button", () => {
    it("should show warning icon when groups are not set among players.", () => {
      const disclaimer = wrapper.find<HTMLSpanElement>("#player-groups-not-set-warning-icon");

      expect(disclaimer.exists()).toBeTruthy();
    });

    it("should not show warning icon when groups are set among players.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto = createFakeCreateGameDto({
        players: [
          createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "thief" }), group: "Group 1" }),
          createFakeCreateGamePlayerDto({ role: createFakeCreateGamePlayerRoleDto({ name: "thief" }), group: "Group 2" }),
        ],
      });
      await nextTick();
      const disclaimer = wrapper.find<HTMLSpanElement>("#player-groups-not-set-warning-icon");

      expect(disclaimer.exists()).toBeFalsy();
    });

    it("should translate button text when rendered.", () => {
      const buttonText = wrapper.find<HTMLSpanElement>("#game-lobby-header-group-organizer-button-text");

      expect(buttonText.text()).toBe("Group organizer");
    });

    it("should emit group organizer button click event when clicked.", async() => {
      const button = wrapper.find<HTMLButtonElement>("#game-lobby-header-group-organizer-button");
      await button.trigger("click");

      expect(wrapper.emitted("groupOrganizerButtonClick")).toBeTruthy();
    });
  });
});