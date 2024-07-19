import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { createFakeRolesGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/roles-game-options.factory";
import { createFakeWolfHoundGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/wolf-hound-game-options/wolf-hound-game-options.factory";
import { createPinia, setActivePinia } from "pinia";
import type { Game } from "~/composables/api/game/types/game.class";
import type { GameEvent } from "~/stores/game/game-event/types/game-event.class";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { createFakeGamePlaySheriffDelegates, createFakeGamePlaySurvivorsBuryDeadBodies, createFakeGamePlayWolfHoundChoosesSide } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeGameEvent } from "@tests/unit/utils/factories/stores/game/game-event/game-event.factory";

const hoistedMocks = vi.hoisted(() => ({
  useGameStore: {
    game: {} as Game,
    makingGamePlayStatus: "idle",
    skipGamePlay: vi.fn(),
  },
  useGameEventsGenerator: {
    generateGameEventsFromGame: vi.fn(),
  },
}));

vi.mock("~/stores/game/useGameStore", () => ({
  useGameStore: (): typeof hoistedMocks.useGameStore => hoistedMocks.useGameStore,
}));

vi.mock("~/composables/api/game/game-event/useGameEventsGenerator", () => ({
  useGameEventsGenerator: (): typeof hoistedMocks.useGameEventsGenerator => hoistedMocks.useGameEventsGenerator,
}));

describe("Game Events Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    hoistedMocks.useGameStore = {
      game: createFakeGame(),
      makingGamePlayStatus: "idle",
      skipGamePlay: vi.fn(),
    };
  });

  it("should have initial state when created.", () => {
    const gameEventsStore = useGameEventsStore();
    const expectedGameEvents: GameEvent[] = [];

    expect(gameEventsStore.gameEvents).toStrictEqual<GameEvent[]>(expectedGameEvents);
    expect(gameEventsStore.currentGameEvent).toBeUndefined();
    expect(gameEventsStore.canGoToPreviousGameEvent).toBeFalsy();
    expect(gameEventsStore.canGoToNextGameEvent).toBeTruthy();
  });

  describe("canGoToPreviousGameEvent", () => {
    it("should return true when can go to previous game event.", () => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];
      gameEventsStore.currentGameEventIndex = 2;

      expect(gameEventsStore.canGoToPreviousGameEvent).toBeTruthy();
    });

    it("should return false when cannot go to previous game event.", () => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];

      expect(gameEventsStore.canGoToPreviousGameEvent).toBeFalsy();
    });

    it("should return false when making game play status is pending.", () => {
      hoistedMocks.useGameStore.makingGamePlayStatus = "pending";
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];
      gameEventsStore.currentGameEventIndex = 2;

      expect(gameEventsStore.canGoToPreviousGameEvent).toBeFalsy();
    });
  });

  describe("canGoToNextGameEvent", () => {
    it("should return true when can go to next game event.", () => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];

      expect(gameEventsStore.canGoToNextGameEvent).toBeTruthy();
    });

    it("should return false when making game play status is pending.", () => {
      hoistedMocks.useGameStore.makingGamePlayStatus = "pending";
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];

      expect(gameEventsStore.canGoToNextGameEvent).toBeFalsy();
    });
  });

  describe("resetGameEvents", () => {
    it("should reset game events when called.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];
      await gameEventsStore.goToNextGameEvent();
      gameEventsStore.resetGameEvents();

      expect(gameEventsStore.gameEvents).toStrictEqual<GameEvent[]>([]);
      expect(gameEventsStore.currentGameEvent).toBeUndefined();
    });
  });

  describe("generateAndSetGameEventsFromGame", () => {
    it("should generate game events from game when called.", () => {
      const game = createFakeGame();
      const gameEvents = [createFakeGameEvent(), createFakeGameEvent()];
      hoistedMocks.useGameEventsGenerator.generateGameEventsFromGame.mockReturnValue(gameEvents);
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.generateAndSetGameEventsFromGame(game);

      expect(hoistedMocks.useGameEventsGenerator.generateGameEventsFromGame).toHaveBeenCalledExactlyOnceWith(game);
    });
  });

  describe("goToNextGameEvent", () => {
    it("should go to the next game event when called.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySheriffDelegates() });
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(gameEventsStore.currentGameEvent).toStrictEqual<GameEvent>(gameEventsStore.gameEvents[1]);
    });

    it("should go to the next game event when the next current game event is undefined.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySheriffDelegates() });
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [createFakeGameEvent()];
      await gameEventsStore.goToNextGameEvent();

      expect(gameEventsStore.currentGameEvent).toBeUndefined();
      expect(gameEventsStore.currentGameEventIndex).toBe(1);
    });

    it("should go to the next game event when current game play must be skipped but next event is not game turn start type.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() });
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent({ type: "game-phase-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(gameEventsStore.currentGameEventIndex).toBe(1);
    });

    it("should not go to the next game event when the next current game event is game turn starts and must current game play be skipped.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() });
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "game-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(gameEventsStore.currentGameEvent).toStrictEqual<GameEvent>(gameEventsStore.gameEvents[0]);
    });

    it("should not skip current game play when the next current game event is game turn starts but current action is not bury dead bodies.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({
        currentPlay: createFakeGamePlayWolfHoundChoosesSide(),
        options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ wolfHound: createFakeWolfHoundGameOptions({ isSideRandomlyChosen: true }) }) }),
      });
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "game-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(hoistedMocks.useGameStore.skipGamePlay).not.toHaveBeenCalled();
    });

    it("should skip current game play when the next current game event is game turn starts and must current game play be skipped.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() });
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "game-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(hoistedMocks.useGameStore.skipGamePlay).toHaveBeenCalledExactlyOnceWith();
    });

    it("should skip current game play when it's the last game event and must current game play be skipped.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({
        currentPlay: createFakeGamePlayWolfHoundChoosesSide(),
        options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ wolfHound: createFakeWolfHoundGameOptions({ isSideRandomlyChosen: true }) }) }),
      });
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.currentGameEventIndex = 1;
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "game-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(hoistedMocks.useGameStore.skipGamePlay).toHaveBeenCalledExactlyOnceWith();
    });

    it("should set current game event index to 0 when skipping current game play.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() });
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "game-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(gameEventsStore.currentGameEventIndex).toBe(0);
    });
  });

  describe("goToPreviousGameEvent", () => {
    it("should go to the previous game event when called.", async() => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "game-starts" }),
        createFakeGameEvent({ type: "game-phase-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();
      await gameEventsStore.goToNextGameEvent();
      gameEventsStore.goToPreviousGameEvent();

      expect(gameEventsStore.currentGameEvent).toStrictEqual<GameEvent>(gameEventsStore.gameEvents[1]);
    });
  });
});