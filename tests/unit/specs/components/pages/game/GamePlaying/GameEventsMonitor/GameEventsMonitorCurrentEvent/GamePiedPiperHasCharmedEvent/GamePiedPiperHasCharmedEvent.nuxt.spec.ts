import { createTestingPinia } from "@pinia/testing";
import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeGameHistoryRecordPlayTarget } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-target/game-history-record-play-target.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeSeerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import type { CurrentGameEventProps } from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/game-events-monitor-current-event.types";
import GamePiedPiperHasCharmedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePiedPiperHasCharmedEvent/GamePiedPiperHasCharmedEvent.vue";
import { DEFAULT_GAME_OPTIONS } from "~/composables/api/game/constants/game-options/game-options.constants";
import { useAudioStore } from "~/stores/audio/useAudioStore";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Pied Piper Has Charmed Event Component", () => {
  const defaultCharmedPlayers = [
    createFakeSeerAlivePlayer({ name: "Antoine" }),
    createFakeSeerAlivePlayer({ name: "Baptiste" }),
  ];
  const defaultProps: CurrentGameEventProps = {
    event: createFakeGameEvent({
      type: "pied-piper-has-charmed",
      players: defaultCharmedPlayers,
    }),
  };
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
    options: DEFAULT_GAME_OPTIONS,
  });
  const testingPinia = { initialState: { [StoreIds.GAME]: { game: defaultGame } } };

  async function mountGamePiedPiperHasCharmedEventComponent(options: ComponentMountingOptions<typeof GamePiedPiperHasCharmedEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GamePiedPiperHasCharmedEvent>>> {
    return mountSuspendedComponent(GamePiedPiperHasCharmedEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      props: defaultProps,
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

    it("should pass revealed charmed players when game options says that charmed people are revealed.", async() => {
      const gameStore = useGameStore();
      const gamePiedPiperHasCharmedEventComponent = wrapper.findComponent<typeof GamePiedPiperHasCharmedEvent>("#game-pied-piper-has-charmed-event");
      gameStore.game.options.roles.piedPiper.areCharmedPeopleRevealed = true;
      await nextTick();
      const expectedTexts: string[] = [
        "components.GamePiedPiperHasCharmedEvent.charmedPeopleAreRevealed",
        "components.GamePiedPiperHasCharmedEvent.peopleAreCharmed, {\"charmedPeople\":\"Antoine shared.and Baptiste\"}, 2",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gamePiedPiperHasCharmedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });

    it("should pass empty names charmed players when game options says that charmed people are revealed but there are no players in event.", async() => {
      wrapper = await mountGamePiedPiperHasCharmedEventComponent({ props: { event: createFakeGameEvent() } });
      const gameStore = useGameStore();
      const gamePiedPiperHasCharmedEventComponent = wrapper.findComponent<typeof GamePiedPiperHasCharmedEvent>("#game-pied-piper-has-charmed-event");
      gameStore.game.options.roles.piedPiper.areCharmedPeopleRevealed = true;
      await nextTick();
      const expectedTexts: string[] = [
        "components.GamePiedPiperHasCharmedEvent.charmedPeopleAreRevealed",
        "components.GamePiedPiperHasCharmedEvent.peopleAreCharmed, {\"charmedPeople\":\"\"}, 0",
      ];
      const expectedTextsAsString = expectedTexts.join(",");

      expect(gamePiedPiperHasCharmedEventComponent.attributes("texts")).toBe(expectedTextsAsString);
    });
  });
});