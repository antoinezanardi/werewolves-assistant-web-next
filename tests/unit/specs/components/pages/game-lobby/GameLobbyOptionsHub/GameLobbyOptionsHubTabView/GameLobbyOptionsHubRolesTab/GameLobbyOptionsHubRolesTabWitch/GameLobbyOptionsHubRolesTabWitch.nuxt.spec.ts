import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyOptionsHubRolesTabWitch from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabWitch/GameLobbyOptionsHubRolesTabWitch.vue";
import type AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab Witch Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabWitch>>;

  async function mountGameLobbyOptionsHubRolesTabWitchComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabWitch> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabWitch>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabWitch, {
      global: {
        stubs: {
          Fieldset: false,
          GameOptionInputGroup: false,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyOptionsHubRolesTabWitchComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Does know Werewolves targets option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-witch-does-know-werewolves-targets-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("The Witch knows the Werewolves targets");
    });

    it("should translate option description when the option is activated.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-witch-does-know-werewolves-targets-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabWitch.options.doesKnowWerewolvesTargets.descriptions.yes";

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should translate option description when the option is deactivated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.witch.doesKnowWerewolvesTargets = false;
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-witch-does-know-werewolves-targets-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabWitch.options.doesKnowWerewolvesTargets.descriptions.no";
      await nextTick();

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should update the create game dto store when the option is changed by the affirmative toggle button.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const toggleButtonId = "#game-lobby-options-hub-roles-tab-witch-does-know-werewolves-targets-input";
      const affirmativeToggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>(toggleButtonId);
      (affirmativeToggleButton.vm as VueVm).$emit("update:modelValue", false);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.witch.doesKnowWerewolvesTargets = false;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });
});