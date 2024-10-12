import type { Ref } from "vue";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import { createFakeCreateGameFeedbackDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game-feedback/create-game-feedback.dto.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { GameFeedbackSubmitterContentProps } from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterContent/game-feedback-submitter-content.types";
import GameFeedbackSubmitterContent from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterContent/GameFeedbackSubmitterContent.vue";
import type GameFeedbackSubmitterRating from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterContent/GameFeedbackSubmitterRating/GameFeedbackSubmitterRating.vue";
import type GameFeedbackSubmitterReview from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterContent/GameFeedbackSubmitterReview/GameFeedbackSubmitterReview.vue";
import type { CreateGameFeedbackDto } from "~/composables/api/game/dto/create-game-feedback/create-game-feedback.dto";

describe("Game Feedback Submitter Content Component", () => {
  const defaultCreateGameFeedbackDto = createFakeCreateGameFeedbackDto({
    score: 2,
    review: "This game is awesome!",
  });
  const defaultProps: GameFeedbackSubmitterContentProps = {
    modelValue: defaultCreateGameFeedbackDto,
  };
  let wrapper: ReturnType<typeof mount<typeof GameFeedbackSubmitterContent>>;

  async function mountGameFeedbackSubmitterContentComponent(options: ComponentMountingOptions<typeof GameFeedbackSubmitterContent> = {}):
  Promise<ReturnType<typeof mount<typeof GameFeedbackSubmitterContent>>> {
    return mountSuspendedComponent(GameFeedbackSubmitterContent, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameFeedbackSubmitterContentComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Content", () => {
    describe("Rating", () => {
      it("should pass create create game feedback score to rating dto when rendered.", () => {
        const rating = wrapper.findComponent<typeof GameFeedbackSubmitterRating>("#game-feedback-submitter-rating");

        expect(rating.props("modelValue")).toBe(defaultProps.modelValue.score);
      });

      it("should change create game feedback score when update model value event is emitted.", async() => {
        const rating = wrapper.findComponent<typeof GameFeedbackSubmitterRating>("#game-feedback-submitter-rating");
        const newModelValue = 3;
        (rating.vm as VueVm).$emit("update:modelValue", newModelValue);
        await nextTick();

        expect((wrapper.vm as unknown as { createGameFeedbackDto: Ref<CreateGameFeedbackDto> }).createGameFeedbackDto.value.score).toBe(newModelValue);
      });
    });

    describe("Review", () => {
      it("should pass create create game feedback review to review dto when rendered.", () => {
        const review = wrapper.findComponent<typeof GameFeedbackSubmitterReview>("#game-feedback-submitter-review");

        expect(review.props("modelValue")).toBe(defaultProps.modelValue.review);
      });

      it("should change create game feedback review when update model value event is emitted.", async() => {
        const review = wrapper.findComponent<typeof GameFeedbackSubmitterReview>("#game-feedback-submitter-review");
        const newModelValue = "This game is not awesome!";
        (review.vm as VueVm).$emit("update:modelValue", newModelValue);
        await nextTick();

        expect((wrapper.vm as unknown as { createGameFeedbackDto: Ref<CreateGameFeedbackDto> }).createGameFeedbackDto.value.review).toBe(newModelValue);
      });
    });
  });
});