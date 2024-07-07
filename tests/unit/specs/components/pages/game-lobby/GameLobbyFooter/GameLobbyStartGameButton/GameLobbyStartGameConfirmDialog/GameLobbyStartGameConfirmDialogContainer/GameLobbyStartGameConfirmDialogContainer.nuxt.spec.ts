import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameLobbyStartGameConfirmDialogContainerProps } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/game-lobby-start-game-confirm-dialog-container.types";
import GameLobbyStartGameConfirmDialogContainer from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContainer.vue";
import type GameLobbyStartGameConfirmDialogContent from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogContent.vue";
import type GameLobbyStartGameConfirmDialogFooter from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogFooter/GameLobbyStartGameConfirmDialogFooter.vue";

describe("Game Lobby Start Game Confirm Dialog Container Component", () => {
  const defaultProps: GameLobbyStartGameConfirmDialogContainerProps = {
    currentConfirmStep: "players-ready",
    rejectCallback: vi.fn(),
  };
  let wrapper: ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogContainer>>;

  async function mountGameLobbyStartGameConfirmDialogContainerComponent(options: ComponentMountingOptions<typeof GameLobbyStartGameConfirmDialogContainer> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogContainer>>> {
    return mountSuspendedComponent(GameLobbyStartGameConfirmDialogContainer, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogContainerComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Header", () => {
    it("should translate header text when rendered.", () => {
      const header = wrapper.find<HTMLHeadingElement>("#confirm-dialog-header-text");

      expect(header.text()).toBe("Before starting the game");
    });
  });

  describe("Dialog Content", () => {
    it("should pass current confirm step as prop when rendered.", () => {
      const dialogContent = wrapper.findComponent<typeof GameLobbyStartGameConfirmDialogContent>("#game-lobby-start-game-confirm-dialog-content");

      expect(dialogContent.props("currentConfirmStep")).toBe("players-ready");
    });

    it("should handle confirm step event when dialog content emits the event.", async() => {
      const dialogContent = wrapper.findComponent<typeof GameLobbyStartGameConfirmDialogContent>("#game-lobby-start-game-confirm-dialog-content");
      (dialogContent.vm as VueVm).$emit("confirmStep");
      await nextTick();

      expect(wrapper.emitted("confirmStep")).toHaveLength(1);
    });

    it("should handle reject players position step event when dialog content emits the event.", async() => {
      const dialogContent = wrapper.findComponent<typeof GameLobbyStartGameConfirmDialogContent>("#game-lobby-start-game-confirm-dialog-content");
      (dialogContent.vm as VueVm).$emit("rejectPlayersPositionStep");
      await nextTick();

      expect(wrapper.emitted("rejectPlayersPositionStep")).toHaveLength(1);
    });
  });

  describe("Dialog Footer", () => {
    it("should pass current confirm step as prop when rendered.", () => {
      const dialogFooter = wrapper.findComponent<typeof GameLobbyStartGameConfirmDialogFooter>("#game-lobby-start-game-confirm-dialog-footer");

      expect(dialogFooter.props("currentConfirmStep")).toBe("players-ready");
    });

    it("should handle confirm start game event when dialog footer emits the event.", async() => {
      const dialogFooter = wrapper.findComponent<typeof GameLobbyStartGameConfirmDialogFooter>("#game-lobby-start-game-confirm-dialog-footer");
      (dialogFooter.vm as VueVm).$emit("confirmStartGame");
      await nextTick();

      expect(wrapper.emitted("confirmStartGame")).toHaveLength(1);
    });

    it("should handle reject start game event when dialog footer emits the event.", async() => {
      const dialogFooter = wrapper.findComponent<typeof GameLobbyStartGameConfirmDialogFooter>("#game-lobby-start-game-confirm-dialog-footer");
      (dialogFooter.vm as VueVm).$emit("rejectStartGame");
      await nextTick();

      expect(wrapper.emitted("rejectStartGame")).toHaveLength(1);
    });
  });
});