import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Button from "primevue/button";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import { createFakeCreateGameFeedbackDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game-feedback/create-game-feedback.dto.factory";
import type { GameFeedbackSubmitterFooterProps } from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterFooter/game-feedback-submitter-footer.types";
import GameFeedbackSubmitterFooter from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterFooter/GameFeedbackSubmitterFooter.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

const hoistedMocks = vi.hoisted(() => ({
  usePrimeVueToasts: {
    addSuccessToast: vi.fn(),
  },
}));

vi.mock("~/composables/prime-vue/usePrimeVueToasts", () => ({
  usePrimeVueToasts: (): typeof hoistedMocks.usePrimeVueToasts => hoistedMocks.usePrimeVueToasts,
}));

describe("Game Feedback Submitter Footer Component", () => {
  const defaultCreateGameFeedbackDto = createFakeCreateGameFeedbackDto({
    score: 5,
  });
  const defaultProps: GameFeedbackSubmitterFooterProps = {
    createGameFeedbackDto: defaultCreateGameFeedbackDto,
  };
  const testingPinia = { initialState: { [StoreIds.GAME]: { creatingGameFeedbackStatus: "idle" } } };
  let wrapper: ReturnType<typeof mount<typeof GameFeedbackSubmitterFooter>>;

  async function mountGameFeedbackSubmitterFooterComponent(options: ComponentMountingOptions<typeof GameFeedbackSubmitterFooter> = {}):
  Promise<ReturnType<typeof mount<typeof GameFeedbackSubmitterFooter>>> {
    return mountSuspendedComponent(GameFeedbackSubmitterFooter, {
      props: defaultProps,
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameFeedbackSubmitterFooterComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendering without shallow rendering.", async() => {
    wrapper = await mountGameFeedbackSubmitterFooterComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Submit Button", () => {
    it("should translate label when rendered.", () => {
      const submitButton = wrapper.findComponent<typeof Button>("#game-feedback-submitter-footer-submit-button");

      expect(submitButton.attributes("label")).toBe("Submit feedback");
    });

    it("should be disabled when score in dto is set to 0.", async() => {
      const createGameFeedbackDto = createFakeCreateGameFeedbackDto({
        score: 0,
      });
      wrapper = await mountGameFeedbackSubmitterFooterComponent({ props: { createGameFeedbackDto } });
      await nextTick();
      const submitButton = wrapper.findComponent<typeof Button>("#game-feedback-submitter-footer-submit-button");

      expect(submitButton.attributes("disabled")).toBe("true");
    });

    it("should be disabled when creatingGameFeedbackStatus is loading.", async() => {
      const gameStore = useGameStore();
      gameStore.creatingGameFeedbackStatus = "pending";
      await nextTick();
      const submitButton = wrapper.findComponent<typeof Button>("#game-feedback-submitter-footer-submit-button");

      expect(submitButton.attributes("disabled")).toBe("true");
    });

    it("should not be disabled when score in dto is not set to 0.", () => {
      const submitButton = wrapper.findComponent<typeof Button>("#game-feedback-submitter-footer-submit-button");

      expect(submitButton.attributes("disabled")).toBe("false");
    });

    it("should be loading when creatingGameFeedbackStatus is loading.", async() => {
      const gameStore = useGameStore();
      gameStore.creatingGameFeedbackStatus = "pending";
      await nextTick();
      const submitButton = wrapper.findComponent<typeof Button>("#game-feedback-submitter-footer-submit-button");

      expect(submitButton.attributes("loading")).toBe("true");
    });

    it("should not be loading when creatingGameFeedbackStatus is not loading.", () => {
      const submitButton = wrapper.findComponent<typeof Button>("#game-feedback-submitter-footer-submit-button");

      expect(submitButton.attributes("loading")).toBe("false");
    });

    it("should submit feedback when clicked.", async() => {
      const gameStore = useGameStore();
      const submitButton = wrapper.findComponent<typeof Button>("#game-feedback-submitter-footer-submit-button");
      await submitButton.trigger("click");

      expect(gameStore.createGameFeedback).toHaveBeenCalledExactlyOnceWith(defaultCreateGameFeedbackDto);
    });

    it("should show success toast when feedback is submitted successfully.", async() => {
      const submitButton = wrapper.findComponent<typeof Button>("#game-feedback-submitter-footer-submit-button");
      await submitButton.trigger("click");

      expect(hoistedMocks.usePrimeVueToasts.addSuccessToast).toHaveBeenCalledExactlyOnceWith({
        summary: "components.GameFeedbackSubmitterFooter.feedbackSubmitted",
        detail: "components.GameFeedbackSubmitterFooter.thanksForFeedback",
      });
    });

    it("should close dialog when feedback is submitted successfully.", async() => {
      const submitButton = wrapper.findComponent<typeof Button>("#game-feedback-submitter-footer-submit-button");
      await submitButton.trigger("click");

      expect(wrapper.emitted("closeDialog")).toBeTruthy();
    });
  });

  describe("Close Button", () => {
    it("should translate label when rendered.", () => {
      const closeButton = wrapper.findComponent<typeof Button>("#game-feedback-submitter-footer-close-button");

      expect(closeButton.attributes("label")).toBe("Close");
    });

    it("should emit closeDialog event when clicked.", async() => {
      const closeButton = wrapper.findComponent<typeof Button>("#game-feedback-submitter-footer-close-button");
      await closeButton.trigger("click");

      expect(wrapper.emitted("closeDialog")).toBeTruthy();
    });

    it("should be disabled when creatingGameFeedbackStatus is loading.", async() => {
      const gameStore = useGameStore();
      gameStore.creatingGameFeedbackStatus = "pending";
      await nextTick();
      const closeButton = wrapper.findComponent<typeof Button>("#game-feedback-submitter-footer-close-button");

      expect(closeButton.attributes("disabled")).toBe("true");
    });
  });
});