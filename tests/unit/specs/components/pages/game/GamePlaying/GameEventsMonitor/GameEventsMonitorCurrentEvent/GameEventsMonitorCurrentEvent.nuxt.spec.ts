import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameEventsMonitorCurrentEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameEventsMonitorCurrentEvent.vue";
import GamePhaseStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePhaseStartsEvent/GamePhaseStartsEvent.vue";
import GamePlayerDiesEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePlayerDiesEvent/GamePlayerDiesEvent.vue";
import GameStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameStartsEvent/GameStartsEvent.vue";
import GameTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameTurnStartsEvent.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { createFakeGameEvent } from "~/tests/unit/utils/factories/stores/game/game-event/game-event.factory";

import { mountSuspendedComponent } from "~/tests/unit/utils/helpers/mount.helpers";

describe("Game Events Monitor Current Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameEventsMonitorCurrentEvent>>;
  const testingPinia = {
    initialState: {
      [StoreIds.GAME_EVENTS]: {
        gameEvents: [
          createFakeGameEvent({ type: "game-starts" }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
      },
    },
  };

  async function mountGameEventsMonitorCurrentEventComponent(options: ComponentMountingOptions<typeof GameEventsMonitorCurrentEvent> = {}):
  Promise<ReturnType<typeof mount<typeof GameEventsMonitorCurrentEvent>>> {
    return mountSuspendedComponent(GameEventsMonitorCurrentEvent, {
      global: { plugins: [createTestingPinia(testingPinia)] },
      ...options,
    });
  }

  beforeEach(async() => {
    wrapper = await mountGameEventsMonitorCurrentEventComponent();
  });

  it("should match snapshot when rendered.", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe("Current Game Event Component", () => {
    it("should render game starts event component when current game event is game starts type.", () => {
      const gameStartsEvent = wrapper.findComponent<typeof GameStartsEvent>(GameStartsEvent);

      expect(gameStartsEvent.exists()).toBeTruthy();
    });

    it("should render game turn starts event component when current game event is game turn starts type.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "game-turn-starts" }),
        createFakeGameEvent({ type: "game-phase-starts" }),
      ];
      await nextTick();
      const gameTurnStartsEvent = wrapper.findComponent<typeof GameTurnStartsEvent>(GameTurnStartsEvent);

      expect(gameTurnStartsEvent.exists()).toBeTruthy();
    });

    it("should render game phase starts event component when current game event is game phase starts type.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "game-phase-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gamePhaseStartsEvent = wrapper.findComponent<typeof GamePhaseStartsEvent>(GamePhaseStartsEvent);

      expect(gamePhaseStartsEvent.exists()).toBeTruthy();
    });

    it("should render player dies event component when current game event is player dies type.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "player-dies" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const playerDiesEvent = wrapper.findComponent<typeof GamePlayerDiesEvent>(GamePlayerDiesEvent);

      expect(playerDiesEvent.exists()).toBeTruthy();
    });

    it("should not render any game event component when there is no current game event.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [];
      await nextTick();
      const gameStartsEvent = wrapper.findComponent<typeof GameStartsEvent>(GameStartsEvent);
      const gameTurnStartsEvent = wrapper.findComponent<typeof GameTurnStartsEvent>(GameTurnStartsEvent);
      const gamePhaseStartsEvent = wrapper.findComponent<typeof GamePhaseStartsEvent>(GamePhaseStartsEvent);

      expect(gameStartsEvent.exists()).toBeFalsy();
      expect(gameTurnStartsEvent.exists()).toBeFalsy();
      expect(gamePhaseStartsEvent.exists()).toBeFalsy();
    });
  });
});