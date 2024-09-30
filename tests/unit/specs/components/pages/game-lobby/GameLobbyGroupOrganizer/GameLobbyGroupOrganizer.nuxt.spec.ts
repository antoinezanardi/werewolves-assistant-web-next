import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import Dialog, { type DialogProps } from "primevue/dialog";
import { beforeEach } from "vitest";
import type { GameLobbyGroupOrganizerExposed } from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/game-lobby-group-organizer.types";
import GameLobbyGroupOrganizer from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizer.vue";
import type GameLobbyGroupOrganizerContent from "~/components/pages/game-lobby/GameLobbyGroupOrganizer/GameLobbyGroupOrganizerContent/GameLobbyGroupOrganizerContent.vue";
import type DialogFooterCloseButtonOnly from "~/components/shared/dialogs/DialogFooterCloseButtonOnly/DialogFooterCloseButtonOnly.vue";
import type DialogHeaderTitleOnly from "~/components/shared/dialogs/DialogHeaderTitleOnly/DialogHeaderTitleOnly.vue";

describe("Game Lobby Group Organizer Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyGroupOrganizer>>;

  async function mountGameLobbyGroupOrganizerComponent(options: ComponentMountingOptions<typeof GameLobbyGroupOrganizer> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyGroupOrganizer>>> {
    return mountSuspendedComponent(GameLobbyGroupOrganizer, {
      shallow: false,
      global: {
        stubs: {
          GameLobbyGroupOrganizerContent: true,
          DialogHeaderTitleOnly: true,
          DialogFooterCloseButtonOnly: true,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyGroupOrganizerComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Dialog not open", () => {
    it("should set dialog to invisible when rendered.", async() => {
      await mountGameLobbyGroupOrganizerComponent({ shallow: true });
      const dialog = wrapper.findComponent<typeof Dialog>(Dialog);
      const props = dialog.props() as DialogProps;

      expect(props.visible).toBeFalsy();
    });

    describe("Dialog Header Title Only", () => {
      it("should not render dialog header title only when dialog is not open.", () => {
        const dialogHeaderTitleOnly = wrapper.findComponent<typeof DialogHeaderTitleOnly>("#game-lobby-group-organizer-header");

        expect(dialogHeaderTitleOnly.exists()).toBeFalsy();
      });
    });

    describe("Group Organizer Content", () => {
      it("should not render group organizer content when dialog is not open.", () => {
        const groupOrganizerContent = wrapper.findComponent<typeof GameLobbyGroupOrganizerContent>("#game-lobby-group-organizer-content");

        expect(groupOrganizerContent.exists()).toBeFalsy();
      });
    });
  });

  describe("Dialog open", () => {
    beforeEach(async() => {
      wrapper = await mountGameLobbyGroupOrganizerComponent();
      (wrapper.vm as unknown as GameLobbyGroupOrganizerExposed).open();
    });

    it("should set dialog to visible when opened.", () => {
      const dialog = wrapper.findComponent<typeof Dialog>(Dialog);
      const props = dialog.props() as DialogProps;

      expect(props.visible).toBeTruthy();
    });

    describe("Dialog Header Title Only", () => {
      it("should render dialog header title only when dialog is open.", () => {
        const dialogHeaderTitleOnly = wrapper.findComponent<typeof DialogHeaderTitleOnly>("#game-lobby-group-organizer-header");

        expect(dialogHeaderTitleOnly.exists()).toBeTruthy();
      });
    });

    describe("Group Organizer Content", () => {
      it("should render group organizer content when dialog is open.", () => {
        const groupOrganizerContent = wrapper.findComponent<typeof GameLobbyGroupOrganizerContent>("#game-lobby-group-organizer-content");

        expect(groupOrganizerContent.exists()).toBeTruthy();
      });
    });

    describe("Dialog Footer Close Button Only", () => {
      it("should render dialog footer close button only when dialog is open.", () => {
        const dialogFooterCloseButtonOnly = wrapper.findComponent<typeof DialogFooterCloseButtonOnly>("#game-lobby-group-organizer-footer");

        expect(dialogFooterCloseButtonOnly.exists()).toBeTruthy();
      });

      it("should close dialog when close button is clicked.", async() => {
        const dialogFooterCloseButtonOnly = wrapper.findComponent<typeof DialogFooterCloseButtonOnly>("#game-lobby-group-organizer-footer");
        (dialogFooterCloseButtonOnly.vm as VueVm).$emit("close-dialog");
        await nextTick();
        const dialog = wrapper.findComponent<typeof Dialog>(Dialog);
        const props = dialog.props() as DialogProps;

        expect(props.visible).toBeFalsy();
      });
    });
  });
});