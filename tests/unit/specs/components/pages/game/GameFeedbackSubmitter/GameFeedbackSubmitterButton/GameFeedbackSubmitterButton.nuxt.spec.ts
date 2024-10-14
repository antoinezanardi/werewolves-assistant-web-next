import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Button from "primevue/button";

import { createFakeGameFeedback } from "@tests/unit/utils/factories/composables/api/game/game-feedback/game-feedback.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import GameFeedbackSubmitterButton from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterButton/GameFeedbackSubmitterButton.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Feedback Submitter Button Component", () => {
  const defaultGame = createFakeGame();
  let wrapper: ReturnType<typeof mount<typeof GameFeedbackSubmitterButton>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameFeedbackSubmitterButtonComponent(options: ComponentMountingOptions<typeof GameFeedbackSubmitterButton> = {}):
  Promise<ReturnType<typeof mount<typeof GameFeedbackSubmitterButton>>> {
    return mountSuspendedComponent(GameFeedbackSubmitterButton, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameFeedbackSubmitterButtonComponent();
    const gameStore = useGameStore();
    gameStore.game = createFakeGame(defaultGame);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Button", () => {
    it("should be visible when game doesn't have a feedback.", () => {
      const button = wrapper.findComponent<typeof Button>("#game-feedback-submitter-button");

      expect(button.exists()).toBeTruthy();
    });

    it("should be hidden when game has a feedback.", async() => {
      const gameStore = useGameStore();
      gameStore.game = createFakeGame({ feedback: createFakeGameFeedback() });
      await nextTick();
      const button = wrapper.findComponent<typeof Button>("#game-feedback-submitter-button");

      expect(button.exists()).toBeFalsy();
    });

    it("should have translated label when rendered.", () => {
      const button = wrapper.findComponent<typeof Button>("#game-feedback-submitter-button");

      expect(button.attributes("label")).toBe("Give feedback on this game");
    });

    it("should emit click event when clicked.", async() => {
      const button = wrapper.findComponent<typeof Button>("#game-feedback-submitter-button");
      await button.trigger("click");

      expect(wrapper.emitted("gameFeedbackSubmitterButtonClick")).toBeTruthy();
    });
  });
});