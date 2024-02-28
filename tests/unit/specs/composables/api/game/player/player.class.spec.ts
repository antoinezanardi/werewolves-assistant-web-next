import { Player } from "~/composables/api/game/types/players/player.class";
import { createFakePlayerRole } from "~/tests/unit/utils/factories/composables/api/game/player/player-role/player-role.factory";
import { createFakePlayerSide } from "~/tests/unit/utils/factories/composables/api/game/player/player-side/player-side.factory";

describe("Player Class", () => {
  describe("create", () => {
    it("should create a player when called.", () => {
      const role = createFakePlayerRole();
      const side = createFakePlayerSide();
      const createdPlayer = Player.create({
        _id: "1",
        name: "Player 1",
        isAlive: true,
        role,
        side,
        extra: "Extra",
      } as Player);
      const expectedPlayer = new Player();
      expectedPlayer._id = "1";
      expectedPlayer.name = "Player 1";
      expectedPlayer.isAlive = true;
      expectedPlayer.role = role;
      expectedPlayer.side = side;

      expect(createdPlayer).toStrictEqual<Player>(expectedPlayer);
    });
  });
});