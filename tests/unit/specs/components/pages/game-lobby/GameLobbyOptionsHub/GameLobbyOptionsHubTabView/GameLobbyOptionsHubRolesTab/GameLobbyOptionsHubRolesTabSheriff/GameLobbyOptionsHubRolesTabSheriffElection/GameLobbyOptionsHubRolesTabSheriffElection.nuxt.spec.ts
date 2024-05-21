import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type InputNumber from "primevue/inputnumber";
import type Slider from "primevue/slider";
import GameLobbyOptionsHubRolesTabSheriffElection from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabSheriff/GameLobbyOptionsHubRolesTabSheriffElection/GameLobbyOptionsHubRolesTabSheriffElection.vue";
import type AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "~/tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "~/tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab Sheriff Election Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabSheriffElection>>;

  async function mountGameLobbyOptionsHubRolesTabSheriffElectionComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabSheriffElection> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabSheriffElection>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabSheriffElection, {
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
    wrapper = await mountGameLobbyOptionsHubRolesTabSheriffElectionComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Election time option", () => {
    it("should translate option label when rendered.", () => {
      const optionLabel = wrapper.find<HTMLHeadingElement>("#game-option-label");

      expect(optionLabel.text()).toBe("Sheriff election time");
    });

    it("should translate option description when phase is night and turn is 1.", () => {
      const optionDescription = wrapper.find<HTMLParagraphElement>("#game-option-description");
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabSheriffElection.options.electedAt.description, {\"turn\":1,\"phase\":\"shared.game.definitephase.night\"}";

      expect(optionDescription.text()).toBe(expectedDescription);
    });

    it("should translate option description when phase is day and turn is 3.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.setCreateGameDto(createFakeCreateGameDto(createGameDtoStore.createGameDto));
      createGameDtoStore.createGameDto.options.roles.sheriff.electedAt.phaseName = "day";
      createGameDtoStore.createGameDto.options.roles.sheriff.electedAt.turn = 3;
      await nextTick();
      const optionDescription = wrapper.find<HTMLParagraphElement>("#game-option-description");
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabSheriffElection.options.electedAt.description, {\"turn\":3,\"phase\":\"shared.game.definitephase.day\"}";

      expect(optionDescription.text()).toBe(expectedDescription);
    });

    it("should set model value of input to true when the phase is day.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.sheriff.electedAt.phaseName = "day";
      await nextTick();
      const inputId = "#game-lobby-options-hub-roles-tab-sheriff-election-phase-input";
      const input = wrapper.findComponent<typeof AffirmativeToggleButton>(inputId);

      expect(input.attributes("modelvalue")).toBe("true");
    });

    it("should set model value of input to false when the phase is night.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.roles.sheriff.electedAt.phaseName = "night";
      await nextTick();
      const inputId = "#game-lobby-options-hub-roles-tab-sheriff-election-phase-input";
      const input = wrapper.findComponent<typeof AffirmativeToggleButton>(inputId);

      expect(input.attributes("modelvalue")).toBe("false");
    });

    it("should update the create game dto store when the option is toggled on day phase change.", () => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-sheriff-election-phase-input";
      const input = wrapper.findComponent<typeof AffirmativeToggleButton>(inputId);
      (input.vm as VueVm).$emit("update:modelValue", true);
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.sheriff.electedAt.phaseName = "day";

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });

    it("should update the create game dto store when the option is toggled on night phase change.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-sheriff-election-phase-input";
      const input = wrapper.findComponent<typeof AffirmativeToggleButton>(inputId);
      (input.vm as VueVm).$emit("update:modelValue", false);
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.sheriff.electedAt.phaseName = "night";
      await nextTick();

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });

    it("should translate election turn float label when rendered.", () => {
      const floatLabel = wrapper.find<HTMLLabelElement>("#game-lobby-options-hub-roles-tab-sheriff-election-turn-label");

      expect(floatLabel.text()).toBe("Sheriff election turn");
    });

    it("should update the create game dto store when the option is changed by the input number.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-sheriff-election-turn-input";
      const input = wrapper.findComponent<typeof InputNumber>(inputId);
      (input.vm as VueVm).$emit("update:modelValue", 2);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.sheriff.electedAt.turn = 2;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });

    it("should update the create game dto store when the option is changed by the slider.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const sliderId = "#game-lobby-options-hub-roles-tab-sheriff-election-turn-slider";
      const slider = wrapper.findComponent<typeof Slider>(sliderId);
      (slider.vm as VueVm).$emit("update:modelValue", 2);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.sheriff.electedAt.turn = 2;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });

    it("should not update the create game dto store when the option is changed by the input number and the value is null.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-sheriff-election-turn-input";
      const input = wrapper.findComponent<typeof InputNumber>(inputId);
      (input.vm as VueVm).$emit("update:modelValue", null);
      await nextTick();

      expect(createGameDtoStore.setCreateGameDto).not.toHaveBeenCalled();
    });
  });
});