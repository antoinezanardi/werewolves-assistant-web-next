import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type InputNumber from "primevue/inputnumber";
import type Slider from "primevue/slider";
import GameLobbyOptionsHubRolesTabElder from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabElder/GameLobbyOptionsHubRolesTabElder.vue";
import type AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab Elder Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabElder>>;

  async function mountGameLobbyOptionsHubRolesTabElderComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabElder> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabElder>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabElder, {
      global: {
        stubs: {
          Fieldset: false,
          FloatLabel: false,
          GameOptionInputGroup: false,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyOptionsHubRolesTabElderComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Elder Lives against Werewolves options", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-elder-lives-count-against-werewolves-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("The Elder lives count against the Werewolves");
    });

    it("should translate option description with option value when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-elder-lives-count-against-werewolves-input-group");
      const expectedOptionDescription = "components.GameLobbyOptionsHubRolesTabElder.options.livesCountAgainstWerewolves.description, {\"livesCount\":2}, 2";

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedOptionDescription);
    });

    it("should translate option float label when rendered.", () => {
      const floatLabel = wrapper.find<HTMLLabelElement>("#game-lobby-options-hub-roles-tab-elder-lives-count-against-werewolves-label");

      expect(floatLabel.text()).toBe("The Elder lives count against the Werewolves");
    });

    it("should update the create game dto store when the option is changed by the input number.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const toggleButton = wrapper.findComponent<typeof InputNumber>("#game-lobby-options-hub-roles-tab-elder-lives-count-against-werewolves-input");
      (toggleButton.vm as VueVm).$emit("update:modelValue", 5);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.elder.livesCountAgainstWerewolves = 5;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });

    it("should update the create game dto store when the option is changed by the slider.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const slider = wrapper.findComponent<typeof Slider>("#game-lobby-options-hub-roles-tab-elder-lives-count-against-werewolves-slider");
      (slider.vm as VueVm).$emit("update:modelValue", 5);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.elder.livesCountAgainstWerewolves = 5;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });

  describe("Elder takes his revenge option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-elder-does-take-his-revenge-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("The Elder takes his revenge");
    });

    it("should translate option description when the option is activated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.elder.doesTakeHisRevenge = true;
      await nextTick();
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-elder-does-take-his-revenge-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabElder.options.doesTakeHisRevenge.descriptions.yes");
    });

    it("should translate option description when the option is deactivated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.elder.doesTakeHisRevenge = false;
      await nextTick();
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-elder-does-take-his-revenge-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabElder.options.doesTakeHisRevenge.descriptions.no");
    });

    it("should update the create game dto store when the option is toggled.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const toggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>("#game-lobby-options-hub-roles-tab-elder-does-take-his-revenge-input");
      (toggleButton.vm as VueVm).$emit("update:modelValue", false);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.elder.doesTakeHisRevenge = false;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });
});