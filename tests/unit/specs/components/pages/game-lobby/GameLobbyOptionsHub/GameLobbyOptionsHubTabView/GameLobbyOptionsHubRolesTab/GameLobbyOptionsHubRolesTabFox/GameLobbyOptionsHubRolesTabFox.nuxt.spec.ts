import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyOptionsHubRolesTabFoxVue from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabFox/GameLobbyOptionsHubRolesTabFox.vue";
import type AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab Fox Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabFoxVue>>;

  async function mountGameLobbyOptionsHubRolesTabFoxVueComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabFoxVue> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabFoxVue>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabFoxVue, {
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
    wrapper = await mountGameLobbyOptionsHubRolesTabFoxVueComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Fox Powerless if misses Werewolf option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-fox-is-powerless-if-misses-werewolf-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("The Fox is powerless if he misses to sniff a Werewolf");
    });

    it("should translate option description when the option is activated.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-fox-is-powerless-if-misses-werewolf-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabFox.options.isPowerlessIfMissesWerewolf.descriptions.yes");
    });

    it("should translate option description when the option is deactivated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.fox.isPowerlessIfMissesWerewolf = false;
      await nextTick();
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-fox-is-powerless-if-misses-werewolf-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabFox.options.isPowerlessIfMissesWerewolf.descriptions.no");
    });

    it("should update the create game dto store when the option is toggled.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const toggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>("#game-lobby-options-hub-roles-tab-fox-is-powerless-if-misses-werewolf-input");
      (toggleButton.vm as VueVm).$emit("update:modelValue", false);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.fox.isPowerlessIfMissesWerewolf = false;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });
});