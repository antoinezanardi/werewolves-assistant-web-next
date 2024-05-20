import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyOptionsHubRolesTabLittleGirl from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabLittleGirl/GameLobbyOptionsHubRolesTabLittleGirl.vue";
import type AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab Little Girl Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabLittleGirl>>;

  async function mountGameLobbyOptionsHubRolesTabLittleGirlComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabLittleGirl> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabLittleGirl>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabLittleGirl, {
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
    wrapper = await mountGameLobbyOptionsHubRolesTabLittleGirlComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Is Protected by Defender Option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-little-girl-is-protected-by-defender-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("The Little Girl is protected by the Defender");
    });

    it("should translate option description when the option is activated.", async() => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-little-girl-is-protected-by-defender-input-group");
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.littleGirl.isProtectedByDefender = true;
      await nextTick();

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabLittleGirl.options.isProtectedByDefender.descriptions.yes");
    });

    it("should translate option description when the option is deactivated.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-little-girl-is-protected-by-defender-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabLittleGirl.options.isProtectedByDefender.descriptions.no");
    });

    it("should update the create game dto store when the option is toggled.", async() => {
      const toggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>("#game-lobby-options-hub-roles-tab-little-girl-is-protected-by-defender-input");
      const createGameDtoStore = useCreateGameDtoStore();
      (toggleButton.vm as VueVm).$emit("update:modelValue", true);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.littleGirl.isProtectedByDefender = true;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });
});