import { Game } from "~/composables/api/game/types/game.class";
import { createFakeGamePlay } from "~/tests/unit/utils/factories/composables/api/game/game-play/game-play.factory";

describe("Game Class", () => {
  describe("create", () => {
    it("should create a game when called.", () => {
      const currentPlay = createFakeGamePlay();
      const upcomingPlays = [
        createFakeGamePlay(),
        createFakeGamePlay(),
      ];
      const createdAt = new Date();
      const updatedAt = new Date();
      const createdGame = Game.create({
        _id: "1",
        phase: "day",
        players: [],
        status: "playing",
        currentPlay,
        upcomingPlays,
        tick: 1,
        turn: 1,
        createdAt,
        updatedAt,
        extra: "Extra",
      } as Game);
      const expectedGame = new Game();
      expectedGame._id = "1";
      expectedGame.phase = "day";
      expectedGame.players = [];
      expectedGame.status = "playing";
      expectedGame.tick = 1;
      expectedGame.turn = 1;
      expectedGame.currentPlay = currentPlay;
      expectedGame.upcomingPlays = upcomingPlays;
      expectedGame.createdAt = createdAt;
      expectedGame.updatedAt = updatedAt;

      expect(createdGame).toStrictEqual<Game>(expectedGame);
    });
  });
});