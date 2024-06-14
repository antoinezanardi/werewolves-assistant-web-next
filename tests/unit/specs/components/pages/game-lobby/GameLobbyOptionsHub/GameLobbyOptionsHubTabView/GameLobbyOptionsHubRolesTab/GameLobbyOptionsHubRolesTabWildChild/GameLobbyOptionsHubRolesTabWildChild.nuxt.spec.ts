import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyOptionsHubRolesTabWildChild from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabWildChild/GameLobbyOptionsHubRolesTabWildChild.vue";
import type AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab Wild Child Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabWildChild>>;

  async function mountGameLobbyOptionsHubRolesTabWildChildComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabWildChild> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabWildChild>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabWildChild, {
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
    wrapper = await mountGameLobbyOptionsHubRolesTabWildChildComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Is Transformation revealed option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-wild-child-is-transformation-revealed-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("The Wild Child's transformation is revealed");
    });

    it("should translate option description when the option is activated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.wildChild.isTransformationRevealed = true;
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-wild-child-is-transformation-revealed-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabWildChild.options.isTransformationRevealed.descriptions.yes";
      await nextTick();

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should translate option description when the option is deactivated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.wildChild.isTransformationRevealed = false;
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-wild-child-is-transformation-revealed-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabWildChild.options.isTransformationRevealed.descriptions.no";
      await nextTick();

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should update the create game dto store when the option is changed by the affirmative toggle button.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-wild-child-is-transformation-revealed-input";
      const affirmativeToggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>(inputId);
      (affirmativeToggleButton.vm as VueVm).$emit("update:modelValue", true);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.wildChild.isTransformationRevealed = true;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });
});