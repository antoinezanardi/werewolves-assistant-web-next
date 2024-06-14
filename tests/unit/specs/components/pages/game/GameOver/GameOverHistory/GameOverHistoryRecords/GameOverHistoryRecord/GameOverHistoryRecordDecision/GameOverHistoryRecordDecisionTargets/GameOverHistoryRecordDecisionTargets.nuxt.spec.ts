import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { GameOverHistoryRecordDecisionTargetsProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/game-over-history-record-decision-targets.types";
import type GameOverHistoryRecordDecisionTarget from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTarget/GameOverHistoryRecordDecisionTarget.vue";
import GameOverHistoryRecordDecisionTargets from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTargets.vue";
import type OverflowTag from "~/components/shared/misc/OverflowTag/OverflowTag.vue";
import type { GameHistoryRecordPlayTarget } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.class";
import { createFakeGameHistoryRecordPlayTarget } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeActorAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

describe("Game Over History Record Decision Targets Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionTargets>>;
  const defaultPlayers = [
    createFakeActorAlivePlayer({ name: "Antoine" }),
    createFakeActorAlivePlayer({ name: "Vanessa" }),
    createFakeActorAlivePlayer({ name: "Thomas" }),
    createFakeActorAlivePlayer({ name: "Doudou" }),
  ];
  const defaultTargets = [
    createFakeGameHistoryRecordPlayTarget({ player: defaultPlayers[0] }),
    createFakeGameHistoryRecordPlayTarget({ player: defaultPlayers[1] }),
    createFakeGameHistoryRecordPlayTarget({ player: defaultPlayers[2] }),
    createFakeGameHistoryRecordPlayTarget({ player: defaultPlayers[3] }),
  ];
  const defaultGameHistoryRecord = createFakeGameHistoryRecord({
    play: createFakeGameHistoryRecordPlay({
      type: "target",
      action: "eat",
      targets: defaultTargets,
    }),
  });
  const defaultProps: GameOverHistoryRecordDecisionTargetsProps = { gameHistoryRecord: defaultGameHistoryRecord };

  async function mountGameOverHistoryRecordDecisionTargetsComponent(options: ComponentMountingOptions<typeof GameOverHistoryRecordDecisionTargets> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionTargets>>> {
    return mountSuspendedComponent(GameOverHistoryRecordDecisionTargets, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryRecordDecisionTargetsComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Targets", () => {
    it("should render the truncated targets when there are more than 3 targets.", () => {
      const targets = wrapper.findAllComponents<typeof GameOverHistoryRecordDecisionTarget>(".game-over-history-record-target-player");

      expect(targets).toHaveLength(3);
      expect(targets[0].props("target")).toStrictEqual<GameHistoryRecordPlayTarget>(defaultTargets[0]);
      expect(targets[1].props("target")).toStrictEqual<GameHistoryRecordPlayTarget>(defaultTargets[1]);
      expect(targets[2].props("target")).toStrictEqual<GameHistoryRecordPlayTarget>(defaultTargets[2]);
    });

    it("should render the full targets when there are less than 3 targets.", async() => {
      const gameHistoryRecord = createFakeGameHistoryRecord({
        play: createFakeGameHistoryRecordPlay({
          type: "target",
          action: "eat",
          targets: [defaultTargets[0], defaultTargets[1]],
        }),
      });
      wrapper = await mountGameOverHistoryRecordDecisionTargetsComponent({ props: { gameHistoryRecord } });
      const targets = wrapper.findAllComponents<typeof GameOverHistoryRecordDecisionTarget>(".game-over-history-record-target-player");

      expect(targets).toHaveLength(2);
      expect(targets[0].props("target")).toStrictEqual<GameHistoryRecordPlayTarget>(defaultTargets[0]);
      expect(targets[1].props("target")).toStrictEqual<GameHistoryRecordPlayTarget>(defaultTargets[1]);
    });

    it("should not render the targets when there are no targets.", async() => {
      const gameHistoryRecord = createFakeGameHistoryRecord({
        play: createFakeGameHistoryRecordPlay({
          type: "target",
          action: "eat",
        }),
      });
      wrapper = await mountGameOverHistoryRecordDecisionTargetsComponent({ props: { gameHistoryRecord } });
      const targets = wrapper.findAllComponents<typeof GameOverHistoryRecordDecisionTarget>(".game-over-history-record-target-player");

      expect(targets).toHaveLength(0);
    });
  });

  describe("Overflow Tag", () => {
    it("should display the overflow tag when rendered.", () => {
      const overflowTag = wrapper.findComponent<typeof OverflowTag>("#target-players-overflow-tag");

      expect(overflowTag.props("entitiesCount")).toBe(4);
      expect(overflowTag.props("maximumEntitiesDisplayed")).toBe(3);
    });
  });
});