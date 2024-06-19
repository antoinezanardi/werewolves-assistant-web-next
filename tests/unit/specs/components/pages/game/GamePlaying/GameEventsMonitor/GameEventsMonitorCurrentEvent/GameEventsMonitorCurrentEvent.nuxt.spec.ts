import { createTestingPinia } from "@pinia/testing";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameAccursedWolfFatherMayHaveInfectedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameAccursedWolfFatherMayHaveInfectedEvent/GameAccursedWolfFatherMayHaveInfectedEvent.vue";
import GameEventsMonitorCurrentEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameEventsMonitorCurrentEvent.vue";
import GamePhaseStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePhaseStartsEvent/GamePhaseStartsEvent.vue";
import GamePlayerDiesEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePlayerDiesEvent/GamePlayerDiesEvent.vue";
import GameScandalmongerHasMarkedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameScandalmongerHasMarkedEvent/GameScandalmongerHasMarkedEvent.vue";
import GameSeerHasSeenEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameSeerHasSeenEvent/GameSeerHasSeenEvent.vue";
import GameSheriffHasBeenElectedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameSheriffPromotionEvent/GameSheriffPromotionEvent.vue";
import GameStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameStartsEvent/GameStartsEvent.vue";
import GameTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameTurnStartsEvent.vue";
import GameVillagerVillagerIntroductionEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameVillagerVillagerIntroductionEvent/GameVillagerVillagerIntroductionEvent.vue";
import { StoreIds } from "~/stores/enums/store.enum";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { createFakeGameEvent } from "@tests/unit/utils/factories/stores/game/game-event/game-event.factory";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";

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

    it("should render seer has seen event component when current game event is seer has seen type.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "seer-has-seen" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gameSeerHasSeenEvent = wrapper.findComponent<typeof GameSeerHasSeenEvent>(GameSeerHasSeenEvent);

      expect(gameSeerHasSeenEvent.exists()).toBeTruthy();
    });

    it("should render sheriff has been elected event component when current game event is sheriff has been elected type.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "sheriff-promotion" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gameSheriffHasBeenElectedEvent = wrapper.findComponent<typeof GameSheriffHasBeenElectedEvent>(GameSheriffHasBeenElectedEvent);

      expect(gameSheriffHasBeenElectedEvent.exists()).toBeTruthy();
    });

    it("should render scandalmonger has marked event component when current game event is scandalmonger has marked type.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "scandalmonger-has-marked" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gameScandalmongerHasMarkedEvent = wrapper.findComponent<typeof GameScandalmongerHasMarkedEvent>(GameScandalmongerHasMarkedEvent);

      expect(gameScandalmongerHasMarkedEvent.exists()).toBeTruthy();
    });

    it("should render accursed wolf father may have infected event component when current game event is accursed wolf father may have infected type.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "accursed-wolf-father-may-have-infected" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gameAccursedWolfFatherMayHaveInfectedEvent = wrapper.findComponent<typeof GameAccursedWolfFatherMayHaveInfectedEvent>(GameAccursedWolfFatherMayHaveInfectedEvent);

      expect(gameAccursedWolfFatherMayHaveInfectedEvent.exists()).toBeTruthy();
    });

    it("should render villager villager introduction event component when current game event is villager villager introduction type.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "villager-villager-introduction" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gameVillagerVillagerIntroductionEvent = wrapper.findComponent<typeof GameVillagerVillagerIntroductionEvent>(GameVillagerVillagerIntroductionEvent);

      expect(gameVillagerVillagerIntroductionEvent.exists()).toBeTruthy();
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