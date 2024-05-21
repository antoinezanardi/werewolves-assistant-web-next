import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyOptionsHubRolesTabSeer from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabSeer/GameLobbyOptionsHubRolesTabSeer.vue";
import type AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab Seer Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabSeer>>;

  async function mountGameLobbyOptionsHubRolesTabSeerComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabSeer> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabSeer>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabSeer, {
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
    wrapper = await mountGameLobbyOptionsHubRolesTabSeerComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Is talkative option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-seer-is-talkative-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("The Seer is talkative");
    });

    it("should translate option description when the option is activated.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-seer-is-talkative-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabSeer.options.isTalkative.descriptions.yes";

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should translate option description when the option is deactivated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.seer.isTalkative = false;
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-seer-is-talkative-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabSeer.options.isTalkative.descriptions.no";
      await nextTick();

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should update the create game dto store when the option is toggled.", async() => {
      const toggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>("#game-lobby-options-hub-roles-tab-seer-is-talkative-input");
      const createGameDtoStore = useCreateGameDtoStore();
      (toggleButton.vm as VueVm).$emit("update:modelValue", false);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.seer.isTalkative = false;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });

  describe("Can see Roles option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-seer-can-see-roles-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("The Seer can see the roles");
    });

    it("should translate option description when the option is activated.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-seer-can-see-roles-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabSeer.options.canSeeRoles.descriptions.yes";

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should translate option description when the option is deactivated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.seer.canSeeRoles = false;
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-seer-can-see-roles-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabSeer.options.canSeeRoles.descriptions.no";
      await nextTick();

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should update the create game dto store when the option is toggled.", async() => {
      const toggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>("#game-lobby-options-hub-roles-tab-seer-can-see-roles-input");
      const createGameDtoStore = useCreateGameDtoStore();
      (toggleButton.vm as VueVm).$emit("update:modelValue", false);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.seer.canSeeRoles = false;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });
});