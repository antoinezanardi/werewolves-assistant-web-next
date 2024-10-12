import type { Ref } from "vue";
import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { DialogProps } from "primevue/dialog";
import Dialog from "primevue/dialog";
import { beforeEach } from "vitest";

import { createFakeCreateGameFeedbackDto } from "@tests/unit/utils/factories/composables/api/game/dto/create-game-feedback/create-game-feedback.dto.factory";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { GameFeedbackSubmitterExposed } from "~/components/pages/game/GameFeedbackSubmitter/game-feedback-submitter.types";
import GameFeedbackSubmitter from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitter.vue";
import type GameFeedbackSubmitterContent from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterContent/GameFeedbackSubmitterContent.vue";
import type GameFeedbackSubmitterFooter from "~/components/pages/game/GameFeedbackSubmitter/GameFeedbackSubmitterFooter/GameFeedbackSubmitterFooter.vue";
import type DialogHeaderTitleOnly from "~/components/shared/dialogs/DialogHeaderTitleOnly/DialogHeaderTitleOnly.vue";
import type { CreateGameFeedbackDto } from "~/composables/api/game/dto/create-game-feedback/create-game-feedback.dto";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Feedback Submitter Component", () => {
  const testingPinia = { initialState: { [StoreIds.GAME]: { creatingGameFeedbackStatus: "idle" } } };
  let wrapper: ReturnType<typeof mount<typeof GameFeedbackSubmitter>>;

  async function mountGameFeedbackSubmitterComponent(options: ComponentMountingOptions<typeof GameFeedbackSubmitter> = {}):
  Promise<ReturnType<typeof mount<typeof GameFeedbackSubmitter>>> {
    return mountSuspendedComponent(GameFeedbackSubmitter, {
      global: {
        plugins: [createTestingPinia(testingPinia)],
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameFeedbackSubmitterComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendering without shallow rendering.", async() => {
    wrapper = await mountGameFeedbackSubmitterComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Dialog", () => {
    it("should be closable when feedback is not being created.", () => {
      const dialog = wrapper.findComponent<typeof Dialog>("#game-feedback-submitter");

      expect(dialog.attributes("closable")).toBe("true");
    });

    it("should not be closable when feedback is being created.", async() => {
      const gameStore = useGameStore();
      gameStore.creatingGameFeedbackStatus = "pending";
      await nextTick();
      const dialog = wrapper.findComponent<typeof Dialog>("#game-feedback-submitter");

      expect(dialog.attributes("closable")).toBe("false");
    });

    it("should allow close on escape key press when feedback is not being created.", () => {
      const dialog = wrapper.findComponent<typeof Dialog>("#game-feedback-submitter");

      expect(dialog.attributes("close-on-escape")).toBe("true");
    });

    it("should not allow close on escape key press when feedback is being created.", async() => {
      const gameStore = useGameStore();
      gameStore.creatingGameFeedbackStatus = "pending";
      await nextTick();
      const dialog = wrapper.findComponent<typeof Dialog>("#game-feedback-submitter");

      expect(dialog.attributes("close-on-escape")).toBe("false");
    });

    it("should have dismissable mask when feedback is not being created.", () => {
      const dialog = wrapper.findComponent<typeof Dialog>("#game-feedback-submitter");

      expect(dialog.attributes("dismissable-mask")).toBe("true");
    });

    it("should not have dismissable mask when feedback is being created.", async() => {
      const gameStore = useGameStore();
      gameStore.creatingGameFeedbackStatus = "pending";
      await nextTick();
      const dialog = wrapper.findComponent<typeof Dialog>("#game-feedback-submitter");

      expect(dialog.attributes("dismissable-mask")).toBe("false");
    });

    describe("Dialog is open", () => {
      beforeEach(async() => {
        wrapper = await mountGameFeedbackSubmitterComponent({
          shallow: false,
          global: {
            stubs: {
              DialogHeaderTitleOnly: true,
              GameFeedbackSubmitterContent: true,
              GameFeedbackSubmitterFooter: true,
            },
            plugins: [createTestingPinia(testingPinia)],
          },
        });
        (wrapper.vm as unknown as GameFeedbackSubmitterExposed).showGameFeedbackSubmitter();
      });

      it("should reset feedback form when opened.", async() => {
        const gameFeedbackSubmitterContent = wrapper.findComponent<typeof GameFeedbackSubmitterContent>("#game-feedback-submitter-content");
        const changedFeedback = createFakeCreateGameFeedbackDto({
          score: 5,
          hasEncounteredError: true,
        });
        (gameFeedbackSubmitterContent.vm as VueVm).$emit("update:modelValue", changedFeedback);
        await nextTick();
        (wrapper.vm as unknown as GameFeedbackSubmitterExposed).showGameFeedbackSubmitter();
        await nextTick();
        const expectedDefaultFeedback = createFakeCreateGameFeedbackDto({
          score: 0,
          hasEncounteredError: false,
        });
        const ref = (wrapper.vm as unknown as { createGameFeedbackDto: Ref<CreateGameFeedbackDto> }).createGameFeedbackDto;

        expect(ref.value).toStrictEqual<CreateGameFeedbackDto>(expectedDefaultFeedback);
      });

      it("should pass translated title to header when rendered.", () => {
        const dialogHeader = wrapper.findComponent<typeof DialogHeaderTitleOnly>("#game-feedback-submitter-header");

        expect(dialogHeader.props("title")).toBe("Game feedback");
      });

      it("should close dialog when close button in footer is clicked.", async() => {
        const gameFeedbackSubmitterFooter = wrapper.findComponent<typeof GameFeedbackSubmitterFooter>("#game-feedback-submitter-footer");
        (gameFeedbackSubmitterFooter.vm as VueVm).$emit("close-dialog");
        await nextTick();
        const dialog = wrapper.findComponent<typeof Dialog>(Dialog);
        const props = dialog.props() as DialogProps;

        expect(props.visible).toBeFalsy();
      });
    });
  });
});