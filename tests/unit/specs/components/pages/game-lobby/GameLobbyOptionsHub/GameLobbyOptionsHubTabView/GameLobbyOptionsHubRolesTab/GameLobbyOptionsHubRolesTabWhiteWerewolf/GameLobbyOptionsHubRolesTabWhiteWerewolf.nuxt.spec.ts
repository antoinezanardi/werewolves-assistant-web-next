import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type InputNumber from "primevue/inputnumber";
import type Slider from "primevue/slider";
import GameLobbyOptionsHubRolesTabWhiteWerewolf from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabWhiteWerewolf/GameLobbyOptionsHubRolesTabWhiteWerewolf.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab White Werewolf Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabWhiteWerewolf>>;

  async function mountGameLobbyOptionsHubRolesTabWhiteWerewolfComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabWhiteWerewolf> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabWhiteWerewolf>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabWhiteWerewolf, {
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
    wrapper = await mountGameLobbyOptionsHubRolesTabWhiteWerewolfComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Waking up Interval option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-white-werewolf-waking-up-interval-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("White Werewolf waking up interval");
    });

    it("should translate option description with selected value when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-white-werewolf-waking-up-interval-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabWhiteWerewolf.options.wakingUpInterval.description, {\"interval\":2}, 2");
    });

    it("should translate option float label when rendered.", () => {
      const floatLabel = wrapper.find<HTMLLabelElement>("#game-lobby-options-hub-roles-tab-white-werewolf-waking-up-interval-label");

      expect(floatLabel.text()).toBe("White Werewolf waking up interval");
    });

    it("should update the create game dto store when the option is changed by the input number.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-white-werewolf-waking-up-interval-input";
      const inputNumber = wrapper.findComponent<typeof InputNumber>(inputId);
      const expectedWakingUpInterval = 2;
      (inputNumber.vm as VueVm).$emit("update:modelValue", expectedWakingUpInterval);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.whiteWerewolf.wakingUpInterval = expectedWakingUpInterval;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });

    it("should update the create game dto store when the option is changed by the slider.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-white-werewolf-waking-up-interval-slider";
      const slider = wrapper.findComponent<typeof Slider>(inputId);
      const expectedWakingUpInterval = 2;
      (slider.vm as VueVm).$emit("update:modelValue", expectedWakingUpInterval);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.whiteWerewolf.wakingUpInterval = expectedWakingUpInterval;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });

    it("should not update the create game dto store when the option is changed by the input number and the value is null.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-white-werewolf-waking-up-interval-input";
      const inputNumber = wrapper.findComponent<typeof InputNumber>(inputId);
      (inputNumber.vm as VueVm).$emit("update:modelValue", null);
      await nextTick();

      expect(createGameDtoStore.setCreateGameDto).not.toHaveBeenCalled();
    });
  });
});