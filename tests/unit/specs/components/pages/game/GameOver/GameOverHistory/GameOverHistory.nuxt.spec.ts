import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import Dialog, { type DialogProps } from "primevue/dialog";

import type { GameOverHistoryExposed } from "~/components/pages/game/GameOver/GameOverHistory/game-over-history.types";
import GameOverHistory from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistory.vue";
import type GameOverHistoryHeader from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryHeader/GameOverHistoryHeader.vue";
import type DialogFooterCloseButtonOnly from "~/components/shared/dialogs/DialogFooterCloseButtonOnly/DialogFooterCloseButtonOnly.vue";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";

describe("Game Over History Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistory>>;

  async function mountGameOverHistoryComponent(options: ComponentMountingOptions<typeof GameOverHistory> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistory>>> {
    return mountSuspendedComponent(GameOverHistory, {
      shallow: false,
      global: {
        stubs: {
          GameOverHistoryHeader: true,
          GameOverHistoryRecords: true,
          GameOverHistoryFooter: true,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Dialog not open", () => {
    it("should set dialog to invisible when rendered.", async() => {
      await mountGameOverHistoryComponent({ shallow: true });
      const dialog = wrapper.findComponent<typeof Dialog>(Dialog);
      const props = dialog.props() as DialogProps;

      expect(props.visible).toBeFalsy();
    });

    describe("Game Over History Header", () => {
      it("should not render game over history header when dialog is not open.", () => {
        const gameOverHistoryHeader = wrapper.findComponent<typeof GameOverHistoryHeader>("#game-over-history-header");

        expect(gameOverHistoryHeader.exists()).toBeFalsy();
      });
    });

    describe("Game Over History Records", () => {
      it("should not render game over history records when dialog is not open.", () => {
        const gameOverHistoryRecords = wrapper.findComponent<typeof GameOverHistory>("#game-over-history-records");

        expect(gameOverHistoryRecords.exists()).toBeFalsy();
      });
    });

    describe("Game Over History Footer", () => {
      it("should not render game over history footer when dialog is not open.", () => {
        const gameOverHistoryFooter = wrapper.find("#game-over-history-footer");

        expect(gameOverHistoryFooter.exists()).toBeFalsy();
      });
    });
  });

  describe("Dialog open", () => {
    beforeEach(async() => {
      wrapper = await mountGameOverHistoryComponent();
      (wrapper.vm as unknown as GameOverHistoryExposed).showGameHistory();
    });

    it("should set dialog to visible when showGameHistory is called.", () => {
      const dialog = wrapper.findComponent<typeof Dialog>(Dialog);
      const props = dialog.props() as DialogProps;

      expect(props.visible).toBeTruthy();
    });

    describe("Game Over History Header", () => {
      it("should render game over history header when dialog is open.", () => {
        const gameOverHistoryHeader = wrapper.findComponent<typeof GameOverHistoryHeader>("#game-over-history-header");

        expect(gameOverHistoryHeader.exists()).toBeTruthy();
      });
    });

    describe("Game Over History Records", () => {
      it("should render game over history records when dialog is open.", () => {
        const gameOverHistoryRecords = wrapper.findComponent<typeof GameOverHistory>("#game-over-history-records");

        expect(gameOverHistoryRecords.exists()).toBeTruthy();
      });
    });

    describe("Game Over History Footer", () => {
      it("should render game over history footer when dialog is open.", () => {
        const gameOverHistoryFooter = wrapper.findComponent<typeof DialogFooterCloseButtonOnly>("#dialog-footer-close-button-only");

        expect(gameOverHistoryFooter.exists()).toBeTruthy();
      });

      it("should close game history when game over history footer emits event.", async() => {
        const gameOverHistoryFooter = wrapper.findComponent<typeof DialogFooterCloseButtonOnly>("#dialog-footer-close-button-only");
        (gameOverHistoryFooter.vm as VueVm).$emit("close-dialog");
        await nextTick();
        const dialog = wrapper.findComponent<typeof Dialog>(Dialog);
        const props = dialog.props() as DialogProps;

        expect(props.visible).toBeFalsy();
      });
    });
  });
});