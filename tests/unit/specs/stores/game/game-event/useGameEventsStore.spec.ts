import { createFakeGameHistoryRecordPlaySource } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-source/game-history-record-play-source.factory";
import { createFakeGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { createFakeRolesGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/roles-game-options.factory";
import { createFakeWolfHoundGameOptions } from "@tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/wolf-hound-game-options/wolf-hound-game-options.factory";
import { createFakeAccursedWolfFatherAlivePlayer, createFakeIdiotAlivePlayer, createFakeSeerAlivePlayer, createFakeVillagerVillagerAlivePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player-with-role.factory";
import type { AsyncDataRequestStatus } from "nuxt/app";
import { createPinia, setActivePinia } from "pinia";
import type { Mock } from "vitest";
import type { Game } from "~/composables/api/game/types/game.class";
import type { GameEvent } from "~/stores/game/game-event/types/game-event.class";
import { useGameEventsStore } from "~/stores/game/game-event/useGameEventsStore";
import * as UseGameStore from "~/stores/game/useGameStore";
import { createFakeGameHistoryRecordPlayVoting } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play-voting/game-history-record-play-voting.factory";
import { createFakeGameHistoryRecordPlay } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record-play/game-history-record-play.factory";
import { createFakeGameHistoryRecord } from "@tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeGamePhase } from "@tests/unit/utils/factories/composables/api/game/game-phase/game-phase.factory";
import { createFakeGamePlaySourceInteraction } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction.factory";
import { createFakeGamePlaySource } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play-source/game-play-source.factory";
import { createFakeGamePlaySheriffDelegates, createFakeGamePlaySurvivorsBuryDeadBodies, createFakeGamePlayWolfHoundChoosesSide } from "@tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import { createFakeGame } from "@tests/unit/utils/factories/composables/api/game/game.factory";
import { createFakePlayer } from "@tests/unit/utils/factories/composables/api/game/player/player.factory";
import { createFakeGameEvent } from "@tests/unit/utils/factories/stores/game/game-event/game-event.factory";

describe("Game Events Store", () => {
  let mocks: {
    stores: {
      game: {
        game: Game;
        makingGamePlayStatus: AsyncDataRequestStatus;
        skipGamePlay: Mock;
      };
    };
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    mocks = {
      stores: {
        game: {
          game: createFakeGame(),
          makingGamePlayStatus: "idle",
          skipGamePlay: vi.fn(),
        },
      },
    };
    vi.spyOn(UseGameStore, "useGameStore").mockImplementation(() => mocks.stores.game as unknown as ReturnType<typeof UseGameStore.useGameStore>);
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
      mocks.stores.game.makingGamePlayStatus = "pending";
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
      mocks.stores.game.makingGamePlayStatus = "pending";
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
    const deadPlayers = [
      createFakePlayer(),
      createFakePlayer(),
    ];

    it.each<{
      game: Game;
      expectedGameEvents: GameEvent[];
      test: string;
    }>([
      {
        game: createFakeGame({
          tick: 1,
          players: [createFakeAccursedWolfFatherAlivePlayer()],
        }),
        expectedGameEvents: [
          createFakeGameEvent({ type: "game-starts" }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
        test: "should generate game starts and turn starts events when game tick is 1.",
      },
      {
        game: createFakeGame({
          tick: 1,
          players: [createFakeVillagerVillagerAlivePlayer()],
        }),
        expectedGameEvents: [
          createFakeGameEvent({ type: "game-starts" }),
          createFakeGameEvent({ type: "villager-villager-introduction" }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
        test: "should generate game starts, villager-villager introduction and turn starts events when game tick is 1 and villager villager is in the game.",
      },
      {
        test: "should not generate see has seen event when last game history is null.",
        game: createFakeGame({ tick: 2 }),
        expectedGameEvents: [createFakeGameEvent({ type: "game-turn-starts" })],
      },
      {
        test: "should not generate see has seen event when last game history record action is not look.",
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ action: "vote" }) }),
        }),
        expectedGameEvents: [createFakeGameEvent({ type: "game-turn-starts" })],
      },
      {
        test: "should generate seer has seen event when last game history record action is look.",
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ action: "look" }) }),
        }),
        expectedGameEvents: [
          createFakeGameEvent({ type: "seer-has-seen" }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
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
            tick: 1,
            name: "twilight",
          }),
        }),
        expectedGameEvents: [createFakeGameEvent({ type: "game-turn-starts" })],
        test: "should turn starts event without game phase event when game phase tick is 1 but name is twilight.",
      },
      {
        game: createFakeGame({
          tick: 2,
          phase: createFakeGamePhase({
            tick: 2,
            name: "day",
          }),
          currentPlay: createFakeGamePlaySheriffDelegates({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  type: "bury",
                  eligibleTargets: deadPlayers,
                }),
              ],
            }),
          }),
        }),
        expectedGameEvents: [createFakeGameEvent({ type: "game-turn-starts" })],
        test: "should generate turn starts event when game tick nor phase tick is 1.",
      },
      {
        game: createFakeGame({
          tick: 1,
          currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies({
            source: createFakeGamePlaySource({
              interactions: [
                createFakeGamePlaySourceInteraction({
                  type: "bury",
                  eligibleTargets: deadPlayers,
                }),
              ],
            }),
          }),
          lastGameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              action: "charm",
              source: createFakeGameHistoryRecordPlaySource({ name: "hunter" }),
            }),
          }),
        }),
        expectedGameEvents: [
          createFakeGameEvent({ type: "game-starts" }),
          createFakeGameEvent({ type: "player-dies", players: [deadPlayers[0]] }),
          createFakeGameEvent({ type: "player-dies", players: [deadPlayers[1]] }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
        test: "should generate player dies event when game current play action is bury-dead-bodies.",
      },
      {
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              action: "elect-sheriff",
              voting: createFakeGameHistoryRecordPlayVoting({ result: "death" }),
            }),
          }),
        }),
        expectedGameEvents: [createFakeGameEvent({ type: "game-turn-starts" })],
        test: "should not generate sheriff has been elected event when last game history record action is elect-sheriff but voting result is not sheriff-election.",
      },
      {
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ action: "elect-sheriff" }) }),
        }),
        expectedGameEvents: [createFakeGameEvent({ type: "game-turn-starts" })],
        test: "should not generate sheriff has been elected event when last game history record action is elect-sheriff but voting is not defined.",
      },
      {
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              action: "vote",
              voting: createFakeGameHistoryRecordPlayVoting({ result: "sheriff-election" }),
            }),
          }),
        }),
        expectedGameEvents: [createFakeGameEvent({ type: "game-turn-starts" })],
        test: "should not generate sheriff promotion event when last game history record action is vote and voting result is sheriff-election.",
      },
      {
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              action: "elect-sheriff",
              voting: createFakeGameHistoryRecordPlayVoting({ result: "sheriff-election" }),
            }),
          }),
        }),
        expectedGameEvents: [
          createFakeGameEvent({ type: "sheriff-promotion" }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
        test: "should generate sheriff promotion event when last game history record action is elect-sheriff and voting result is sheriff-election.",
      },
      {
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ action: "delegate" }) }),
        }),
        expectedGameEvents: [
          createFakeGameEvent({ type: "sheriff-promotion" }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
        test: "should generate sheriff promotion event when last game history record action is delegate.",
      },
      {
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              action: "charm",
              source: createFakeGameHistoryRecordPlaySource({ name: "pied-piper" }),
            }),
          }),
        }),
        expectedGameEvents: [
          createFakeGameEvent({ type: "pied-piper-has-charmed" }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
        test: "should generate pied piper has charmed event when last game history action is charm and source name is pied piper.",
      },
      {
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              action: "charm",
              source: createFakeGameHistoryRecordPlaySource({ name: "cupid" }),
            }),
          }),
        }),
        expectedGameEvents: [
          createFakeGameEvent({ type: "cupid-has-charmed" }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
        test: "should generate cupid has charmed event when last game history action is charm and source name is cupid.",
      },
      {
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              action: "shoot",
              source: createFakeGameHistoryRecordPlaySource({ name: "pied-piper" }),
            }),
          }),
        }),
        expectedGameEvents: [createFakeGameEvent({ type: "game-turn-starts" })],
        test: "should not generate pied piper has charmed event when last game history action is not charmed.",
      },
      {
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ action: "mark" }) }),
        }),
        expectedGameEvents: [
          createFakeGameEvent({ type: "scandalmonger-has-marked" }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
        test: "should generate scandalmonger has marked event when last game history record action is mark.",
      },
      {
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ action: "infect" }) }),
        }),
        expectedGameEvents: [
          createFakeGameEvent({ type: "accursed-wolf-father-may-have-infected" }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
        test: "should generate accursed wolf father may have infected event when last game history record action is infect.",
      },
      {
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({ play: createFakeGameHistoryRecordPlay({ action: "choose-side" }) }),
        }),
        expectedGameEvents: [
          createFakeGameEvent({ type: "wolf-hound-has-chosen-side" }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
        test: "should generate wolf hound has chosen side event when last game history record action is choose side.",
      },
      {
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              action: "shoot",
              source: createFakeGameHistoryRecordPlaySource({ name: "hunter" }),
            }),
          }),
        }),
        expectedGameEvents: [createFakeGameEvent({ type: "game-turn-starts" })],
        test: "should not generate idiot is spared event when last game history record doesn't have revealed players.",
      },
      {
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              action: "vote",
              source: createFakeGameHistoryRecordPlaySource({ name: "survivors" }),
            }),
            revealedPlayers: [
              createFakeSeerAlivePlayer(),
              createFakeSeerAlivePlayer(),
            ],
          }),
        }),
        expectedGameEvents: [createFakeGameEvent({ type: "game-turn-starts" })],
        test: "should not generate idiot is spared event when last game history record doesn't have an idiot revealed.",
      },
      {
        game: createFakeGame({
          tick: 2,
          lastGameHistoryRecord: createFakeGameHistoryRecord({
            play: createFakeGameHistoryRecordPlay({
              action: "vote",
              source: createFakeGameHistoryRecordPlaySource({ name: "survivors" }),
            }),
            revealedPlayers: [
              createFakeSeerAlivePlayer(),
              createFakeIdiotAlivePlayer(),
            ],
          }),
        }),
        expectedGameEvents: [
          createFakeGameEvent({ type: "idiot-is-spared" }),
          createFakeGameEvent({ type: "game-turn-starts" }),
        ],
        test: "should generate idiot is spared event when last game history record has an idiot revealed.",
      },
    ])("$test", ({ game, expectedGameEvents }) => {
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.generateAndSetGameEventsFromGame(game);

      expect(gameEventsStore.gameEvents).toStrictEqual<GameEvent[]>(expectedGameEvents);
    });
  });

  describe("goToNextGameEvent", () => {
    it("should go to the next game event when called.", async() => {
      mocks.stores.game.game = createFakeGame({ currentPlay: createFakeGamePlaySheriffDelegates() });
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
      mocks.stores.game.game = createFakeGame({ currentPlay: createFakeGamePlaySheriffDelegates() });
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [createFakeGameEvent()];
      await gameEventsStore.goToNextGameEvent();

      expect(gameEventsStore.currentGameEvent).toBeUndefined();
      expect(gameEventsStore.currentGameEventIndex).toBe(1);
    });

    it("should go to the next game event when current game play must be skipped but next event is not game turn start type.", async() => {
      mocks.stores.game.game = createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() });
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent(),
        createFakeGameEvent({ type: "game-phase-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(gameEventsStore.currentGameEventIndex).toBe(1);
    });

    it("should not go to the next game event when the next current game event is game turn starts and must current game play be skipped.", async() => {
      mocks.stores.game.game = createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() });
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "game-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(gameEventsStore.currentGameEvent).toStrictEqual<GameEvent>(gameEventsStore.gameEvents[0]);
    });

    it("should not skip current game play when the next current game event is game turn starts but current action is not bury dead bodies.", async() => {
      mocks.stores.game.game = createFakeGame({
        currentPlay: createFakeGamePlayWolfHoundChoosesSide(),
        options: createFakeGameOptions({ roles: createFakeRolesGameOptions({ wolfHound: createFakeWolfHoundGameOptions({ isSideRandomlyChosen: true }) }) }),
      });
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "game-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(mocks.stores.game.skipGamePlay).not.toHaveBeenCalled();
    });

    it("should skip current game play when the next current game event is game turn starts and must current game play be skipped.", async() => {
      mocks.stores.game.game = createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() });
      const gameEventsStore = useGameEventsStore();
      gameEventsStore.gameEvents = [
        createFakeGameEvent({ type: "game-starts" }),
        createFakeGameEvent({ type: "game-turn-starts" }),
      ];
      await gameEventsStore.goToNextGameEvent();

      expect(mocks.stores.game.skipGamePlay).toHaveBeenCalledExactlyOnceWith();
    });

    it("should skip current game play when it's the last game event and must current game play be skipped.", async() => {
      mocks.stores.game.game = createFakeGame({
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

      expect(mocks.stores.game.skipGamePlay).toHaveBeenCalledExactlyOnceWith();
    });

    it("should set current game event index to 0 when skipping current game play.", async() => {
      mocks.stores.game.game = createFakeGame({ currentPlay: createFakeGamePlaySurvivorsBuryDeadBodies() });
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