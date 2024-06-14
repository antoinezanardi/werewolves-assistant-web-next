import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyOptionsHubRolesTabPrejudicedManipulator from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabPrejudicedManipulator/GameLobbyOptionsHubRolesTabPrejudicedManipulator.vue";
import type AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab Prejudiced Manipulator Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabPrejudicedManipulator>>;

  async function mountGameLobbyOptionsHubRolesTabPrejudicedManipulatorComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabPrejudicedManipulator> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabPrejudicedManipulator>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabPrejudicedManipulator, {
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
    wrapper = await mountGameLobbyOptionsHubRolesTabPrejudicedManipulatorComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Is powerless on Werewolves Side option", () => {
    it("should translate option label when rendered.", () => {
      const inputGroupId = "game-lobby-options-hub-roles-tab-prejudiced-manipulator-is-powerless-on-werewolves-side-input-group";
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>(`#${inputGroupId}`);

      expect(gameOptionInputGroup.props("optionLabel")).toBe("The Prejudiced Manipulator is powerless on the Werewolves side");
    });

    it("should translate option description when the option is activated.", () => {
      const inputGroupId = "game-lobby-options-hub-roles-tab-prejudiced-manipulator-is-powerless-on-werewolves-side-input-group";
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>(`#${inputGroupId}`);
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabPrejudicedManipulator.options.isPowerlessOnWerewolvesSide.descriptions.yes";

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should translate option description when the option is deactivated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.prejudicedManipulator.isPowerlessOnWerewolvesSide = false;
      await nextTick();
      const inputGroupId = "game-lobby-options-hub-roles-tab-prejudiced-manipulator-is-powerless-on-werewolves-side-input-group";
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>(`#${inputGroupId}`);
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabPrejudicedManipulator.options.isPowerlessOnWerewolvesSide.descriptions.no";

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should update the create game dto store when the option is toggled.", async() => {
      const inputId = "game-lobby-options-hub-roles-tab-prejudiced-manipulator-is-powerless-on-werewolves-side-input";
      const toggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>(`#${inputId}`);
      const createGameDtoStore = useCreateGameDtoStore();
      (toggleButton.vm as VueVm).$emit("update:modelValue", false);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.prejudicedManipulator.isPowerlessOnWerewolvesSide = false;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });
});