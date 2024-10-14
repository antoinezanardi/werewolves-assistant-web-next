import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Textarea from "primevue/textarea";

import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { GameFeedbackSubmitterReviewProps } from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterContent/GameFeedbackSubmitterReview/game-feedback-submitter-review.types";
import GameFeedbackSubmitterReview from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterContent/GameFeedbackSubmitterReview/GameFeedbackSubmitterReview.vue";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Feedback Submitter Review Component", () => {
  const defaultProps: GameFeedbackSubmitterReviewProps = {
    modelValue: "This game is awesome!",
  };
  let wrapper: ReturnType<typeof mount<typeof GameFeedbackSubmitterReview>>;

  async function mountGameFeedbackSubmitterReviewComponent(options: ComponentMountingOptions<typeof GameFeedbackSubmitterReview> = {}):
  Promise<ReturnType<typeof mount<typeof GameFeedbackSubmitterReview>>> {
    return mountSuspendedComponent(GameFeedbackSubmitterReview, {
      props: defaultProps,
      global: {
        stubs: {
          FloatLabel: false,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameFeedbackSubmitterReviewComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Label", () => {
    it("should translate label when rendered.", () => {
      const label = wrapper.find<HTMLLabelElement>("#game-feedback-submitter-review-label");

      expect(label.text()).toBe("Mind sharing a quick review?");
    });
  });

  describe("Review Textarea", () => {
    it("should pass model value when rendered.", () => {
      const textarea = wrapper.findComponent<typeof Textarea>("#game-feedback-submitter-review-input");

      expect(textarea.attributes("modelvalue")).toBe(defaultProps.modelValue);
    });

    it("should change model value when update model value event is emitted.", async() => {
      const textarea = wrapper.findComponent<typeof Textarea>("#game-feedback-submitter-review-input");
      const newModelValue = "This game is not awesome!";
      (textarea.vm as VueVm).$emit("update:modelValue", newModelValue);
      await nextTick();

      expect(textarea.attributes("modelvalue")).toBe(newModelValue);
    });

    it("should disable textarea when game is creating a feedback.", async() => {
      const gameStore = useGameStore();
      gameStore.creatingGameFeedbackStatus = "pending";
      await nextTick();
      const textarea = wrapper.findComponent<typeof Textarea>("#game-feedback-submitter-review-input");

      expect(textarea.attributes("disabled")).toBe("true");
    });

    it("should not disable textarea when game is not creating a feedback.", async() => {
      const gameStore = useGameStore();
      gameStore.creatingGameFeedbackStatus = "idle";
      await nextTick();
      const textarea = wrapper.findComponent<typeof Textarea>("#game-feedback-submitter-review-input");

      expect(textarea.attributes("disabled")).toBe("false");
    });
  });
});