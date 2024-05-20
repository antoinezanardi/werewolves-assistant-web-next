import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type InputNumber from "primevue/inputnumber";
import type Slider from "primevue/slider";
import GameLobbyOptionsHubRolesTabScandalmonger from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabScandalmonger/GameLobbyOptionsHubRolesTabScandalmonger.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab Scandalmonger Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabScandalmonger>>;

  async function mountGameLobbyOptionsHubRolesTabScandalmongerComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabScandalmonger> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabScandalmonger>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabScandalmonger, {
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
    wrapper = await mountGameLobbyOptionsHubRolesTabScandalmongerComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Mark Penalty option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-scandalmonger-mark-penalty-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("Mark penalty");
    });

    it("should translate option description with selected value when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-scandalmonger-mark-penalty-input-group");

      expect(gameOptionInputGroup.props("optionDescription")).toBe("components.GameLobbyOptionsHubRolesTabScandalmonger.options.markPenalty.description, {\"markPenalty\":2}, 2");
    });

    it("should translate option float label when rendered.", () => {
      const floatLabel = wrapper.find<HTMLLabelElement>("#game-lobby-options-hub-roles-tab-scandalmonger-mark-penalty-label");

      expect(floatLabel.text()).toBe("Mark penalty");
    });

    it("should update the create game dto store when the option is changed by the input number.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-scandalmonger-mark-penalty-input";
      const markPenaltyInputNumber = wrapper.findComponent<typeof InputNumber>(inputId);
      (markPenaltyInputNumber.vm as VueVm).$emit("update:modelValue", 4);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.scandalmonger.markPenalty = 4;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });

    it("should update the create game dto store when the option is changed by the slider.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-scandalmonger-mark-penalty-slider";
      const markPenaltyInputNumber = wrapper.findComponent<typeof Slider>(inputId);
      (markPenaltyInputNumber.vm as VueVm).$emit("update:modelValue", 1);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.scandalmonger.markPenalty = 1;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });

    it("should not update the create game dto store when the option is changed by the slider and the value is null.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-scandalmonger-mark-penalty-slider";
      const markPenaltyInputNumber = wrapper.findComponent<typeof Slider>(inputId);
      (markPenaltyInputNumber.vm as VueVm).$emit("update:modelValue", null);
      await nextTick();

      expect(createGameDtoStore.setCreateGameDto).not.toHaveBeenCalled();
    });
  });
});