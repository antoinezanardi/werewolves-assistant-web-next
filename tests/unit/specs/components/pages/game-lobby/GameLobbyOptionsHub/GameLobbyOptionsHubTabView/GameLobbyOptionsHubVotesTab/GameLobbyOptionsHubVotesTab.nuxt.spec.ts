import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type InputNumber from "primevue/inputnumber";
import type Slider from "primevue/slider";
import GameLobbyOptionsHubVotesTab from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubVotesTab/GameLobbyOptionsHubVotesTab.vue";
import type AffirmativeToggleButton from "~/components/shared/buttons/AffirmativeToggleButton/AffirmativeToggleButton.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Votes Tab Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubVotesTab>>;

  async function mountGameLobbyOptionsHubVotesTabComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubVotesTab> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubVotesTab>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubVotesTab, {
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
    wrapper = await mountGameLobbyOptionsHubVotesTabComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Can Votes be Skipped option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-votes-tab-can-be-skipped-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("Votes can be skipped");
    });

    it("should translate option description when the option is activated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.votes.canBeSkipped = true;
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-votes-tab-can-be-skipped-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubVotesTab.options.canBeSkipped.descriptions.yes";
      await nextTick();

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should translate option description when the option is deactivated.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      createGameDtoStore.createGameDto.options.votes.canBeSkipped = false;
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-votes-tab-can-be-skipped-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubVotesTab.options.canBeSkipped.descriptions.no";
      await nextTick();

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should update create game dto store when the option is toggled.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const toggleButton = wrapper.findComponent<typeof AffirmativeToggleButton>("#game-lobby-options-hub-votes-tab-can-be-skipped-input");
      (toggleButton.vm as VueVm).$emit("update:modelValue", false);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.votes.canBeSkipped = false;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });
  });

  describe("Votes duration", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-votes-duration-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("Votes duration in seconds");
    });

    it("should translate option description with selected value when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-votes-duration-input-group");
      const expectedDescription = `components.GameLobbyOptionsHubVotesTab.options.duration.description, {"time":"shared.time.minute, {\\"count\\":3}, 3"}`;

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should update create game dto store when the option is changed by the input number.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-votes-duration-input";
      const inputNumber = wrapper.findComponent<typeof InputNumber>(inputId);
      const expectedDuration = 60;
      (inputNumber.vm as VueVm).$emit("update:modelValue", expectedDuration);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.votes.duration = expectedDuration;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });

    it("should update create game dto store when the option is changed by the slider.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-votes-duration-slider";
      const slider = wrapper.findComponent<typeof Slider>(inputId);
      const expectedDuration = 60;
      (slider.vm as VueVm).$emit("update:modelValue", expectedDuration);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.votes.duration = expectedDuration;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });

    it("should not update create game dto store when the option is changed by the input number and the value is null.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputId = "#game-lobby-options-hub-roles-tab-votes-duration-input";
      const inputNumber = wrapper.findComponent<typeof InputNumber>(inputId);
      (inputNumber.vm as VueVm).$emit("update:modelValue", null);
      await nextTick();

      expect(createGameDtoStore.setCreateGameDto).not.toHaveBeenCalled();
    });
  });
});