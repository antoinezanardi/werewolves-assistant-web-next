import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type { GameOverHistoryRecordProps } from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/game-over-history-record.types";
import GameOverHistoryRecord from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecord.vue";
import { createFakeGameHistoryRecord } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Over History Record Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecord>>;
  const defaultGameHistoryRecord = createFakeGameHistoryRecord();
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
});