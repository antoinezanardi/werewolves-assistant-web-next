import { Game } from "~/composables/api/game/types/game.class";

describe("Game Class", () => {
  describe("create", () => {
    it("should create a game when called.", () => {
      const createdAt = new Date();
      const updatedAt = new Date();
      const createdGame = Game.create({
        _id: "1",
        phase: "day",
        players: [],
        status: "playing",
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
      expectedGame.createdAt = createdAt;
      expectedGame.updatedAt = updatedAt;

      expect(createdGame).toStrictEqual<Game>(expectedGame);
    });
  });
});