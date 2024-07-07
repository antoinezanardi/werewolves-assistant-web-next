import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameLobbyStartGameConfirmDialogContentProps } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/game-lobby-start-game-confirm-dialog-content.types";
import GameLobbyStartGameConfirmDialogContent from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogContent.vue";
import GameLobbyStartGameConfirmDialogPlayersPositioned from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersPositioned/GameLobbyStartGameConfirmDialogPlayersPositioned.vue";
import GameLobbyStartGameConfirmDialogPlayersReady from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersReady/GameLobbyStartGameConfirmDialogPlayersReady.vue";

describe("Game Lobby Start Game Confirm Dialog Content Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogContent>>;
  const defaultProps: GameLobbyStartGameConfirmDialogContentProps = {
    currentConfirmStep: "players-ready",
  };

  async function mountGameLobbyStartGameConfirmDialogContentComponent(options: ComponentMountingOptions<typeof GameLobbyStartGameConfirmDialogContent> = {}):
  Promise<ReturnType<typeof mount<typeof GameLobbyStartGameConfirmDialogContent>>> {
    return mountSuspendedComponent(GameLobbyStartGameConfirmDialogContent, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameLobbyStartGameConfirmDialogContentComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Confirm Step Component", () => {
    it("should render player positioned confirm step component when current confirm step is players-positioned.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogContentComponent({
        props: {
          currentConfirmStep: "players-positioned",
        },
      });
      const playerPositionedConfirmStep = wrapper.findComponent<typeof GameLobbyStartGameConfirmDialogPlayersPositioned>(GameLobbyStartGameConfirmDialogPlayersPositioned);

      expect(playerPositionedConfirmStep.exists()).toBeTruthy();
    });

    it("should render players ready confirm step component when current confirm step is players-ready.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogContentComponent({
        props: {
          currentConfirmStep: "players-ready",
        },
      });
      const playerReadyConfirmStep = wrapper.findComponent<typeof GameLobbyStartGameConfirmDialogPlayersReady>(GameLobbyStartGameConfirmDialogPlayersReady);

      expect(playerReadyConfirmStep.exists()).toBeTruthy();
    });

    it("should emit confirm step event when component emits confirm step event.", async() => {
      const playerReadyConfirmStep = wrapper.findComponent<typeof GameLobbyStartGameConfirmDialogPlayersReady>(GameLobbyStartGameConfirmDialogPlayersReady);
      (playerReadyConfirmStep.vm as VueVm).$emit("confirmStep");
      await nextTick();

      expect(wrapper.emitted("confirmStep")).toHaveLength(1);
    });

    it("should emit reject players position step event when component emits reject step event.", async() => {
      const playerReadyConfirmStep = wrapper.findComponent<typeof GameLobbyStartGameConfirmDialogPlayersReady>(GameLobbyStartGameConfirmDialogPlayersReady);
      (playerReadyConfirmStep.vm as VueVm).$emit("rejectPlayersPositionStep");
      await nextTick();

      expect(wrapper.emitted("rejectPlayersPositionStep")).toHaveLength(1);
    });
  });
});