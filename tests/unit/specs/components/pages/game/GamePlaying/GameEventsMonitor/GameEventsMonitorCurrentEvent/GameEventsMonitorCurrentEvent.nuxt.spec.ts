import { createTestingPinia } from "@pinia/testing";
import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import type { mount } from "@vue/test-utils";
import type { ComponentMountingOptions } from "@vue/test-utils/dist/mount";
import GameAccursedWolfFatherMayHaveInfectedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameAccursedWolfFatherMayHaveInfectedEvent/GameAccursedWolfFatherMayHaveInfectedEvent.vue";
import GameActorMayHaveChosenCardEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameActorMayHaveChosenCardEvent/GameActorMayHaveChosenCardEvent.vue";
import GameBearGrowlsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameBearGrowlsEvent/GameBearGrowlsEvent.vue";
import GameBearSleepsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameBearSleepsEvent/GameBearSleepsEvent.vue";
import GameCupidHasCharmedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameCupidHasCharmedEvent/GameCupidHasCharmedEvent.vue";
import GameElderHasTakenRevengeEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameElderHasTakenRevengeEvent/GameElderHasTakenRevengeEvent.vue";
import GameEventsMonitorCurrentEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameEventsMonitorCurrentEvent.vue";
import GameFoxMayHaveSniffedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameFoxMayHaveSniffedEvent/GameFoxMayHaveSniffedEvent.vue";
import GameIdiotIsSparedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameIdiotIsSparedEvent/GameIdiotIsSparedEvent.vue";
import GamePhaseStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePhaseStartsEvent/GamePhaseStartsEvent.vue";
import GamePiedPiperHasCharmedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GamePiedPiperHasCharmedEvent/GamePiedPiperHasCharmedEvent.vue";
import GamePlayerDiesEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameDeathEvent/GameDeathEvent.vue";
import GameScandalmongerMarkIsActiveEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameScandalmongerMarkIsActiveEvent/GameScandalmongerMarkIsActiveEvent.vue";
import GameScandalmongerMayHaveMarkedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameScandalmongerMayHaveMarkedEvent/GameScandalmongerMayHaveMarkedEvent.vue";
import GameSeerHasSeenEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameSeerHasSeenEvent/GameSeerHasSeenEvent.vue";
import GameSheriffHasBeenElectedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameSheriffPromotionEvent/GameSheriffPromotionEvent.vue";
import GameStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameStartsEvent/GameStartsEvent.vue";
import GameThiefMayHaveChosenCardEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameThiefMayHaveChosenCardEvent/GameThiefMayHaveChosenCardEvent.vue";
import GameTurnStartsEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameTurnStartsEvent/GameTurnStartsEvent.vue";
import GameVillagerVillagerIntroductionEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameVillagerVillagerIntroductionEvent/GameVillagerVillagerIntroductionEvent.vue";
import GameWildChildHasTransformedEvent from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameWildChildHasTransformedEvent/GameWildChildHasTransformedEvent.vue";
import GameWolfHoundHasChosenSide from "~/components/pages/game/GamePlaying/GameEventsMonitor/GameEventsMonitorCurrentEvent/GameWolfHoundHasChosenSideEvent/GameWolfHoundHasChosenSideEvent.vue";
import { StoreIds } from "~/stores/enums/store.enum";

import { mountSuspendedComponent } from "@tests/unit/utils/helpers/mount.helpers";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { useGameStore } from "~/stores/game/useGameStore";

