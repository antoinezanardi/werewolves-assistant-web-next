import type { mount } from "@vue/test-utils";
import type { UseHeadInput } from "unhead";
import { expect } from "vitest";

import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import GameCanceled from "~/components/pages/game/GameCanceled/GameCanceled.vue";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type GameFeedbackSubmitterButton from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterButton/GameFeedbackSubmitterButton.vue";

describe("Game Canceled Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameCanceled>>;

  beforeEach(async() => {
    wrapper = await mountSuspendedComponent(GameCanceled);
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should set head title and meta tags when rendered.", () => {
    const expectedUseHeadInput: UseHeadInput<object> = { title: "components.GameCanceled.gameCanceled" };

    expect(useHead).toHaveBeenCalledExactlyOnceWith(expectedUseHeadInput);
  });

  describe("Text", () => {
    it("should display translated text when rendered.", () => {
      const textDiv = wrapper.find<HTMLDivElement>("#game-canceled-text");

      expect(textDiv.text()).toBe("Game canceled");
    });
  });

  describe("Game Feedback Submitter Button", () => {
    it("should emit game feedback submitter button click event when clicked.", async() => {
      const gameFeedbackSubmitterButton = wrapper.findComponent<typeof GameFeedbackSubmitterButton>("#game-feedback-submitter-button");
      (gameFeedbackSubmitterButton.vm as VueVm).$emit("gameFeedbackSubmitterButtonClick");
      await nextTick();

      expect(wrapper.emitted("gameFeedbackSubmitterButtonClick")).toBeTruthy();
    });
  });
});