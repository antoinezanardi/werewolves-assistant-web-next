import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyOptionsHubRolesTabBigBadWolf from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabBigBadWolf/GameLobbyOptionsHubRolesTabBigBadWolf.vue";
import type AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab Big Bad Wolf Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabBigBadWolf>>;

  async function mountComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabBigBadWolf> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabBigBadWolf>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabBigBadWolf, {
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
    wrapper = await mountComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Is Powerless if one Werewolf dies option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-big-bad-wolf-is-powerless-if-werewolf-dies-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("The Big Bad Wolf is powerless if a Werewolf dies");
    });

    it("should translate option description when the option is activated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.bigBadWolf.isPowerlessIfWerewolfDies = true;
      await nextTick();
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-big-bad-wolf-is-powerless-if-werewolf-dies-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabBigBadWolf.options.isPowerlessIfWerewolfDies.descriptions.yes");
    });

    it("should translate option description when the option is deactivated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.bigBadWolf.isPowerlessIfWerewolfDies = false;
      await nextTick();
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-big-bad-wolf-is-powerless-if-werewolf-dies-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabBigBadWolf.options.isPowerlessIfWerewolfDies.descriptions.no");
    });

    it("should update the create game dto store when the option is toggled.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const toggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>("#game-lobby-options-hub-roles-tab-big-bad-wolf-is-powerless-if-werewolf-dies-input");
      (toggleButton.vm as VueVm).$emit("update:modelValue", false);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.bigBadWolf.isPowerlessIfWerewolfDies = false;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });
});