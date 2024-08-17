import type { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { ButtonProps } from "primevue/button";
import type Button from "primevue/button";
import type { GameLobbyStartGameConfirmDialogFooterProps } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogFooter/game-lobby-start-game-confirm-dialog-footer.types";
import GameLobbyStartGameConfirmDialogFooter from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogFooter/GameLobbyStartGameConfirmDialogFooter.vue";

describe("Game Lobby Start Game Confirm Dialog Footer Component", () => {
  const defaultProps: GameLobbyStartGameConfirmDialogFooterProps = {
    currentConfirmStep: "players-ready",
  };
  let wrapper: ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogFooter>>;

  async function mountGameLobbyStartGameConfirmDialogFooterComponent(options: ComponentMountingOptions<typeof GameLobbyStartGameConfirmDialogFooter> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogFooter>>> {
    return mountSuspendedComponent(GameLobbyStartGameConfirmDialogFooter, {
      global: { stubs: { Button: false } },
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogFooterComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Cancel Button", () => {
    it("should emit reject start game event when clicked.", async() => {
      const cancelButton = wrapper.findComponent<typeof Button>("#cancel-button");
      await cancelButton.trigger("click");

      expect(wrapper.emitted("rejectStartGame")).toHaveLength(1);
    });

    it("should translate button text when rendered.", () => {
      const cancelButton = wrapper.findComponent<typeof Button>("#cancel-button");
      const props = cancelButton.props() as ButtonProps;

      expect(props.label).toBe("Cancel");
    });
  });

  describe("Confirm Button", () => {
    it("should emit confirm start game event when clicked.", async() => {
      const confirmButton = wrapper.findComponent<typeof Button>("#confirm-button");
      await confirmButton.trigger("click");

      expect(wrapper.emitted("confirmStartGame")).toHaveLength(1);
    });

    it("should set forward icon to button icon when confirm step is 'players-positioned'.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogFooterComponent({
        props: {
          ...defaultProps,
          currentConfirmStep: "players-positioned",
        },
      });
      const confirmButtonIcon = wrapper.findComponent<typeof FontAwesomeIcon>("#confirm-button-icon");

      expect(confirmButtonIcon.props("icon")).toBe("forward");
    });

    it("should translate confirm button when confirm step is 'players-positioned'.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogFooterComponent({
        props: {
          ...defaultProps,
          currentConfirmStep: "players-positioned",
        },
      });
      const confirmButton = wrapper.findComponent<typeof Button>("#confirm-button");
      const buttonProps = confirmButton.props() as ButtonProps;

      expect(buttonProps.label).toBe("components.GameLobbyStartGameConfirmDialogFooter.skipAndPlay");
    });

    it("should set special classes to button icon when confirm step is 'players-positioned'.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogFooterComponent({
        props: {
          ...defaultProps,
          currentConfirmStep: "players-positioned",
        },
      });
      const confirmButtonIcon = wrapper.findComponent<typeof FontAwesomeIcon>("#confirm-button-icon");
      const expectedClasses = ["me-2"];

      expect(confirmButtonIcon.classes()).toIncludeAllMembers(expectedClasses);
    });

    it("should set confirm button icon to play when confirm step is 'players-ready'.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogFooterComponent({
        props: {
          ...defaultProps,
          currentConfirmStep: "players-ready",
        },
      });
      const confirmButton = wrapper.findComponent<typeof FontAwesomeIcon>("#confirm-button-icon");

      expect(confirmButton.props("icon")).toBe("play");
    });

    it("should set special classes to button icon when confirm step is 'players-ready'.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogFooterComponent({
        props: {
          ...defaultProps,
          currentConfirmStep: "players-ready",
        },
      });
      const confirmButtonIcon = wrapper.findComponent<typeof FontAwesomeIcon>("#confirm-button-icon");
      const expectedClasses = ["me-4", "fa-beat-fade"];

      expect(confirmButtonIcon.classes()).toIncludeAllMembers(expectedClasses);
    });

    it("should translate confirm button when confirm step is 'players-ready'.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogFooterComponent({
        props: {
          ...defaultProps,
          currentConfirmStep: "players-ready",
        },
      });
      const confirmButton = wrapper.findComponent<typeof Button>("#confirm-button");
      const buttonProps = confirmButton.props() as ButtonProps;

      expect(buttonProps.label).toBe("components.GameLobbyStartGameConfirmDialogFooter.letsGo");
    });

    it("should set special classes to button when confirm step is 'players-ready'.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogFooterComponent({
        props: {
          ...defaultProps,
          currentConfirmStep: "players-ready",
        },
      });
      const confirmButton = wrapper.findComponent<typeof Button>("#confirm-button");
      const expectedClasses = ["grow", "p-button-success", "justify-center", "p-button-lg"];

      expect(confirmButton.classes()).toIncludeAllMembers(expectedClasses);
    });

    it("should not set special classes to button icon when confirm step is not 'players-ready'.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogFooterComponent({
        props: {
          ...defaultProps,
          currentConfirmStep: "players-positioned",
        },
      });
      const confirmButton = wrapper.findComponent<typeof Button>("#confirm-button");
      const expectedClasses = ["grow", "p-button-success", "justify-center", "p-button-lg"];

      expect(confirmButton.classes()).not.toIncludeAnyMembers(expectedClasses);
    });

    it("should set forward icon to button icon when confirm step is not 'players-ready'.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogFooterComponent({
        props: {
          ...defaultProps,
          currentConfirmStep: "players-positioned",
        },
      });
      const confirmButton = wrapper.findComponent<typeof FontAwesomeIcon>("#confirm-button-icon");

      expect(confirmButton.props("icon")).toBe("forward");
    });

    it("should set play icon to button icon when confirm step is 'players-ready'.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogFooterComponent({
        props: {
          ...defaultProps,
          currentConfirmStep: "players-ready",
        },
      });
      const confirmButton = wrapper.findComponent<typeof FontAwesomeIcon>("#confirm-button-icon");

      expect(confirmButton.props("icon")).toBe("play");
    });
  });
});