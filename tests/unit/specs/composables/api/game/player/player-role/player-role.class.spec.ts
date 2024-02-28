import { PlayerRole } from "~/composables/api/game/types/players/player-role/player-role.class";
import { RoleNames } from "~/composables/api/role/enums/role.enums";

describe("Player Role Class", () => {
  describe("create", () => {
    it("should create a player role when called.", () => {
      const createdPlayerSide = PlayerRole.create({
        original: RoleNames.WEREWOLF,
        current: RoleNames.SEER,
        isRevealed: true,
        extra: "Extra",
      } as PlayerRole);
      const expectedPlayerSide = new PlayerRole();
      expectedPlayerSide.original = RoleNames.WEREWOLF;
      expectedPlayerSide.current = RoleNames.SEER;
      expectedPlayerSide.isRevealed = true;

      expect(createdPlayerSide).toStrictEqual<PlayerRole>(expectedPlayerSide);
    });
  });
});