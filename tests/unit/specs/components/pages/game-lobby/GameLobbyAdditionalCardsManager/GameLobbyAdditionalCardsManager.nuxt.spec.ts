import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import Dialog from "primevue/dialog";
import type { GameLobbyAdditionalCardsManagerExposed } from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/game-lobby-additional-cards-manager.types";
import GameLobbyAdditionalCardsManager from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManager.vue";
import type GameLobbyAdditionalCardsManagerContent from "~/components/pages/game-lobby/GameLobbyAdditionalCardsManager/GameLobbyAdditionalCardsManagerContent/GameLobbyAdditionalCardsManagerContent.vue";
import type DialogFooterCloseButtonOnly from "~/components/shared/dialogs/DialogFooterCloseButtonOnly/DialogFooterCloseButtonOnly.vue";
import type DialogHeaderTitleOnly from "~/components/shared/dialogs/DialogHeaderTitleOnly/DialogHeaderTitleOnly.vue";

describe("Game Lobby Additional Cards Manager Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyAdditionalCardsManager>>;

  async function mountGameLobbyAdditionalCardsManagerComponent(options: ComponentMountingOptions<typeof GameLobbyAdditionalCardsManager> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyAdditionalCardsManager>>> {
    return mountSuspendedComponent(GameLobbyAdditionalCardsManager, {
      shallow: false,
      global: {
        stubs: {
          DialogHeaderTitleOnly: true,
          DialogFooterCloseButtonOnly: true,
          GameLobbyAdditionalCardsManagerContent: true,
        },
        ...options,
      },
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyAdditionalCardsManagerComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Dialog not open", () => {
    it("should set dialog to invisible when rendered.", async() => {
      await mountGameLobbyAdditionalCardsManagerComponent({ shallow: true });
      const dialog = wrapper.findComponent<typeof Dialog>(Dialog);

      expect(dialog.props("visible")).toBeFalsy();
    });

    describe("Dialog Header Title Only", () => {
      it("should not render dialog header title only when dialog is not open.", () => {
        const dialogHeaderTitleOnly = wrapper.findComponent<typeof DialogHeaderTitleOnly>("#game-lobby-additional-cards-manager-header");

        expect(dialogHeaderTitleOnly.exists()).toBeFalsy();
      });
    });

    describe("Additional Cards Manager Content", () => {
      it("should not render additional cards manager content when dialog is not open.", () => {
        const additionalCardsManagerContent = wrapper.findComponent<typeof GameLobbyAdditionalCardsManagerContent>("#game-lobby-additional-cards-manager-content");

        expect(additionalCardsManagerContent.exists()).toBeFalsy();
      });
    });

    describe("Dialog Footer Close Button Only", () => {
      it("should not render dialog footer close button only when dialog is not open.", () => {
        const dialogFooterCloseButtonOnly = wrapper.findComponent<typeof DialogFooterCloseButtonOnly>("#game-lobby-additional-cards-manager-footer");

        expect(dialogFooterCloseButtonOnly.exists()).toBeFalsy();
      });
    });
  });

  describe("Dialog open", () => {
    beforeEach(async() => {
      wrapper = await mountGameLobbyAdditionalCardsManagerComponent();
      (wrapper.vm as unknown as GameLobbyAdditionalCardsManagerExposed).open();
    });

    it("should set dialog to visible when rendered.", () => {
      const dialog = wrapper.findComponent<typeof Dialog>(Dialog);

      expect(dialog.props("visible")).toBeTruthy();
    });

    describe("Dialog Header Title Only", () => {
      it("should render dialog header title only when dialog is open.", () => {
        const dialogHeaderTitleOnly = wrapper.findComponent<typeof DialogHeaderTitleOnly>("#game-lobby-additional-cards-manager-header");

        expect(dialogHeaderTitleOnly.exists()).toBeTruthy();
      });
    });

    describe("Additional Cards Manager Content", () => {
      it("should render additional cards manager content when dialog is open.", () => {
        const additionalCardsManagerContent = wrapper.findComponent<typeof GameLobbyAdditionalCardsManagerContent>("#game-lobby-additional-cards-manager-content");

        expect(additionalCardsManagerContent.exists()).toBeTruthy();
      });
    });

    describe("Dialog Footer Close Button Only", () => {
      it("should render dialog footer close button only when dialog is open.", () => {
        const dialogFooterCloseButtonOnly = wrapper.findComponent<typeof DialogFooterCloseButtonOnly>("#game-lobby-additional-cards-manager-footer");

        expect(dialogFooterCloseButtonOnly.exists()).toBeTruthy();
      });

      it("should close dialog when footer emits event.", async() => {
        const dialogFooterCloseButtonOnly = wrapper.findComponent<typeof DialogFooterCloseButtonOnly>("#game-lobby-additional-cards-manager-footer");
        (dialogFooterCloseButtonOnly.vm as VueVm).$emit("close-dialog");
        await nextTick();
        const dialog = wrapper.findComponent<typeof Dialog>(Dialog);

        expect(dialog.props("visible")).toBeFalsy();
      });
    });
  });
});