import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";

import type GameOverHistoryRecord from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecord/GameOverHistoryRecord.vue";
import type GameOverHistoryRecordPhase from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecordPhase/GameOverHistoryRecordPhase.vue";
import GameOverHistoryRecords from "~/components/pages/game/GameOver/GameOverHistory/GameOverHistoryRecords/GameOverHistoryRecords.vue";
import type { GameHistoryRecord } from "~/composables/api/game/types/game-history-record/game-history-record.class";
import { StoreIds } from "~/stores/enums/store.enum";
import { createFakeGameHistoryRecord } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Over History Records Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameOverHistoryRecords>>;
  const gameHistoryRecords = [
    createFakeGameHistoryRecord(),
    createFakeGameHistoryRecord(),
    createFakeGameHistoryRecord(),
  ];
  const testingPinia = { initialState: { [StoreIds.GAME_HISTORY_RECORDS]: { gameHistoryRecords } } };

  async function mountGameOverHistoryRecordsComponent(options: ComponentMountingOptions<typeof GameOverHistoryRecords> = {}):
  Promise<ReturnType<typeof mount<typeof GameOverHistoryRecords>>> {
    return mountSuspendedComponent(GameOverHistoryRecords, {
      shallow: false,
      global: {
        plugins: [createTestingPinia(testingPinia)],
        stubs: {
          GameOverHistoryRecordPhase: true,
          GameOverHistoryRecord: true,
        },
      },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameOverHistoryRecordsComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Timeline", () => {
    it("should render game history records from store in record for each when rendered.", () => {
      const records = wrapper.findAllComponents<typeof GameOverHistoryRecord>(".game-over-history-record");

      expect(records).toHaveLength(gameHistoryRecords.length);
      expect(records[0].props("gameHistoryRecord")).toStrictEqual<GameHistoryRecord>(gameHistoryRecords[0]);
      expect(records[1].props("gameHistoryRecord")).toStrictEqual<GameHistoryRecord>(gameHistoryRecords[1]);
      expect(records[2].props("gameHistoryRecord")).toStrictEqual<GameHistoryRecord>(gameHistoryRecords[2]);
    });

    it("should render game history records from stores in phase for each when rendered.", () => {
      const phases = wrapper.findAllComponents<typeof GameOverHistoryRecordPhase>(".game-over-history-record-phase");

      expect(phases).toHaveLength(gameHistoryRecords.length);
      expect(phases[0].props("gameHistoryRecord")).toStrictEqual<GameHistoryRecord>(gameHistoryRecords[0]);
      expect(phases[1].props("gameHistoryRecord")).toStrictEqual<GameHistoryRecord>(gameHistoryRecords[1]);
      expect(phases[2].props("gameHistoryRecord")).toStrictEqual<GameHistoryRecord>(gameHistoryRecords[2]);
    });
  });
});