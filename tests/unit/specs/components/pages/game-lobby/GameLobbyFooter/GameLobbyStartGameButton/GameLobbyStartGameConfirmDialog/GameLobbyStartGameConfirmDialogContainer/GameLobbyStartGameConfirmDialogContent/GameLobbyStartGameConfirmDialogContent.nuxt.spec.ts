import type { VueVm } from "@tests/unit/utils/types/vue-test-utils.types";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameLobbyStartGameConfirmDialogContentProps } from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/game-lobby-start-game-confirm-dialog-content.types";
import GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced/GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced.vue";
import GameLobbyStartGameConfirmDialogContent from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogContent.vue";
import GameLobbyStartGameConfirmDialogPlayersPositioned from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersPositioned/GameLobbyStartGameConfirmDialogPlayersPositioned.vue";
import GameLobbyStartGameConfirmDialogPlayersReady from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogPlayersReady/GameLobbyStartGameConfirmDialogPlayersReady.vue";
import GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced from "~/components/pages/game-lobby/GameLobbyFooter/GameLobbyStartGameButton/GameLobbyStartGameConfirmDialog/GameLobbyStartGameConfirmDialogContainer/GameLobbyStartGameConfirmDialogContent/GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced/GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced.vue";

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

    it("should render thief additional cards placed component when current confirm step is thief-additional-cards-placed.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogContentComponent({
        props: {
          currentConfirmStep: "thief-additional-cards-placed",
        },
      });
      const component = wrapper.findComponent<typeof GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced>(GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced);

      expect(component.exists()).toBeTruthy();
    });

    it("should render actor additional cards placed component when current confirm step is actor-additional-cards-placed.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogContentComponent({
        props: {
          currentConfirmStep: "actor-additional-cards-placed",
        },
      });
      const component = wrapper.findComponent<typeof GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced>(GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced);

      expect(component.exists()).toBeTruthy();
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

    it("should emit reject thief additional cards placed step event when component emits same event.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogContentComponent({
        props: {
          currentConfirmStep: "thief-additional-cards-placed",
        },
      });
      const component = wrapper.findComponent<typeof GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced>(GameLobbyStartGameConfirmDialogThiefAdditionalCardsPlaced);
      (component.vm as VueVm).$emit("rejectThiefAdditionalCardsPlacedStep");
      await nextTick();

      expect(wrapper.emitted("rejectThiefAdditionalCardsPlacedStep")).toHaveLength(1);
    });

    it("should emit reject actor additional cards placed step event when component emits same event.", async() => {
      wrapper = await mountGameLobbyStartGameConfirmDialogContentComponent({
        props: {
          currentConfirmStep: "actor-additional-cards-placed",
        },
      });
      const component = wrapper.findComponent<typeof GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced>(GameLobbyStartGameConfirmDialogActorAdditionalCardsPlaced);
      (component.vm as VueVm).$emit("rejectActorAdditionalCardsPlacedStep");
      await nextTick();

      expect(wrapper.emitted("rejectActorAdditionalCardsPlacedStep")).toHaveLength(1);
    });
  });
});