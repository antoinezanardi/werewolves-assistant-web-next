import type { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type ToggleButton from "primevue/togglebutton";
import { beforeEach } from "vitest";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import type { GameFeedbackSubmitterEncounteredErrorProps } from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterContent/GameFeedbackSubmitterEncounteredError/game-feedback-submitter-encountered-error.types";
import GameFeedbackSubmitterEncounteredError from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterContent/GameFeedbackSubmitterEncounteredError/GameFeedbackSubmitterEncounteredError.vue";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Feedback Submitter Encountered Error Component", () => {
  const defaultProps: GameFeedbackSubmitterEncounteredErrorProps = {
    modelValue: false,
  };
  let wrapper: ReturnType<typeof mount<typeof GameFeedbackSubmitterEncounteredError>>;

  async function mountGameFeedbackSubmitterEncounteredErrorComponent(options: ComponentMountingOptions<typeof GameFeedbackSubmitterEncounteredError> = {}):
  Promise<ReturnType<typeof mount<typeof GameFeedbackSubmitterEncounteredError>>> {
    return mountSuspendedComponent(GameFeedbackSubmitterEncounteredError, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameFeedbackSubmitterEncounteredErrorComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Label", () => {
    it("should translate label when rendered.", () => {
      const label = wrapper.find<HTMLLabelElement>("#game-feedback-submitter-encountered-error-label");

      expect(label.text()).toBe("Was everything all right during the game?");
    });
  });

  describe("Toggle Button", () => {
    it("should pass model value when rendered.", () => {
      const toggleButton = wrapper.findComponent<typeof ToggleButton>("#game-feedback-submitter-encountered-error-input");

      expect(toggleButton.attributes("modelvalue")).toBe(defaultProps.modelValue.toString());
    });

    it("should update model value when update model value event is emitted.", async() => {
      const toggleButton = wrapper.findComponent<typeof ToggleButton>("#game-feedback-submitter-encountered-error-input");
      const isNewModelValue = true;
      (toggleButton.vm as VueVm).$emit("update:modelValue", isNewModelValue);
      await nextTick();

      expect(toggleButton.attributes("modelvalue")).toBe(isNewModelValue.toString());
    });

    it("should be disabled when game is creating a feedback.", async() => {
      const gameStore = useGameStore();
      gameStore.creatingGameFeedbackStatus = "pending";
      await nextTick();
      const toggleButton = wrapper.findComponent<typeof ToggleButton>("#game-feedback-submitter-encountered-error-input");

      expect(toggleButton.attributes("disabled")).toBe("true");
    });

    it("should not be disabled when game is not creating a feedback.", async() => {
      const gameStore = useGameStore();
      gameStore.creatingGameFeedbackStatus = "idle";
      await nextTick();
      const toggleButton = wrapper.findComponent<typeof ToggleButton>("#game-feedback-submitter-encountered-error-input");

      expect(toggleButton.attributes("disabled")).toBe("false");
    });

    it("should have bg-success class when model value is false.", () => {
      const toggleButton = wrapper.findComponent<typeof ToggleButton>("#game-feedback-submitter-encountered-error-input");

      expect(toggleButton.attributes("class")).toContain("!bg-success");
    });

    it("should have bg-error class when model value is true.", async() => {
      wrapper = await mountGameFeedbackSubmitterEncounteredErrorComponent({
        props: { modelValue: true },
      });
      await nextTick();
      const toggleButton = wrapper.findComponent<typeof ToggleButton>("#game-feedback-submitter-encountered-error-input");

      expect(toggleButton.attributes("class")).toContain("!bg-error");
    });

    it("should translate off label when rendered.", () => {
      const toggleButton = wrapper.findComponent<typeof ToggleButton>("#game-feedback-submitter-encountered-error-input");

      expect(toggleButton.attributes("off-label")).toBe("The game was stable");
    });

    describe("Icon", () => {
      beforeEach(async() => {
        wrapper = await mountGameFeedbackSubmitterEncounteredErrorComponent({
          props: defaultProps,
          global: {
            stubs: {
              ToggleButton: false,
            },
          },
        });
      });

      it("should set icon to check when model value is false.", () => {
        const icon = wrapper.findComponent<typeof FontAwesomeIcon>("#toggle-button-icon");

        expect(icon.props("icon")).toBe("check");
      });

      it("should set icon to bug when model value is true.", async() => {
        wrapper = await mountGameFeedbackSubmitterEncounteredErrorComponent({
          props: { modelValue: true },
          global: {
            stubs: {
              ToggleButton: false,
            },
          },
        });
        await nextTick();
        const icon = wrapper.findComponent<typeof FontAwesomeIcon>("#toggle-button-icon");

        expect(icon.props("icon")).toBe("bug");
      });
    });
  });
});