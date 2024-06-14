import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type InputNumber from "primevue/inputnumber";
import type Slider from "primevue/slider";
import GameLobbyOptionsHubRolesTabPiedPiper from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabPiedPiper/GameLobbyOptionsHubRolesTabPiedPiper.vue";
import type AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab Pied Piper Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabPiedPiper>>;

  async function mountGameLobbyOptionsHubRolesTabPiedPiperComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabPiedPiper> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabPiedPiper>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabPiedPiper, {
      global: {
        stubs: {
          Fieldset: false,
          GameOptionInputGroup: false,
          FloatLabel: false,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyOptionsHubRolesTabPiedPiperComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Charmed People count per night option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-pied-piper-charmed-people-count-per-night-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("Charmed people count per night");
    });

    it("should translate option description with selected value when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-pied-piper-charmed-people-count-per-night-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabPiedPiper.options.charmedPeopleCountPerNight.description, {\"count\":2}");
    });

    it("should translate option float label when rendered.", () => {
      const floatLabel = wrapper.find<HTMLLabelElement>("#game-lobby-options-hub-roles-tab-pied-piper-charmed-people-count-per-night-label");

      expect(floatLabel.text()).toBe("Charmed people count per night");
    });

    it("should update the create game dto store when the option is changed by the input number.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-pied-piper-charmed-people-count-per-night-input";
      const charmedPeopleCountPerNightInputNumber = wrapper.findComponent<typeof InputNumber>(inputId);
      (charmedPeopleCountPerNightInputNumber.vm as VueVm).$emit("update:modelValue", 3);
      await wrapper.vm.$nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.piedPiper.charmedPeopleCountPerNight = 3;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });

    it("should update the create game dto store when the option is changed by the slider.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-pied-piper-charmed-people-count-per-night-slider";
      const charmedPeopleCountPerNightInputNumber = wrapper.findComponent<typeof Slider>(inputId);
      (charmedPeopleCountPerNightInputNumber.vm as VueVm).$emit("update:modelValue", 4);
      await wrapper.vm.$nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.piedPiper.charmedPeopleCountPerNight = 4;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });

    it("should not update the create game dto store when the option is changed by the input number and the value is null.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-pied-piper-charmed-people-count-per-night-input";
      const charmedPeopleCountPerNightInputNumber = wrapper.findComponent<typeof InputNumber>(inputId);
      (charmedPeopleCountPerNightInputNumber.vm as VueVm).$emit("update:modelValue", null);
      await wrapper.vm.$nextTick();

      expect(createGameDtoStore.setCreateGameDto).not.toHaveBeenCalled();
    });
  });

  describe("Is powerless on Werewolves Side", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-pied-piper-is-powerless-on-werewolves-side-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("The Pied Piper is powerless on the Werewolves side");
    });

    it("should translate option description when the option is activated.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-pied-piper-is-powerless-on-werewolves-side-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabPiedPiper.options.isPowerlessOnWerewolvesSide.descriptions.yes");
    });

    it("should translate option description when the option is deactivated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.piedPiper.isPowerlessOnWerewolvesSide = false;
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-pied-piper-is-powerless-on-werewolves-side-input-group");
      await nextTick();

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabPiedPiper.options.isPowerlessOnWerewolvesSide.descriptions.no");
    });

    it("should update the create game dto store when the option is toggled.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const toggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>("#game-lobby-options-hub-roles-tab-pied-piper-is-powerless-on-werewolves-side-input");
      (toggleButton.vm as VueVm).$emit("update:modelValue", false);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.piedPiper.isPowerlessOnWerewolvesSide = false;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });
});