describe("Game Events Monitor Current Event Component", () => {
  let wrapper: ReturnType<typeof mount<typeof GameEventsMonitorCurrentEvent>>;
  const defaultGame = createFakeGame({
    events: [
      createFakeGameEvent({ type: "game-starts" }),
      createFakeGameEvent({ type: "game-turn-starts" }),
    ],
  });
  const testingPinia = {
    initialState: {
      [StoreIds.GAME]: {
        game: defaultGame,
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
    const gameStore = useGameStore();
    gameStore.game = createFakeGame(defaultGame);
    const gameEventsStore = useGameEventsStore();
    gameEventsStore.currentGameEventIndex = 0;
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
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "game-turn-starts" }),
        createFakeGameEvent({ type: "game-phase-starts" }),
      ];
      await nextTick();
      const gameTurnStartsEvent = wrapper.findComponent<typeof GameTurnStartsEvent>(GameTurnStartsEvent);

      expect(gameTurnStartsEvent.exists()).toBeTruthy();
    });

    it("should render game phase starts event component when current game event is game phase starts type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "game-phase-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gamePhaseStartsEvent = wrapper.findComponent<typeof GamePhaseStartsEvent>(GamePhaseStartsEvent);

      expect(gamePhaseStartsEvent.exists()).toBeTruthy();
    });

    it("should render player dies event component when current game event is player dies type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "death" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const playerDiesEvent = wrapper.findComponent<typeof GamePlayerDiesEvent>(GamePlayerDiesEvent);

      expect(playerDiesEvent.exists()).toBeTruthy();
    });

    it("should render seer has seen event component when current game event is seer has seen type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "seer-has-seen" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gameSeerHasSeenEvent = wrapper.findComponent<typeof GameSeerHasSeenEvent>(GameSeerHasSeenEvent);

      expect(gameSeerHasSeenEvent.exists()).toBeTruthy();
    });

    it("should render sheriff has been elected event component when current game event is sheriff has been elected type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "sheriff-promotion" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gameSheriffHasBeenElectedEvent = wrapper.findComponent<typeof GameSheriffHasBeenElectedEvent>(GameSheriffHasBeenElectedEvent);

      expect(gameSheriffHasBeenElectedEvent.exists()).toBeTruthy();
    });

    it("should render scandalmonger has marked event component when current game event is scandalmonger has marked type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "scandalmonger-may-have-marked" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gameScandalmongerHasMarkedEvent = wrapper.findComponent<typeof GameScandalmongerMayHaveMarkedEvent>(GameScandalmongerMayHaveMarkedEvent);

      expect(gameScandalmongerHasMarkedEvent.exists()).toBeTruthy();
    });

    it("should render accursed wolf father may have infected event component when current game event is accursed wolf father may have infected type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "accursed-wolf-father-may-have-infected" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gameAccursedWolfFatherMayHaveInfectedEvent = wrapper.findComponent<typeof GameAccursedWolfFatherMayHaveInfectedEvent>(GameAccursedWolfFatherMayHaveInfectedEvent);

      expect(gameAccursedWolfFatherMayHaveInfectedEvent.exists()).toBeTruthy();
    });

    it("should render villager villager introduction event component when current game event is villager villager introduction type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "villager-villager-introduction" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gameVillagerVillagerIntroductionEvent = wrapper.findComponent<typeof GameVillagerVillagerIntroductionEvent>(GameVillagerVillagerIntroductionEvent);

      expect(gameVillagerVillagerIntroductionEvent.exists()).toBeTruthy();
    });

    it("should render pied piper has charmed event component when current game event is pied piper has charmed type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "pied-piper-has-charmed" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gamePiedPiperHasCharmedEvent = wrapper.findComponent<typeof GamePiedPiperHasCharmedEvent>(GamePiedPiperHasCharmedEvent);

      expect(gamePiedPiperHasCharmedEvent.exists()).toBeTruthy();
    });

    it("should render cupid has charmed event component when current game event is cupid has charmed type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "cupid-has-charmed" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gamePiedPiperHasCharmedEvent = wrapper.findComponent<typeof GameCupidHasCharmedEvent>(GameCupidHasCharmedEvent);

      expect(gamePiedPiperHasCharmedEvent.exists()).toBeTruthy();
    });

    it("should render wolf hound has chosen side event component when current game event is wolf hound has chosen side type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "wolf-hound-has-chosen-side" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gameWolfHoundHasChosenSideEvent = wrapper.findComponent<typeof GameWolfHoundHasChosenSide>(GameWolfHoundHasChosenSide);

      expect(gameWolfHoundHasChosenSideEvent.exists()).toBeTruthy();
    });

    it("should render idiot is spared event component when current game event is idiot is spared type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "idiot-is-spared" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gameIdiotIsSparedEvent = wrapper.findComponent<typeof GameIdiotIsSparedEvent>(GameIdiotIsSparedEvent);

      expect(gameIdiotIsSparedEvent.exists()).toBeTruthy();
    });

    it("should render elder has taken revenge event component when current game event is elder has taken revenge type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "elder-has-taken-revenge" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gameElderHasTakenRevengeEvent = wrapper.findComponent<typeof GameElderHasTakenRevengeEvent>(GameElderHasTakenRevengeEvent);

      expect(gameElderHasTakenRevengeEvent.exists()).toBeTruthy();
    });

    it("should render bear growls event component when current game event is bear growls type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "bear-growls" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gameBearGrowlsEvent = wrapper.findComponent<typeof GameBearGrowlsEvent>(GameBearGrowlsEvent);

      expect(gameBearGrowlsEvent.exists()).toBeTruthy();
    });

    it("should render bear sleeps event component when current game event is bear sleeps type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "bear-sleeps" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const gameBearSleepsEvent = wrapper.findComponent<typeof GameBearSleepsEvent>(GameBearSleepsEvent);

      expect(gameBearSleepsEvent.exists()).toBeTruthy();
    });

    it("should render fox may have sniffed event component when current game event is fox may have sniffed type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "fox-may-have-sniffed" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const foxEvent = wrapper.findComponent<typeof GameFoxMayHaveSniffedEvent>(GameFoxMayHaveSniffedEvent);

      expect(foxEvent.exists()).toBeTruthy();
    });

    it("should render thief may have chosen card event component when current game event is thief may have chosen card type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "thief-may-have-chosen-card" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const thiefEvent = wrapper.findComponent<typeof GameThiefMayHaveChosenCardEvent>(GameThiefMayHaveChosenCardEvent);

      expect(thiefEvent.exists()).toBeTruthy();
    });

    it("should render wild child has transformed event component when current game event is wild child has transformed type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "wild-child-has-transformed" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const wildChildEvent = wrapper.findComponent<typeof GameWildChildHasTransformedEvent>(GameWildChildHasTransformedEvent);

      expect(wildChildEvent.exists()).toBeTruthy();
    });

    it("should render actor may have chosen card event component when current game event is actor may have chosen card type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "actor-may-have-chosen-card" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const actorEvent = wrapper.findComponent<typeof GameActorMayHaveChosenCardEvent>(GameActorMayHaveChosenCardEvent);

      expect(actorEvent.exists()).toBeTruthy();
    });

    it("should render scandalmonger mark is active event component when current game event is scandalmonger mark is active type.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "scandalmonger-mark-is-active" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await nextTick();
      const scandalmongerEvent = wrapper.findComponent<typeof GameScandalmongerMarkIsActiveEvent>(GameScandalmongerMarkIsActiveEvent);

      expect(scandalmongerEvent.exists()).toBeTruthy();
    });

    it("should not render any game event component when there is no current game event.", async() => {
      const gameStore = useGameStore();
      gameStore.game.events = [];
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