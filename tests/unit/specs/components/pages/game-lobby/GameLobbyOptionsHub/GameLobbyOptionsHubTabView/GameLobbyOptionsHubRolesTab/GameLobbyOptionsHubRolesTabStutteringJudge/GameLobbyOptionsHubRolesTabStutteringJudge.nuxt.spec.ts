import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type InputNumber from "primevue/inputnumber";
import type Slider from "primevue/slider";
import GameLobbyOptionsHubRolesTabStutteringJudge from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubTabView/GameLobbyOptionsHubRolesTab/GameLobbyOptionsHubRolesTabStutteringJudge/GameLobbyOptionsHubRolesTabStutteringJudge.vue";
import type GameOptionInputGroup from "~/components/shared/game/game-options/GameOptionInputGroup/GameOptionInputGroup.vue";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Roles Tab Stuttering Judge Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabStutteringJudge>>;

  async function mountStutteringJudgeGameOptionsComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHubRolesTabStutteringJudge> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHubRolesTabStutteringJudge>>> {
    return mountSuspendedComponent(GameLobbyOptionsHubRolesTabStutteringJudge, {
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
    wrapper = await mountStutteringJudgeGameOptionsComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Vote Requests Count option", () => {
    it("should translate option label when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-stuttering-judge-vote-requests-count-input-group");

      expect(gameOptionInputGroup.props("optionLabel")).toBe("Stuttering Judge vote requests");
    });

    it("should translate option description with selected option value when rendered.", () => {
      const gameOptionInputGroup = wrapper.findComponent<typeof GameOptionInputGroup>("#game-lobby-options-hub-roles-tab-stuttering-judge-vote-requests-count-input-group");
      const expectedDescription = "components.GameLobbyOptionsHubRolesTabStutteringJudge.options.voteRequestsCount.description, {\"count\":1}";

      expect(gameOptionInputGroup.props("optionDescription")).toBe(expectedDescription);
    });

    it("should translate option float label when rendered.", () => {
      const floatLabel = wrapper.find<HTMLLabelElement>("#game-lobby-options-hub-roles-tab-stuttering-judge-vote-requests-count-label");

      expect(floatLabel.text()).toBe("Stuttering Judge vote requests");
    });

    it("should update the create game dto store when the option is changed by the input number.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputNumber = wrapper.findComponent<typeof InputNumber>("#game-lobby-options-hub-roles-tab-stuttering-judge-vote-requests-count-input");
      (inputNumber.vm as VueVm).$emit("update:modelValue", 2);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.stutteringJudge.voteRequestsCount = 2;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });

    it("should update the create game dto store when the option is changed by the slider.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const slider = wrapper.findComponent<typeof Slider>("#game-lobby-options-hub-roles-tab-stuttering-judge-vote-requests-count-slider");
      (slider.vm as VueVm).$emit("update:modelValue", 2);
      await nextTick();
      const expectedCreateGameDto = createFakeCreateGameDto(createGameDtoStore.createGameDto);
      expectedCreateGameDto.options.roles.stutteringJudge.voteRequestsCount = 2;

      expect(createGameDtoStore.setCreateGameDto).toHaveBeenCalledExactlyOnceWith(expectedCreateGameDto);
    });

    it("should not update the create game dto store when the option is changed by the input number and the value is null.", async() => {
      const createGameDtoStore = useCreateGameDtoStore();
      const inputNumber = wrapper.findComponent<typeof InputNumber>("#game-lobby-options-hub-roles-tab-stuttering-judge-vote-requests-count-input");
      (inputNumber.vm as VueVm).$emit("update:modelValue", null);
      await nextTick();

      expect(createGameDtoStore.setCreateGameDto).not.toHaveBeenCalled();
    });
  });
});