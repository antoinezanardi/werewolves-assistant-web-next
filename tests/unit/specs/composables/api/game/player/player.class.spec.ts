import { Player } from "~/composables/api/game/types/players/player.class";

describe("Player Class", () => {
  describe("create", () => {
    it("should create a player when called.", () => {
      const createdPlayer = Player.create({
        _id: "1",
        name: "Player 1",
        extra: "Extra",
      } as Player);
      const expectedPlayer = new Player();
      expectedPlayer._id = "1";
      expectedPlayer.name = "Player 1";

      expect(createdPlayer).toStrictEqual<Player>(expectedPlayer);
    });
  });
});