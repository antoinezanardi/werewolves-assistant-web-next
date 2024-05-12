import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { GameOverHistoryRecordProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/game-over-history-record.types";
import GameOverHistoryRecord from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecord.vue";
import type GameOverHistoryRecordDecision from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecordDecision/GameOverHistoryRecordDecision.vue";
import { createFakeGameHistoryRecordPlayVote } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-vote/game-history-record-play-vote.factory";
import { createFakeGameHistoryRecordPlay } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Over History Record Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecord>>;
  const defaultGameHistoryRecord = createFakeGameHistoryRecord({
    play: createFakeGameHistoryRecordPlay({
      type: "vote",
      action: "vote",
      votes: [createFakeGameHistoryRecordPlayVote()],
    }),
  });
  const defaultProps: GameOverHistoryRecordProps = { gameHistoryRecord: defaultGameHistoryRecord };

  async function mountGameOverHistoryRecordComponent(options: ComponentMountingOptions<typeof GameOverHistoryRecord> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryRecord>>> {
    return mountSuspendedComponent(GameOverHistoryRecord, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryRecordComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Game History Record Decision", () => {
    it("should not display game over history record decision when type is no-action.", async() => {
      wrapper = await mountGameOverHistoryRecordComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "no-action",
              action: "growl",
            }),
          }),
        },
      });
      const gameHistoryRecordDecision = wrapper.findComponent<typeof GameOverHistoryRecordDecision>("#game-over-history-record-decision");

      expect(gameHistoryRecordDecision.exists()).toBeFalsy();
    });

    it("should not display game over history record decision when play is skipped.", async() => {
      wrapper = await mountGameOverHistoryRecordComponent({
        props: {
          gameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              type: "vote",
              action: "vote",
            }),
          }),
        },
      });
      const gameHistoryRecordDecision = wrapper.findComponent<typeof GameOverHistoryRecordDecision>("#game-over-history-record-decision");

      expect(gameHistoryRecordDecision.exists()).toBeFalsy();
    });

    it("should display game over history record decision when type is not no-action and play is not skipped.", () => {
      const gameHistoryRecordDecision = wrapper.findComponent<typeof GameOverHistoryRecordDecision>("#game-over-history-record-decision");

      expect(gameHistoryRecordDecision.exists()).toBeTruthy();
    });
  });
});