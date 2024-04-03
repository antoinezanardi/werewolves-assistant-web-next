import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { GameOverHistoryRecordPhaseProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecordPhase/game-over-history-record-phase.types";
import GameOverHistoryRecordPhase from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecordPhase/GameOverHistoryRecordPhase.vue";
import { createFakeGameHistoryRecord } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Over History Record Phase Component", () => {
  const defaultGameHistoryRecord = createFakeGameHistoryRecord({
    phase: "day",
    turn: 1,
  });
  const defaultProps: GameOverHistoryRecordPhaseProps = { gameHistoryRecord: defaultGameHistoryRecord } as const;
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecordPhase>>;

  async function mountGameOverHistoryRecordPhaseComponent(options: ComponentMountingOptions<typeof GameOverHistoryRecordPhase> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryRecordPhase>>> {
    return mountSuspendedComponent(GameOverHistoryRecordPhase, {
      props: defaultProps,
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryRecordPhaseComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });
});