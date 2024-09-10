import { createTestingPinia } from "@pinia/testing";
import { createFakeCreateGameDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game/create-game.dto.factory";
import { createFakeCompositionGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/composition-game-options/composition-game-options.factory";
import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { createFakeVotesGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/votes-game-options/votes-game-options.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameLobbyStartGameConfirmDialogGameOptionsChanged from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogGameOptionsChanged/GameLobbyStartGameConfirmDialogGameOptionsChanged.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { StoreIds } from "~/stores/enums/store.enum";
import { useCreateGameDtoStore } from "~/stores/game/create-game-dto/useCreateGameDtoStore";

describe("Game Lobby Start Game Confirm Dialog Game Options Changed Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogGameOptionsChanged>>;
  const defaultGameOptions = createFakeGameOptions({
    ...DEFAULT_GAME_OPTIONS,
    composition: createFakeCompositionGameOptions({ isHidden: true }),
    votes: createFakeVotesGameOptions({ duration: 10, canBeSkipped: true }),
  });
  const defaultCreateGameDto = createFakeCreateGameDto({
    options: defaultGameOptions,
  });
  const testingPinia = { initialState: { [StoreIds.CREATE_GAME_DTO]: { createGameDto: defaultCreateGameDto } } };

  async function mountGameLobbyStartGameConfirmDialogGameOptionsChangedComponent(options: ComponentMountingOptions<typeof GameLobbyStartGameConfirmDialogGameOptionsChanged> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogGameOptionsChanged>>> {
    return mountSuspendedComponent(GameLobbyStartGameConfirmDialogGameOptionsChanged, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogGameOptionsChangedComponent();
    const createGameDtoStore = useCreateGameDtoStore();
    createGameDtoStore.createGameDto = createFakeCreateGameDto(defaultCreateGameDto);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogGameOptionsChangedComponent({
      shallow: false,
    });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Step Svg", () => {
    it("should set size to step svg when rendered.", () => {
      const stepSvg = wrapper.findComponent("[alt='Changed game options icon']");

      expect(stepSvg.attributes("width")).toBe("75");
      expect(stepSvg.attributes("height")).toBe("75");
    });

    it("should set src to step svg when rendered.", () => {
      const stepSvg = wrapper.findComponent("[alt='Changed game options icon']");

      expect(stepSvg.attributes("src")).toBe("/svg/misc/rabbit-in-hat.svg");
    });
  });

  describe("Text", () => {
    it("should translate step text when rendered.", () => {
      const stepText = wrapper.find("#game-lobby-start-game-confirm-dialog-game-options-changed-text");

      expect(stepText.text()).toBe(`components.GameLobbyStartGameConfirmDialogGameOptionsChanged.gameOptionsChanged, {"count":2}, 2`);
    });
  });

  describe("Step Actions", () => {
    it("should translate confirm step button label when rendered.", () => {
      const confirmStepButton = wrapper.find("#confirm-step-button");

      expect(confirmStepButton.attributes("label")).toBe("Confirm");
    });

    it("should emit confirm step event when confirm step button clicked.", async() => {
      const confirmStepButton = wrapper.find("#confirm-step-button");
      await confirmStepButton.trigger("click");

      expect(wrapper.emitted("confirmStep")).toHaveLength(1);
    });

    it("should translate reject step button label when rendered.", () => {
      const rejectStepButton = wrapper.find("#reject-step-button");

      expect(rejectStepButton.attributes("label")).toBe("Open game options hub");
    });

    it("should emit reject step event when reject step button clicked.", async() => {
      const rejectStepButton = wrapper.find("#reject-step-button");
      await rejectStepButton.trigger("click");

      expect(wrapper.emitted("rejectGameOptionsChangedStep")).toHaveLength(1);
    });
  });
});