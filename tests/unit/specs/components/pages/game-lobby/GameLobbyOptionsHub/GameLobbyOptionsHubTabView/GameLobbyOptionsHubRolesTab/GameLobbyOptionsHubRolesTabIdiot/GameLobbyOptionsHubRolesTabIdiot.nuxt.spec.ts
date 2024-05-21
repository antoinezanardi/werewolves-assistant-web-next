import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyOptionsHubRolesTabIdiot from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabIdiot/GameLobbyOptionsHubRolesTabIdiot.vue";
import type AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab Idiot Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabIdiot>>;

  async function mountGameLobbyOptionsHubRolesTabIdiotComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabIdiot> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabIdiot>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabIdiot, {
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
    wrapper = await mountGameLobbyOptionsHubRolesTabIdiotComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Die on Elder death option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-idiot-does-die-on-elder-death-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("The revealed Idiot dies on Elder's death");
    });

    it("should translate option description when the option is activated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.idiot.doesDieOnElderDeath = true;
      await nextTick();
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-idiot-does-die-on-elder-death-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabIdiot.options.doesDieOnElderDeath.descriptions.yes");
    });

    it("should translate option description when the option is deactivated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.idiot.doesDieOnElderDeath = false;
      await nextTick();
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-idiot-does-die-on-elder-death-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabIdiot.options.doesDieOnElderDeath.descriptions.no");
    });

    it("should update the create game dto store when the option is toggled.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const toggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>("#game-lobby-options-hub-roles-tab-idiot-does-die-on-elder-death-input");
      (toggleButton.vm as VueVm).$emit("update:modelValue", false);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.idiot.doesDieOnElderDeath = false;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });
});