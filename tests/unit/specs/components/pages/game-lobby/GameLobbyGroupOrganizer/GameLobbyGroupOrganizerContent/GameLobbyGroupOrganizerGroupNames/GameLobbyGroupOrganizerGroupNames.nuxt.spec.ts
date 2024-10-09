import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type GameLobbyGroupOrganizerGroupNameInput from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerGroupNames/GameLobbyGroupOrganizerGroupNameInput/GameLobbyGroupOrganizerGroupNameInput.vue";
import GameLobbyGroupOrganizerGroupNames from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerGroupNames/GameLobbyGroupOrganizerGroupNames.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

describe("Game Lobby Group Organizer Group Names Component", () => {
  const testingPinia = {
    initialState: {
      [StoreIds.CREATE_GAME_DTO]: {
        firstGroupName: "Group 1",
        secondGroupName: "Group 2",
      },
    },
  };
  let wrapper: ReturnType<typeof mount<typeof GameLobbyGroupOrganizerGroupNames>>;

  async function mountGameLobbyGroupOrganizerGroupNamesComponent(options: ComponentMountingOptions<typeof GameLobbyGroupOrganizerGroupNames> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyGroupOrganizerGroupNames>>> {
    return mountSuspendedComponent(GameLobbyGroupOrganizerGroupNames, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyGroupOrganizerGroupNamesComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Group Name Inputs", () => {
    it("should set first group name when first name input emits update group name event.", async() => {
      const firstGroupNameInput = wrapper.findComponent<typeof GameLobbyGroupOrganizerGroupNameInput>("#game-lobby-group-organizer-first-group-name-input");
      const newFirstGroupName = "New Group 1";
      (firstGroupNameInput.vm as VueVm).$emit("updateGroupName", newFirstGroupName);
      await nextTick();
      const createGameDtoStore = useCreateGameDtoStore();

      expect(createGameDtoStore.setFirstDefaultGroupName).toHaveBeenCalledExactlyOnceWith(newFirstGroupName);
    });

    it("should set second group name when second name input emits update group name event.", async() => {
      const secondGroupNameInput = wrapper.findComponent<typeof GameLobbyGroupOrganizerGroupNameInput>("#game-lobby-group-organizer-second-group-name-input");
      const newSecondGroupName = "New Group 2";
      (secondGroupNameInput.vm as VueVm).$emit("updateGroupName", newSecondGroupName);
      await nextTick();
      const createGameDtoStore = useCreateGameDtoStore();

      expect(createGameDtoStore.setSecondDefaultGroupName).toHaveBeenCalledExactlyOnceWith(newSecondGroupName);
    });
  });
});