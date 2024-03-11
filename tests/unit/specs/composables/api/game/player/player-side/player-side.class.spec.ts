import { PlayerSide } from "~/composables/api/game/types/players/player-side/player-side.class";

describe("Player Side Class", () => {
  describe("create", () => {
    it("should create a player side when called.", () => {
      const createdPlayerSide = PlayerSide.create({
        original: "werewolves",
        current: "werewolves",
        extra: "Extra",
      } as PlayerSide);
      const expectedPlayerSide = new PlayerSide();
      expectedPlayerSide.original = "werewolves";
      expectedPlayerSide.current = "werewolves";

      expect(createdPlayerSide).toStrictEqual<PlayerSide>(expectedPlayerSide);
    });
  });
});