import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyOptionsHubRolesTabWolfHound from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabWolfHound/GameLobbyOptionsHubRolesTabWolfHound.vue";
import type AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab Wolf Hound Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabWolfHound>>;

  async function mountGameLobbyOptionsHubRolesTabWolfHoundComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabWolfHound> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabWolfHound>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabWolfHound, {
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
    wrapper = await mountGameLobbyOptionsHubRolesTabWolfHoundComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Is Chosen Side Revealed option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-wolf-hound-is-chosen-side-revealed-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("The Wolf-Hound's chosen side is revealed");
    });

    it("should translate option description when the option is activated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.wolfHound.isChosenSideRevealed = true;
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-wolf-hound-is-chosen-side-revealed-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabWolfHound.options.isChosenSideRevealed.descriptions.yes";
      await nextTick();

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should translate option description when the option is deactivated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.wolfHound.isChosenSideRevealed = false;
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-wolf-hound-is-chosen-side-revealed-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabWolfHound.options.isChosenSideRevealed.descriptions.no";
      await nextTick();

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should update the create game dto store when the option is changed by the affirmative toggle button.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const affirmativeToggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>("#game-lobby-options-hub-roles-tab-wolf-hound-is-chosen-side-revealed-input");
      (affirmativeToggleButton.vm as VueVm).$emit("update:modelValue", true);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.wolfHound.isChosenSideRevealed = true;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });

  describe("Is Side randomly chosen option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-wolf-hound-is-side-randomly-chosen-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("The Wolf-Hound's side is randomly chosen");
    });

    it("should translate option description when the option is activated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.wolfHound.isSideRandomlyChosen = true;
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-wolf-hound-is-side-randomly-chosen-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabWolfHound.options.isSideRandomlyChosen.descriptions.yes";
      await nextTick();

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should translate option description when the option is deactivated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.wolfHound.isSideRandomlyChosen = false;
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-wolf-hound-is-side-randomly-chosen-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabWolfHound.options.isSideRandomlyChosen.descriptions.no";
      await nextTick();

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should update the create game dto store when the option is changed by the affirmative toggle button.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const affirmativeToggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>("#game-lobby-options-hub-roles-tab-wolf-hound-is-side-randomly-chosen-input");
      (affirmativeToggleButton.vm as VueVm).$emit("update:modelValue", true);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.wolfHound.isSideRandomlyChosen = true;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });
});