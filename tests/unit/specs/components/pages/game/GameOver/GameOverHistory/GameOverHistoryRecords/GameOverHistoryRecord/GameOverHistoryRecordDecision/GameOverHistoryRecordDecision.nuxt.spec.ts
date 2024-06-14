import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameOverHistoryRecordDecisionProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/game-over-history-record-decision.types";
import GameOverHistoryRecordDecision from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecision.vue";
import type GameOverHistoryRecordDecisionBuriedPlayers from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionBuriedPlayers/GameOverHistoryRecordDecisionBuriedPlayers.vue";
import type GameOverHistoryRecordDecisionChosenCard from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionChosenCard/GameOverHistoryRecordDecisionChosenCard.vue";
import type GameOverHistoryRecordDecisionChosenSide from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionChosenSide/GameOverHistoryRecordDecisionChosenSide.vue";
import type GameOverHistoryRecordDecisionNominatedPlayers from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionNominatedPlayers/GameOverHistoryRecordDecisionNominatedPlayers.vue";
import type GameOverHistoryRecordDecisionTargets from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTargets.vue";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Over History Record Decision Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordDecision>>;
  const defaultGameHistoryRecord = createFakeGameHistoryRecord({
    play: createFakeGameHistoryRecordPlay({
      type: "vote",
      action: "vote",
    }),
  });
  const defaultProps: GameOverHistoryRecordDecisionProps = { gameHistoryRecord: defaultGameHistoryRecord };

  async function mountGameOverHistoryRecordDecisionComponent(options: ComponentMountingOptions<typeof GameOverHistoryRecordDecision> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryRecordDecision>>> {
    return mountSuspendedComponent(GameOverHistoryRecordDecision, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryRecordDecisionComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game Over History Record Decision Targets", () => {
    it("should render Game Over History Record Targets when game history record play is target type.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "target",
              action: "look",
            }),
          }),
        },
      });
      const gameOverHistoryRecordTargets = wrapper.findComponent<typeof GameOverHistoryRecordDecisionTargets>("#game-over-history-record-play-targets");

      expect(gameOverHistoryRecordTargets.exists()).toBeTruthy();
    });

    it("should not render Game Over History Record Targets when game history record play is not target type.", () => {
      const gameOverHistoryRecordTargets = wrapper.findComponent<typeof GameOverHistoryRecordDecisionTargets>("#game-over-history-record-play-targets");

      expect(gameOverHistoryRecordTargets.exists()).toBeFalsy();
    });
  });

  describe("GameOverHistoryRecordDecisionNominatedPlayers", () => {
    it("should display nominated players when game history record play is vote type.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "vote",
              action: "vote",
            }),
          }),
        },
      });
      const nominatedPlayers = wrapper.findComponent<typeof GameOverHistoryRecordDecisionNominatedPlayers>("#game-over-history-record-play-nominated-players");

      expect(nominatedPlayers.exists()).toBeTruthy();
    });

    it("should not display nominated players when game history record play is not vote type.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "target",
              action: "look",
            }),
          }),
        },
      });
      const nominatedPlayers = wrapper.findComponent<typeof GameOverHistoryRecordDecisionNominatedPlayers>("#game-over-history-record-play-nominated-players");

      expect(nominatedPlayers.exists()).toBeFalsy();
    });
  });

  describe("Game Over History Record Decision Buried Players", () => {
    it("should display buried players when game history record play is bury type.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "bury-dead-bodies",
              action: "bury-dead-bodies",
            }),
          }),
        },
      });
      const buriedPlayers = wrapper.findComponent<typeof GameOverHistoryRecordDecisionBuriedPlayers>("#game-over-history-record-play-buried-players");

      expect(buriedPlayers.exists()).toBeTruthy();
    });

    it("should not display buried players when game history record play is not bury type.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "target",
              action: "look",
            }),
          }),
        },
      });
      const buriedPlayers = wrapper.findComponent<typeof GameOverHistoryRecordDecisionBuriedPlayers>("#game-over-history-record-play-buried-players");

      expect(buriedPlayers.exists()).toBeFalsy();
    });
  });

  describe("Game Over History Record Decision Chosen Card", () => {
    it("should display chosen card when game history record play is choose type.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "choose-card",
              action: "choose-card",
            }),
          }),
        },
      });
      const chosenCard = wrapper.findComponent<typeof GameOverHistoryRecordDecisionChosenCard>("#game-over-history-record-play-chosen-card");

      expect(chosenCard.exists()).toBeTruthy();
    });

    it("should not display chosen card when game history record play is not choose type.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "target",
              action: "look",
            }),
          }),
        },
      });
      const chosenCard = wrapper.findComponent<typeof GameOverHistoryRecordDecisionChosenCard>("#game-over-history-record-play-chosen-card");

      expect(chosenCard.exists()).toBeFalsy();
    });
  });

  describe("Game Over History Record Decision Chosen Side", () => {
    it("should display chosen side when game history record play is choose side type.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "choose-side",
              action: "choose-side",
            }),
          }),
        },
      });
      const chosenSide = wrapper.findComponent<typeof GameOverHistoryRecordDecisionChosenSide>("#game-over-history-record-play-chosen-side");

      expect(chosenSide.exists()).toBeTruthy();
    });

    it("should not display chosen side when game history record play is not choose side type.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "target",
              action: "look",
            }),
          }),
        },
      });
      const chosenSide = wrapper.findComponent<typeof GameOverHistoryRecordDecisionChosenSide>("#game-over-history-record-play-chosen-side");

      expect(chosenSide.exists()).toBeFalsy();
    });
  });

  describe("No decision displayed", () => {
    it("should not display any decision when game history record play is not a known type.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "no-action",
              action: "growl",
            }),
          }),
        },
      });
      const chosenSide = wrapper.findComponent<typeof GameOverHistoryRecordDecisionChosenSide>("#game-over-history-record-play-chosen-side");
      const chosenCard = wrapper.findComponent<typeof GameOverHistoryRecordDecisionChosenCard>("#game-over-history-record-play-chosen-card");
      const buriedPlayers = wrapper.findComponent<typeof GameOverHistoryRecordDecisionBuriedPlayers>("#game-over-history-record-play-buried-players");
      const nominatedPlayers = wrapper.findComponent<typeof GameOverHistoryRecordDecisionNominatedPlayers>("#game-over-history-record-play-nominated-players");
      const gameOverHistoryRecordTargets = wrapper.findComponent<typeof GameOverHistoryRecordDecisionTargets>("#game-over-history-record-play-targets");

      expect(chosenSide.exists()).toBeFalsy();
      expect(chosenCard.exists()).toBeFalsy();
      expect(buriedPlayers.exists()).toBeFalsy();
      expect(nominatedPlayers.exists()).toBeFalsy();
      expect(gameOverHistoryRecordTargets.exists()).toBeFalsy();
    });
  });
});