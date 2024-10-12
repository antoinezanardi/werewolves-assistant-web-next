import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { ButtonProps } from "primevue/button";
import type Button from "primevue/button";
import { beforeEach } from "vitest";

import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import type GameFeedbackSubmitterButton from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterButton/GameFeedbackSubmitterButton.vue";
import GameOverActions from "~/components/pages/game/GameOver/GameOverActions/GameOverActions.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameHistoryRecordsStore } from "~/stores/game/game-history-record/useGameHistoryRecordsStore";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";

describe("Game Over Actions Component", () => {
  const defaultGame = createFakeGame();
  let wrapper: ReturnType<typeof mount<typeof GameOverActions>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameOverActionsComponent(options: ComponentMountingOptions<typeof GameOverActions> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverActions>>> {
    return mountSuspendedComponent(GameOverActions, {
      plugins: [createTestingPinia(testingPinia)],
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverActionsComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallowing.", async() => {
    wrapper = await mountGameOverActionsComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Show Game History Button", () => {
    beforeEach(async() => {
      wrapper = await mountGameOverActionsComponent({
        global: {
          stubs: {
            Button: false,
          },
        },
      });
    });

    it("should be in loading state when the game history is empty.", () => {
      const showGameHistoryButton = wrapper.findComponent<typeof Button>("#show-game-history-button");
      const props = showGameHistoryButton.props() as ButtonProps;

      expect(props.loading).toBeTruthy();
    });

    it("should translate loading show game history button text when the game history is empty.", () => {
      const showGameHistoryButton = wrapper.findComponent<typeof Button>("#show-game-history-button");

      expect(showGameHistoryButton.text()).toBe("components.GameOverActions.loadingGameHistory");
    });

    it("should translate show game history button text when the game history records have been fetched.", async() => {
      const gameHistoryRecordsStore = useGameHistoryRecordsStore();
      gameHistoryRecordsStore.gameHistoryRecords = [createFakeGameHistoryRecord()];
      await nextTick();
      const showGameHistoryButton = wrapper.findComponent<typeof Button>("#show-game-history-button");

      expect(showGameHistoryButton.text()).toBe("components.GameOverActions.showGameHistory");
    });
  });

  describe("Emits", () => {
    it("should emit show game history event when the show game history button is clicked.", () => {
      const showGameHistoryButton = wrapper.findComponent<typeof Button>("#show-game-history-button");
      (showGameHistoryButton.vm as VueVm).$emit("click");

      expect(wrapper.emitted("gameHistoryButtonClick")).toBeTruthy();
    });

    it("should emit game feedback submitter button event when the game feedback submitter button is clicked.", () => {
      const gameFeedbackSubmitterButton = wrapper.findComponent<typeof GameFeedbackSubmitterButton>("#game-feedback-submitter-button");
      (gameFeedbackSubmitterButton.vm as VueVm).$emit("gameFeedbackSubmitterButtonClick");

      expect(wrapper.emitted("gameFeedbackSubmitterButtonClick")).toBeTruthy();
    });
  });
});