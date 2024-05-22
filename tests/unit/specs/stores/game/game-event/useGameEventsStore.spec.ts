import { createPinia, setActivePinia } from "pinia";
import type { Game } from "~/composables/api/game/types/game.class";
import type { GameEvent } from "~/stores/game/game-event/types/game-event.class";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import { createFakeGamePhase } from "~/tests/unit/utils/factories/composables/api/game/game-phase/game-phase.factory";
import { createFakeGame } from "~/tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakeGameEvent } from "~/tests/unit/utils/factories/stores/game/game-event/game-event.factory";

describe("Game Events Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should have initial state when created.", () => {
    const gameEventsStore = useGameEventsStore();
    const expectedGameEvents: GameEvent[] = [];

    expect(gameEventsStore.gameEvents).toStrictEqual<GameEvent[]>(expectedGameEvents);
    expect(gameEventsStore.currentGameEvent).toBeUndefined();
    expect(gameEventsStore.canGoToNextGameEvent).toBeFalsy();
    expect(gameEventsStore.canGoToPreviousGameEvent).toBeFalsy();
  });

  describe("canGoToNextGameEvent", () => {
    it("should return true when can go to next game event.", () => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];
      gameEventsStore.currentGameEventIndex = 1;

      expect(gameEventsStore.canGoToNextGameEvent).toBeTruthy();
    });

    it("should return false when cannot go to next game event.", () => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];
      gameEventsStore.currentGameEventIndex = 3;

      expect(gameEventsStore.canGoToNextGameEvent).toBeFalsy();
    });
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
  });

  describe("resetGameEvents", () => {
    it("should reset game events when called.", () => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];
      gameEventsStore.goToNextGameEvent();
      gameEventsStore.resetGameEvents();

      expect(gameEventsStore.gameEvents).toStrictEqual<GameEvent[]>([]);
      expect(gameEventsStore.currentGameEvent).toBeUndefined();
    });
  });

  describe("generateAndSetGameEventsFromGame", () => {
    it.each<{
      game: Game;
      expectedGameEvents: GameEvent[];
      test: string;
    }>([
      {
        game: createFakeGame({ tick: 1 }),
        expectedGameEvents: [
          createFakeGameEvent({ type: "game-starts" }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
        test: "should generate game starts and turn starts events when game tick is 1.",
      },
      {
        game: createFakeGame({
          tick: 2,
          phase: createFakeGamePhase({
            tick: 1,
            name: "day",
          }),
        }),
        expectedGameEvents: [
          createFakeGameEvent({ type: "game-phase-starts" }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
        test: "should generate day rises and turn starts events when game phase tick is 1 and name is day.",
      },
      {
        game: createFakeGame({
          tick: 2,
          phase: createFakeGamePhase({
            tick: 1,
            name: "night",
          }),
        }),
        expectedGameEvents: [
          createFakeGameEvent({ type: "game-phase-starts" }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
        test: "should generate night falls and turn starts events when game phase tick is 1 and name is night.",
      },
      {
        game: createFakeGame({
          tick: 2,
          phase: createFakeGamePhase({
            tick: 2,
            name: "day",
          }),
        }),
        expectedGameEvents: [createFakeGameEvent({ type: "game-turn-starts" })],
        test: "should generate turn starts event when game tick nor phase tick is 1.",
      },
    ])("$test", ({ game, expectedGameEvents }) => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.generateAndSetGameEventsFromGame(game);

      expect(gameEventsStore.gameEvents).toStrictEqual<GameEvent[]>(expectedGameEvents);
    });
  });

  describe("goToNextGameEvent", () => {
    it("should go to the next game event when called.", () => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];
      gameEventsStore.goToNextGameEvent();

      expect(gameEventsStore.currentGameEvent).toStrictEqual<GameEvent>(gameEventsStore.gameEvents[1]);
    });
  });

  describe("goToPreviousGameEvent", () => {
    it("should go to the previous game event when called.", () => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent(),
        createFakeGameEvent(),
      ];
      gameEventsStore.goToNextGameEvent();
      gameEventsStore.goToNextGameEvent();
      gameEventsStore.goToPreviousGameEvent();

      expect(gameEventsStore.currentGameEvent).toStrictEqual<GameEvent>(gameEventsStore.gameEvents[1]);
    });
  });
});