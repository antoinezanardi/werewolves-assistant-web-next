import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyOptionsHubRolesTabCupid from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabCupid/GameLobbyOptionsHubRolesTabCupid.vue";
import type AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab Cupid Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabCupid>>;

  async function mountGameLobbyOptionsHubRolesTabCupidComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabCupid> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabCupid>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabCupid, {
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
    wrapper = await mountGameLobbyOptionsHubRolesTabCupidComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Cupid must win with Lovers option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-cupid-must-win-with-lovers-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("Cupid must win with the Lovers");
    });

    it("should translate option description when the option is activated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.cupid.mustWinWithLovers = true;
      await nextTick();
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-cupid-must-win-with-lovers-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabCupid.options.mustWinWithLovers.descriptions.yes");
    });

    it("should translate option description when the option is deactivated.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-cupid-must-win-with-lovers-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabCupid.options.mustWinWithLovers.descriptions.no");
    });

    it("should update the create game dto store when the option is toggled.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const toggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>("#game-lobby-options-hub-roles-tab-cupid-must-win-with-lovers-input");
      (toggleButton.vm as VueVm).$emit("update:modelValue", true);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.cupid.mustWinWithLovers = true;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });

  describe("Do Lovers reveal role to each other option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-cupid-do-lovers-reveal-role-to-each-other-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("The Lovers reveal their role to each other");
    });

    it("should translate option description when the option is activated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.cupid.lovers.doRevealRoleToEachOther = true;
      await nextTick();
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-cupid-do-lovers-reveal-role-to-each-other-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabCupid.options.lovers.doRevealRoleToEachOther.descriptions.yes");
    });

    it("should translate option description when the option is deactivated.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-cupid-do-lovers-reveal-role-to-each-other-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabCupid.options.lovers.doRevealRoleToEachOther.descriptions.no");
    });

    it("should update the create game dto store when the option is toggled.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const toggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>("#game-lobby-options-hub-roles-tab-cupid-do-lovers-reveal-role-to-each-other-input");
      (toggleButton.vm as VueVm).$emit("update:modelValue", true);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.cupid.lovers.doRevealRoleToEachOther = true;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });
});