import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type Button from "primevue/button";
import type { GameLobbyStartGameConfirmDialogFooterProps } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogFooter/game-lobby-start-game-confirm-dialog-footer.types";
import GameLobbyStartGameConfirmDialogFooter from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogFooter/GameLobbyStartGameConfirmDialogFooter.vue";

describe("Game Lobby Start Game Confirm Dialog Footer Component", () => {
  const defaultProps: GameLobbyStartGameConfirmDialogFooterProps = {
    acceptCallback: vi.fn(),
    rejectCallback: vi.fn(),
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
    it("should call rejectCallback when clicked.", async() => {
      const cancelButton = wrapper.findComponent<typeof Button>("#cancel-button");
      await cancelButton.trigger("click");

      expect(defaultProps.rejectCallback).toHaveBeenCalledExactlyOnceWith(expect.any(Event));
    });

    it("should translate button text when rendered.", () => {
      const cancelButton = wrapper.find<HTMLSpanElement>("#cancel-button-text");

      expect(cancelButton.text()).toBe("Cancel");
    });
  });

  describe("Confirm Button", () => {
    it("should call acceptCallback when clicked.", async() => {
      const confirmButton = wrapper.findComponent<typeof Button>("#confirm-button");
      await confirmButton.trigger("click");

      expect(defaultProps.acceptCallback).toHaveBeenCalledExactlyOnceWith(expect.any(Event));
    });

    it("should translate confirm button when confirm step is 'players-positioned'.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogFooterComponent({
        props: {
          ...defaultProps,
          currentConfirmStep: "players-positioned",
        },
      });
      const confirmButton = wrapper.find<HTMLSpanElement>("#confirm-button-text");

      expect(confirmButton.text()).toBe("components.GameLobbyStartGameConfirmDialogFooter.skipAndPlay");
    });

    it("should translate confirm button when confirm step is 'players-ready'.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogFooterComponent({
        props: {
          ...defaultProps,
          currentConfirmStep: "players-ready",
        },
      });
      const confirmButton = wrapper.find<HTMLSpanElement>("#confirm-button-text");

      expect(confirmButton.text()).toBe("components.GameLobbyStartGameConfirmDialogFooter.letsGo");
    });

    it("should set special classes to button icon when confirm step is 'players-ready'.", async() => {
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
      const confirmButton = wrapper.find<HTMLSpanElement>("#confirm-button-icon");
      const expectedIconClasses = ["fa", "fa-forward", "me-2"];

      expect(confirmButton.classes()).toIncludeAllMembers(expectedIconClasses);
    });

    it("should set play icon to button icon when confirm step is 'players-ready'.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogFooterComponent({
        props: {
          ...defaultProps,
          currentConfirmStep: "players-ready",
        },
      });
      const confirmButton = wrapper.find<HTMLSpanElement>("#confirm-button-icon");
      const expectedIconClasses = ["fa", "fa-beat-fade", "fa-play", "me-4"];

      expect(confirmButton.classes()).toIncludeAllMembers(expectedIconClasses);
    });
  });
});