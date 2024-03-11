import { PlayerRole } from "~/composables/api/game/types/players/player-role/player-role.class";

describe("Player Role Class", () => {
  describe("create", () => {
    it("should create a player role when called.", () => {
      const createdPlayerSide = PlayerRole.create({
        original: "werewolf",
        current: "seer",
        isRevealed: true,
        extra: "Extra",
      } as PlayerRole);
      const expectedPlayerSide = new PlayerRole();
      expectedPlayerSide.original = "werewolf";
      expectedPlayerSide.current = "seer";
      expectedPlayerSide.isRevealed = true;

      expect(createdPlayerSide).toStrictEqual<PlayerRole>(expectedPlayerSide);
    });
  });
});