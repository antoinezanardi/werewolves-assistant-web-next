import type { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Badge from "primevue/badge";
import type Rating from "primevue/rating";
import { beforeEach } from "vitest";

import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { GameFeedbackSubmitterRatingProps } from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterContent/GameFeedbackSubmitterRating/game-feedback-submitter-rating.types";
import GameFeedbackSubmitterRating from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterContent/GameFeedbackSubmitterRating/GameFeedbackSubmitterRating.vue";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Feedback Submitter Rating Component", () => {
  const defaultProps: GameFeedbackSubmitterRatingProps = {
    modelValue: 2,
  };
  let wrapper: ReturnType<typeof mount<typeof GameFeedbackSubmitterRating>>;

  async function mountGameFeedbackSubmitterRatingComponent(options: ComponentMountingOptions<typeof GameFeedbackSubmitterRating> = {}):
  Promise<ReturnType<typeof mount<typeof GameFeedbackSubmitterRating>>> {
    return mountSuspendedComponent(GameFeedbackSubmitterRating, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameFeedbackSubmitterRatingComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Label", () => {
    it("should translate label when rendered.", () => {
      const label = wrapper.find<HTMLLabelElement>("#game-feedback-submitter-rating-label");

      expect(label.text()).toBe("What is your rating for this game?");
    });
  });

  describe("Rating", () => {
    it("should pass model value when rendered.", () => {
      const rating = wrapper.findComponent<typeof Rating>("#game-feedback-submitter-rating");

      expect(rating.attributes("model-value")).toBe("2");
    });

    it("should disable rating when game is creating a feedback.", async() => {
      const gameStore = useGameStore();
      gameStore.creatingGameFeedbackStatus = "pending";
      await nextTick();
      const rating = wrapper.findComponent<typeof Rating>("#game-feedback-submitter-rating");

      expect(rating.attributes("disabled")).toBe("true");
    });

    it("should not disable rating when game is not creating a feedback.", async() => {
      const gameStore = useGameStore();
      gameStore.creatingGameFeedbackStatus = "idle";
      await nextTick();
      const rating = wrapper.findComponent<typeof Rating>("#game-feedback-submitter-rating");

      expect(rating.attributes("disabled")).toBe("false");
    });

    it("should update model value when rating is changed.", async() => {
      const rating = wrapper.findComponent<typeof Rating>("#game-feedback-submitter-rating");
      (rating.vm as VueVm).$emit("change", { value: 3 });
      await nextTick();

      expect(rating.attributes("model-value")).toBe("3");
    });

    it("should update model value to 0 when rating is cleared.", async() => {
      const rating = wrapper.findComponent<typeof Rating>("#game-feedback-submitter-rating");
      (rating.vm as VueVm).$emit("change", { value: null });
      await nextTick();

      expect(rating.attributes("model-value")).toBe("0");
    });

    describe("On and Off icons", () => {
      it.each<{
        test: string;
        modelValue: number;
        expectedIconClasses: string;
      }>([
        {
          test: "should display icons with text error class when score is 1.",
          modelValue: 1,
          expectedIconClasses: "text-error",
        },
        {
          test: "should display icons with text error class when score is 2.",
          modelValue: 2,
          expectedIconClasses: "text-error",
        },
        {
          test: "should display icons with text-warning class when score is 3.",
          modelValue: 3,
          expectedIconClasses: "text-warning",
        },
        {
          test: "should display icons with text-success class when score is 4.",
          modelValue: 4,
          expectedIconClasses: "text-success",
        },
        {
          test: "should display icons with text-success class when score is 5.",
          modelValue: 5,
          expectedIconClasses: "text-success",
        },
      ])(`$test`, async({ modelValue, expectedIconClasses }) => {
        wrapper = await mountGameFeedbackSubmitterRatingComponent({
          props: {
            modelValue,
          },
          global: {
            stubs: {
              Rating: false,
            },
          },
        });
        const icon = wrapper.findComponent<typeof FontAwesomeIcon>(".on-icon");

        expect(icon.classes()).toContain(expectedIconClasses);
      });

      it("should display off icon with text-primary class when score is 0.", async() => {
        wrapper = await mountGameFeedbackSubmitterRatingComponent({
          props: {
            modelValue: 0,
          },
          global: {
            stubs: {
              Rating: false,
            },
          },
        });
        const icon = wrapper.findComponent<typeof FontAwesomeIcon>(".off-icon");

        expect(icon.classes()).toContain("text-primary");
      });
    });
  });

  describe("Score badge description", () => {
    it.each<{
      test: string;
      modelValue: number;
      expectedDescription: string;
      expectedSeverity: "success" | "warn" | "danger" | "secondary";
    }>([
      {
        test: "should display 'Terrible' description with danger severity when rating is 1.",
        modelValue: 1,
        expectedDescription: "components.GameFeedbackSubmitterRating.terrible",
        expectedSeverity: "danger",
      },
      {
        test: "should display 'Bad' description with danger severity when rating is 2.",
        modelValue: 2,
        expectedDescription: "components.GameFeedbackSubmitterRating.bad",
        expectedSeverity: "danger",
      },
      {
        test: "should display 'Average' description with warn severity when rating is 3.",
        modelValue: 3,
        expectedDescription: "components.GameFeedbackSubmitterRating.average",
        expectedSeverity: "warn",
      },
      {
        test: "should display 'Good' description with success severity when rating is 4.",
        modelValue: 4,
        expectedDescription: "components.GameFeedbackSubmitterRating.good",
        expectedSeverity: "success",
      },
      {
        test: "should display 'Excellent' description with success severity when rating is 5.",
        modelValue: 5,
        expectedDescription: "components.GameFeedbackSubmitterRating.excellent",
        expectedSeverity: "success",
      },
      {
        test: "should display 'Choose rating' description with secondary severity when rating is 0.",
        modelValue: 0,
        expectedDescription: "components.GameFeedbackSubmitterRating.pleaseChooseRating",
        expectedSeverity: "secondary",
      },
    ])("$test", async({ modelValue, expectedDescription, expectedSeverity }) => {
      wrapper = await mountGameFeedbackSubmitterRatingComponent({
        props: {
          modelValue,
        },
      });
      const scoreBadge = wrapper.findComponent<typeof Badge>("#rating-description-badge");

      expect(scoreBadge.attributes("value")).toBe(expectedDescription);
      expect(scoreBadge.attributes("severity")).toBe(expectedSeverity);
    });
  });
});