import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import { createFakeGameHistoryRecordPlayTarget } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeActorAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { GameOverHistoryRecordDecisionTargetsProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/game-over-history-record-decision-targets.types";
import type GameOverHistoryRecordDecisionTarget from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTarget/GameOverHistoryRecordDecisionTarget.vue";
import GameOverHistoryRecordDecisionTargets from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecisionTargets/GameOverHistoryRecordDecisionTargets.vue";
import type { GameHistoryRecordPlayTarget } from "~/composables/api/game/types/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.class";

describe("Game Over History Record Decision Targets Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordDecisionTargets>>;
  const defaultPlayers = [
    createFakeActorAlivePlayer({ name: "Antoine" }),
    createFakeActorAlivePlayer({ name: "Olivia" }),
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

  describe("Target Role Title", () => {
    it("should render the target role title when there only one target.", async() => {
      wrapper = await mountGameOverHistoryRecordDecisionTargetsComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "target",
              action: "eat",
              targets: [
                createFakeGameHistoryRecordPlayTarget({
                  player: createFakeActorAlivePlayer(),
                }),
              ],
            }),
          }),
        },
      });
      const targetRoleTitle = wrapper.find<HTMLHeadingElement>("#game-over-history-record-target-role-name");

      expect(targetRoleTitle.text()).toBe("shared.role.definiteName.actor, 1");
    });

    it("should not render the target role title when there are multiple targets.", () => {
      const targetRoleTitle = wrapper.find<HTMLHeadingElement>("#game-over-history-record-target-role-name");

      expect(targetRoleTitle.exists()).toBeFalsy();
    });
  });

  describe("Targets", () => {
    it("should render the targets when rendered.", () => {
      const targets = wrapper.findAllComponents<typeof GameOverHistoryRecordDecisionTarget>(".game-over-history-record-target-player");

      expect(targets).toHaveLength(4);
      expect(targets[0].props("target")).toStrictEqual<GameHistoryRecordPlayTarget>(defaultTargets[0]);
      expect(targets[1].props("target")).toStrictEqual<GameHistoryRecordPlayTarget>(defaultTargets[1]);
      expect(targets[2].props("target")).toStrictEqual<GameHistoryRecordPlayTarget>(defaultTargets[2]);
      expect(targets[3].props("target")).toStrictEqual<GameHistoryRecordPlayTarget>(defaultTargets[3]);
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
});