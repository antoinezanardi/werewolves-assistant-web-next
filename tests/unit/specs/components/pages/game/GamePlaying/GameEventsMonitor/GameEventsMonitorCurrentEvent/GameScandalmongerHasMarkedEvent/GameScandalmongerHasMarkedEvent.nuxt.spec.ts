import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameScandalmongerHasMarkedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameScandalmongerHasMarkedEvent/GameScandalmongerHasMarkedEvent.vue";
import type GameEventFlippingLastPlayTargetsCard from "~/components/shared/game/game-event/GameEventFlippingPlayerCard/GameEventFlippingLastPlayTargetsCard/GameEventFlippingLastPlayTargetsCard.vue";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";
import { createFakeGameHistoryRecordPlayTarget } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeGameHistoryRecordPlay } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Scandalmonger Has Marked Event Component", () => {
  const defaultGame = createFakeGame();
  let wrapper: ReturnType<typeof mount<typeof GameScandalmongerHasMarkedEvent>>;
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGameScandalmongerHasMarkedEventComponent(options: ComponentMountingOptions<typeof GameScandalmongerHasMarkedEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameScandalmongerHasMarkedEvent>>> {
    return mountSuspendedComponent(GameScandalmongerHasMarkedEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameScandalmongerHasMarkedEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should match snapshot when rendered without shallow rendering.", async() => {
    wrapper = await mountGameScandalmongerHasMarkedEventComponent({ shallow: false });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Sound Effect", () => {
    it("should play raven flying sound effect when scandalmonger didn't mark anyone.", () => {
      const audioStore = useAudioStore();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("raven-flying-away");
    });

    it("should play raven cry sound effect when scandalmonger marked someone.", async() => {
      const targets = [
        createFakeGameHistoryRecordPlayTarget(),
        createFakeGameHistoryRecordPlayTarget(),
      ];
      const game = createFakeGame({ lastGameHistoryRecord: createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ targets }) }) });
      wrapper = await mountGameScandalmongerHasMarkedEventComponent({ global: { plugins: [createTestingPinia({ initialState: { [StoreIds.GAME]: { game } } })] } });
      const audioStore = useAudioStore();
      await nextTick();

      expect(audioStore.playSoundEffect).toHaveBeenCalledExactlyOnceWith("raven-cry");
    });
  });

  describe("Game Event Texts", () => {
    it("should pass raven didn't mark anyone texts when scandalmonger didn't mark anyone.", () => {
      const gameScandalmongerHasMarkedEventComponent = wrapper.findComponent<typeof GameScandalmongerHasMarkedEvent>("#game-scandalmonger-has-marked-event");
      const expectedTexts: string[] = ["components.GameScandalmongerHasMarkedEvent.scandalMongerDidntMarkAnyone"];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameScandalmongerHasMarkedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass raven marked someone texts when scandalmonger marked someone.", async() => {
      const targets = [
        createFakeGameHistoryRecordPlayTarget(),
        createFakeGameHistoryRecordPlayTarget(),
      ];
      const game = createFakeGame({ lastGameHistoryRecord: createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ targets }) }) });
      wrapper = await mountGameScandalmongerHasMarkedEventComponent({ global: { plugins: [createTestingPinia({ initialState: { [StoreIds.GAME]: { game } } })] } });
      const gameScandalmongerHasMarkedEventComponent = wrapper.findComponent<typeof GameScandalmongerHasMarkedEvent>("#game-scandalmonger-has-marked-event");
      const expectedTexts: string[] = [
        "components.GameScandalmongerHasMarkedEvent.scandalmongerHasMarkedAPlayer",
        "components.GameScandalmongerHasMarkedEvent.gameMasterWillPutScandalmongerMark",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gameScandalmongerHasMarkedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    describe("Event Flipping Last Play Targets Card", () => {
      beforeEach(async() => {
        wrapper = await mountGameScandalmongerHasMarkedEventComponent({
          global: {
            plugins: [createTestingPinia(testingPinia)],
            stubs: { GameEventWithTexts: false },
          },
        });
      });

      it("should not pass svg icon path when scandalmonger didn't mark anyone.", () => {
        const gameScandalmongerHasMarkedEventComponent = wrapper.findComponent<typeof GameEventFlippingLastPlayTargetsCard>("#game-event-flipping-last-play-targets-card");

        expect(gameScandalmongerHasMarkedEventComponent.props("svgIconPath")).toBeUndefined();
      });

      it("should pass svg icon path when scandalmonger marked someone.", async() => {
        const targets = [
          createFakeGameHistoryRecordPlayTarget(),
          createFakeGameHistoryRecordPlayTarget(),
        ];
        const gameStore = useGameStore();
        gameStore.game = createFakeGame({ lastGameHistoryRecord: createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ targets }) }) });
        await nextTick();
        const gameScandalmongerHasMarkedEventComponent = wrapper.findComponent<typeof GameEventFlippingLastPlayTargetsCard>("#game-event-flipping-last-play-targets-card");

        expect(gameScandalmongerHasMarkedEventComponent.props("svgIconPath")).toBe("/svg/game/player/player-attribute/scandalmonger-marked.svg");
      });
    });
  });
});