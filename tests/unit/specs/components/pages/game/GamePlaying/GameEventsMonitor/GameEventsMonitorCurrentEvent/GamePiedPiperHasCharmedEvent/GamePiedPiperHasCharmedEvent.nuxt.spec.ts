import { createTestingPinia } from "@pinia/testing";
import { createFakeGameHistoryRecordPlayTarget } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { mount } from "@vue/test-utils";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GamePiedPiperHasCharmedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePiedPiperHasCharmedEvent/GamePiedPiperHasCharmedEvent.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";

describe("Game Pied Piper Has Charmed Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GamePiedPiperHasCharmedEvent>>;
  const defaultGame = createFakeGame({
    lastGameHistoryRecord: createFakeGameHistoryRecord({
      play: createFakeGameHistoryRecordPlay({
        targets: [
          createFakeGameHistoryRecordPlayTarget({ player: createFakeSeerAlivePlayer({ name: "Antoine" }) }),
          createFakeGameHistoryRecordPlayTarget({ player: createFakeSeerAlivePlayer({ name: "Baptiste" }) }),
        ],
      }),
    }),
  });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGamePiedPiperHasCharmedEventComponent(options: ComponentMountingOptions<typeof GamePiedPiperHasCharmedEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GamePiedPiperHasCharmedEvent>>> {
    return mountSuspendedComponent(GamePiedPiperHasCharmedEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGamePiedPiperHasCharmedEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGamePiedPiperHasCharmedEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should play pan flute sound effect when rendered.", () => {
    const audioStore = useAudioStore();

    expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("pan-flute");
  });

  describe("Game Event Texts", () => {
    it("should pass default event texts when rendered.", () => {
      const gamePiedPiperHasCharmedEventComponent = wrapper.findComponent<typeof GamePiedPiperHasCharmedEvent>("#game-pied-piper-has-charmed-event");
      const expectedTexts: string[] = [
        "components.GamePiedPiperHasCharmedEvent.piedPiperHasCharmed, {\"charmedCount\":2}, 2",
        "components.GamePiedPiperHasCharmedEvent.gameMasterWillTapCharmedPlayers, {\"charmedCount\":2}, 2",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gamePiedPiperHasCharmedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});