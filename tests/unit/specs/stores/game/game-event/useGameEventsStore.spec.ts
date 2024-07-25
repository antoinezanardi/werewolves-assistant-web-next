import { createFakeGameEvent } from "@tests/unit/utils/factories/composables/api/game/game-event/game-event.factory";
import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { createFakeRolesGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/roles-game-options.factory";
import { createFakeWolfHoundGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/wolf-hound-game-options/wolf-hound-game-options.factory";
import { createPinia, setActivePinia } from "pinia";
import type { GameEvent } from "~/composables/api/game/game-event/game-event.class";
import type { Game } from "~/composables/api/game/types/game.class";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { createFakeGamePlaySheriffDelegates, createFakeGamePlaySurvivorsBuryDeadBodies, createFakeGamePlayWolfHoundChoosesSide } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { useGameStore } from "~/stores/game/useGameStore";

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
    expect(gameEventsStore.currentGameEvent).toBeUndefined();
    expect(gameEventsStore.canGoToPreviousGameEvent).toBeFalsy();
    expect(gameEventsStore.canGoToNextGameEvent).toBeTruthy();
  });

  describe("canGoToPreviousGameEvent", () => {
    it("should return true when can go to previous game event.", () => {
      const gameEventsStore = useGameEventsStore();
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];
      gameEventsStore.currentGameEventIndex = 2;

      expect(gameEventsStore.canGoToPreviousGameEvent).toBeTruthy();
    });

    it("should return false when cannot go to previous game event.", () => {
      const gameEventsStore = useGameEventsStore();
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];

      expect(gameEventsStore.canGoToPreviousGameEvent).toBeFalsy();
    });

    it("should return false when making game play status is pending.", () => {
      hoistedMocks.useGameStore.makingGamePlayStatus = "pending";
      const gameEventsStore = useGameEventsStore();
      const gameStore = useGameStore();
      gameStore.game.events = [
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
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];

      expect(gameEventsStore.canGoToNextGameEvent).toBeTruthy();
    });

    it("should return false when making game play status is pending.", () => {
      hoistedMocks.useGameStore.makingGamePlayStatus = "pending";
      const gameEventsStore = useGameEventsStore();
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];

      expect(gameEventsStore.canGoToNextGameEvent).toBeFalsy();
    });
  });

  describe("resetGameEventIndex", () => {
    it("should reset game event index when called.", () => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.currentGameEventIndex = 2;
      gameEventsStore.resetGameEventIndex();

      expect(gameEventsStore.currentGameEventIndex).toBe(0);
    });
  });

  describe("goToNextGameEvent", () => {
    it("should go to the next game event when called.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySheriffDelegates() });
      const gameEventsStore = useGameEventsStore();
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(gameEventsStore.currentGameEvent).toStrictEqual<GameEvent>(gameStore.game.events[1]);
    });

    it("should go to the next game event when the next current game event is undefined.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySheriffDelegates() });
      const gameEventsStore = useGameEventsStore();
      const gameStore = useGameStore();
      gameStore.game.events = [createFakeGameEvent()];
      await gameEventsStore.goToNextGameEvent();

      expect(gameEventsStore.currentGameEvent).toBeUndefined();
      expect(gameEventsStore.currentGameEventIndex).toBe(1);
    });

    it("should go to the next game event when current game play must be skipped but next event is not game turn start type.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() });
      const gameEventsStore = useGameEventsStore();
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent(),
        createFakeGameEvent({ type: "game-phase-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(gameEventsStore.currentGameEventIndex).toBe(1);
    });

    it("should not go to the next game event when the next current game event is game turn starts and must current game play be skipped.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() });
      const gameEventsStore = useGameEventsStore();
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "game-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(gameEventsStore.currentGameEvent).toStrictEqual<GameEvent>(gameStore.game.events[0]);
    });

    it("should not skip current game play when the next current game event is game turn starts but current action is not bury dead bodies.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({
        currentPlay: createFakeGamePlayWolfHoundChoosesSide(),
        options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ wolfHound: createFakeWolfHoundGameOptions({ isSideRandomlyChosen: true }) }) }),
      });
      const gameEventsStore = useGameEventsStore();
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "game-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(hoistedMocks.useGameStore.skipGamePlay).not.toHaveBeenCalled();
    });

    it("should skip current game play when the next current game event is game turn starts and must current game play be skipped.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() });
      const gameEventsStore = useGameEventsStore();
      const gameStore = useGameStore();
      gameStore.game.events = [
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
      const gameStore = useGameStore();
      gameEventsStore.currentGameEventIndex = 1;
      gameStore.game.events = [
        createFakeGameEvent({ type: "game-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(hoistedMocks.useGameStore.skipGamePlay).toHaveBeenCalledExactlyOnceWith();
    });

    it("should set current game event index to 0 when skipping current game play.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() });
      const gameEventsStore = useGameEventsStore();
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "game-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(gameEventsStore.currentGameEventIndex).toBe(0);
    });

    it("should not increment current game event index when game events are undefined in game.", async() => {
      hoistedMocks.useGameStore.game = createFakeGame({ currentPlay: createFakeGamePlaySheriffDelegates() });
      const gameEventsStore = useGameEventsStore();
      const gameStore = useGameStore();
      gameStore.game.events = undefined;
      await gameEventsStore.goToNextGameEvent();

      expect(gameEventsStore.currentGameEventIndex).toBe(0);
    });
  });

  describe("goToPreviousGameEvent", () => {
    it("should go to the previous game event when called.", async() => {
      const gameEventsStore = useGameEventsStore();
      const gameStore = useGameStore();
      gameStore.game.events = [
        createFakeGameEvent({ type: "game-starts" }),
        createFakeGameEvent({ type: "game-phase-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();
      await gameEventsStore.goToNextGameEvent();
      gameEventsStore.goToPreviousGameEvent();

      expect(gameEventsStore.currentGameEvent).toStrictEqual<GameEvent>(gameStore.game.events[1]);
    });
  });
});