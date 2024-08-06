import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import Dialog, { type DialogProps } from "primevue/dialog";
import type { GameLobbyOptionsHubExposed } from "~/components/pages/game-lobby/GameLobbyOptionsHub/game-lobby-options-hub.types";
import GameLobbyOptionsHub from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHub.vue";
import type GameLobbyOptionsHubHeader from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubHeader/GameLobbyOptionsHubHeader.vue";
import type GameLobbyOptionsHubContent from "~/components/pages/game-lobby/GameLobbyOptionsHub/GameLobbyOptionsHubContent/GameLobbyOptionsHubContent.vue";
import type DialogFooterCloseButtonOnly from "~/components/shared/dialogs/DialogFooterCloseButtonOnly/DialogFooterCloseButtonOnly.vue";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";

describe("Game Lobby Options Hub Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyOptionsHub>>;

  async function mountGameLobbyOptionsHubComponent(options: ComponentMountingOptions<typeof GameLobbyOptionsHub> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyOptionsHub>>> {
    return mountSuspendedComponent(GameLobbyOptionsHub, {
      shallow: false,
      global: {
        stubs: {
          GameLobbyOptionsHubHeader: true,
          GameLobbyOptionsHubContent: true,
          DialogFooterCloseButtonOnly: true,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyOptionsHubComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Dialog not open", () => {
    it("should set dialog to invisible when rendered.", async() => {
      await mountGameLobbyOptionsHubComponent({ shallow: true });
      const dialog = wrapper.findComponent<typeof Dialog>(Dialog);
      const props = dialog.props() as DialogProps;

      expect(props.visible).toBeFalsy();
    });

    describe("Game Lobby Options Hub Header", () => {
      it("should not render game lobby options hub header when dialog is not open.", () => {
        const gameLobbyOptionsHubHeader = wrapper.findComponent<typeof GameLobbyOptionsHubHeader>("#game-lobby-options-hub-header");

        expect(gameLobbyOptionsHubHeader.exists()).toBeFalsy();
      });
    });

    describe("Game Lobby Options Hub Content", () => {
      it("should not render game lobby options hub content when dialog is not open.", () => {
        const gameLobbyOptionsHubContent = wrapper.findComponent<typeof GameLobbyOptionsHubContent>("#game-lobby-options-hub-content");

        expect(gameLobbyOptionsHubContent.exists()).toBeFalsy();
      });
    });

    describe("Game Lobby Options Hub Footer", () => {
      it("should not render game lobby options hub footer when dialog is not open.", () => {
        const dialogFooterCloseButtonOnly = wrapper.findComponent<typeof DialogFooterCloseButtonOnly>("#close-button-only-dialog-footer");

        expect(dialogFooterCloseButtonOnly.exists()).toBeFalsy();
      });
    });
  });

  describe("Dialog open", () => {
    beforeEach(async() => {
      wrapper = await mountGameLobbyOptionsHubComponent();
      (wrapper.vm as unknown as GameLobbyOptionsHubExposed).open();
    });

    it("should set dialog to visible when opened.", () => {
      const dialog = wrapper.findComponent<typeof Dialog>(Dialog);
      const props = dialog.props() as DialogProps;

      expect(props.visible).toBeTruthy();
    });

    describe("Game Lobby Options Hub Header", () => {
      it("should render game lobby options hub header when opened.", () => {
        const gameLobbyOptionsHubHeader = wrapper.findComponent<typeof GameLobbyOptionsHubHeader>("#game-lobby-options-hub-header");

        expect(gameLobbyOptionsHubHeader.exists()).toBeTruthy();
      });
    });

    describe("Game Lobby Options Hub Content", () => {
      it("should render game lobby options hub content when opened.", () => {
        const gameLobbyOptionsHubContent = wrapper.findComponent<typeof GameLobbyOptionsHubContent>("#game-lobby-options-hub-content");

        expect(gameLobbyOptionsHubContent.exists()).toBeTruthy();
      });
    });

    describe("Game Lobby Options Hub Footer", () => {
      it("should render game lobby options hub footer when opened.", () => {
        const dialogFooterCloseButtonOnly = wrapper.findComponent<typeof DialogFooterCloseButtonOnly>("#close-button-only-dialog-footer");

        expect(dialogFooterCloseButtonOnly.exists()).toBeTruthy();
      });

      it("should close options hub when option hub footer emits event.", async() => {
        const dialogFooterCloseButtonOnly = wrapper.findComponent<typeof DialogFooterCloseButtonOnly>("#close-button-only-dialog-footer");
        (dialogFooterCloseButtonOnly.vm as VueVm).$emit("close-dialog");
        await nextTick();
        const dialog = wrapper.findComponent<typeof Dialog>(Dialog);
        const props = dialog.props() as DialogProps;

        expect(props.visible).toBeFalsy();
      });
    });
  });
});