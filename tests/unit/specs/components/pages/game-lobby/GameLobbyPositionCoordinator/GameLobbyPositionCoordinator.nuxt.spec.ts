import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import Dialog from "primevue/dialog";
import type { GameLobbyPositionCoordinatorExposed } from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/game-lobby-position-coordinator.types";
import GameLobbyPositionCoordinator from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/GameLobbyPositionCoordinator.vue";
import type GameLobbyPositionCoordinatorChart from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/GameLobbyPositionCoordinatorChart/GameLobbyPositionCoordinatorChart.vue";
import type GameLobbyPositionCoordinatorSorter from "~/components/pages/game-lobby/GameLobbyPositionCoordinator/GameLobbyPositionCoordinatorSorter/GameLobbyPositionCoordinatorSorter.vue";
import type DialogFooterCloseButtonOnly from "~/components/shared/dialogs/DialogFooterCloseButtonOnly/DialogFooterCloseButtonOnly.vue";
import type DialogHeaderTitleOnly from "~/components/shared/dialogs/DialogHeaderTitleOnly/DialogHeaderTitleOnly.vue";

describe("Game Lobby Position Coordinator Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyPositionCoordinator>>;

  async function mountGameLobbyPositionCoordinatorComponent(options: ComponentMountingOptions<typeof GameLobbyPositionCoordinator> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyPositionCoordinator>>> {
    return mountSuspendedComponent(GameLobbyPositionCoordinator, {
      shallow: false,
      global: {
        stubs: {
          DialogHeaderTitleOnly: true,
          GameLobbyPositionCoordinatorChart: true,
          GameLobbyPositionCoordinatorSorter: true,
          DialogFooterCloseButtonOnly: true,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyPositionCoordinatorComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Dialog not open", () => {
    it("should set dialog to invisible when rendered.", async() => {
      await mountGameLobbyPositionCoordinatorComponent({ shallow: true });
      const dialog = wrapper.findComponent<typeof Dialog>(Dialog);

      expect(dialog.props("visible")).toBeFalsy();
    });

    describe("Dialog Header Title Only", () => {
      it("should not render dialog header title only when dialog is not open.", () => {
        const dialogHeaderTitleOnly = wrapper.findComponent<typeof DialogHeaderTitleOnly>("#game-lobby-position-coordinator-header");

        expect(dialogHeaderTitleOnly.exists()).toBeFalsy();
      });
    });

    describe("Coordinator Content", () => {
      it("should not render coordinator chat when dialog is not open.", () => {
        const coordinatorChart = wrapper.findComponent<typeof GameLobbyPositionCoordinatorChart>("#game-lobby-position-coordinator-chart");

        expect(coordinatorChart.exists()).toBeFalsy();
      });

      it("should not render coordinator sorter when dialog is not open.", () => {
        const coordinatorSorter = wrapper.findComponent<typeof GameLobbyPositionCoordinatorSorter>("#game-lobby-position-coordinator-sorter");

        expect(coordinatorSorter.exists()).toBeFalsy();
      });
    });

    describe("Dialog Footer Close Button Only", () => {
      it("should not render dialog footer close button only when dialog is not open.", () => {
        const dialogFooterCloseButtonOnly = wrapper.findComponent<typeof DialogFooterCloseButtonOnly>("#game-lobby-position-coordinator-footer");

        expect(dialogFooterCloseButtonOnly.exists()).toBeFalsy();
      });
    });
  });

  describe("Dialog open", () => {
    beforeEach(async() => {
      wrapper = await mountGameLobbyPositionCoordinatorComponent();
      (wrapper.vm as unknown as GameLobbyPositionCoordinatorExposed).open();
    });

    it("should set dialog to visible when opened.", () => {
      const dialog = wrapper.findComponent<typeof Dialog>(Dialog);

      expect(dialog.props("visible")).toBeTruthy();
    });

    describe("Dialog Header Title Only", () => {
      it("should render dialog header title only when dialog is open.", () => {
        const dialogHeaderTitleOnly = wrapper.findComponent<typeof DialogHeaderTitleOnly>("#game-lobby-position-coordinator-header");

        expect(dialogHeaderTitleOnly.exists()).toBeTruthy();
      });
    });

    describe("Coordinator Content", () => {
      it("should render coordinator chat when dialog is open.", () => {
        const coordinatorChart = wrapper.findComponent<typeof GameLobbyPositionCoordinatorChart>("#game-lobby-position-coordinator-chart");

        expect(coordinatorChart.exists()).toBeTruthy();
      });

      it("should render coordinator sorter when dialog is open.", () => {
        const coordinatorSorter = wrapper.findComponent<typeof GameLobbyPositionCoordinatorSorter>("#game-lobby-position-coordinator-sorter");

        expect(coordinatorSorter.exists()).toBeTruthy();
      });
    });

    describe("Dialog Footer Close Button Only", () => {
      it("should render dialog footer close button only when dialog is open.", () => {
        const dialogFooterCloseButtonOnly = wrapper.findComponent<typeof DialogFooterCloseButtonOnly>("#game-lobby-position-coordinator-footer");

        expect(dialogFooterCloseButtonOnly.exists()).toBeTruthy();
      });

      it("should close dialog when footer emits event.", async() => {
        const dialogFooterCloseButtonOnly = wrapper.findComponent<typeof DialogFooterCloseButtonOnly>("#game-lobby-position-coordinator-footer");
        (dialogFooterCloseButtonOnly.vm as VueVm).$emit("close-dialog");
        await nextTick();
        const dialog = wrapper.findComponent<typeof Dialog>(Dialog);

        expect(dialog.props("visible")).toBeFalsy();
      });
    });
  });
});