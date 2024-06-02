import { Game } from "~/composables/api/game/types/game.class";
import { createFakeGameHistoryRecord } from "~/tests/unit/utils/factories/composables/api/game/game-history-record/game-history-record.factory";
import { createFakeGameOptions } from "~/tests/unit/utils/factories/composables/api/game/game-options/game-options.factory";
import { createFakeGamePhase } from "~/tests/unit/utils/factories/composables/api/game/game-phase/game-phase.factory";
import { createFakeGamePlay } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";
import type { OmitToJSON } from "~/utils/types/class.types";

describe("Game Class", () => {
  describe("create", () => {
    it("should create a game when called.", () => {
      const currentPlay = createFakeGamePlay();
      const upcomingPlays = [
        createFakeGamePlay(),
        createFakeGamePlay(),
      ];
      const options = createFakeGameOptions();
      const phase = createFakeGamePhase();
      const lastGameHistoryRecord = createFakeGameHistoryRecord();
      const createdAt = new Date();
      const updatedAt = new Date();
      const createdGame = Game.create({
        _id: "1",
        phase,
        players: [],
        status: "playing",
        currentPlay,
        upcomingPlays,
        tick: 1,
        turn: 1,
        lastGameHistoryRecord,
        options,
        createdAt,
        updatedAt,
        extra: "Extra",
      } as OmitToJSON<Game>);
      const expectedGame = new Game();
      expectedGame._id = "1";
      expectedGame.phase = phase;
      expectedGame.players = [];
      expectedGame.status = "playing";
      expectedGame.tick = 1;
      expectedGame.turn = 1;
      expectedGame.currentPlay = currentPlay;
      expectedGame.upcomingPlays = upcomingPlays;
      expectedGame.options = options;
      expectedGame.lastGameHistoryRecord = lastGameHistoryRecord;
      expectedGame.createdAt = createdAt;
      expectedGame.updatedAt = updatedAt;

      expect(createdGame).toStrictEqual<Game>(expectedGame);
    });
  });

  describe("toJSON", () => {
    it("should return the JSON representation of the Game when called.", () => {
      const currentPlay = createFakeGamePlay();
      const upcomingPlays = [
        createFakeGamePlay(),
        createFakeGamePlay(),
      ];
      const options = createFakeGameOptions();
      const phase = createFakeGamePhase();
      const lastGameHistoryRecord = createFakeGameHistoryRecord();
      const createdAt = new Date();
      const updatedAt = new Date();
      const game = new Game();
      game._id = "1";
      game.phase = phase;
      game.players = [];
      game.status = "playing";
      game.currentPlay = currentPlay;
      game.upcomingPlays = upcomingPlays;
      game.tick = 1;
      game.turn = 1;
      game.options = options;
      game.lastGameHistoryRecord = lastGameHistoryRecord;
      game.createdAt = createdAt;
      game.updatedAt = updatedAt;
      const expectedGame: OmitToJSON<Game> = {
        _id: "1",
        phase,
        players: [],
        status: "playing",
        currentPlay,
        upcomingPlays,
        tick: 1,
        turn: 1,
        options,
        lastGameHistoryRecord,
        createdAt,
        updatedAt,
        victory: undefined,
      };

      expect(game.toJSON()).toMatchObject({
        ...expectedGame,
        createdAt: new Date(createdAt.toISOString()),
        updatedAt: new Date(updatedAt.toISOString()),
      });
    });
  });
});