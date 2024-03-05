import { PlayerSide } from "~/composables/api/game/types/players/player-side/player-side.class";
import { RoleSides } from "~/composables/api/role/enums/role.enums";

describe("Player Side Class", () => {
  describe("create", () => {
    it("should create a player side when called.", () => {
      const createdPlayerSide = PlayerSide.create({
        original: RoleSides.WEREWOLVES,
        current: RoleSides.WEREWOLVES,
        extra: "Extra",
      } as PlayerSide);
      const expectedPlayerSide = new PlayerSide();
      expectedPlayerSide.original = RoleSides.WEREWOLVES;
      expectedPlayerSide.current = RoleSides.WEREWOLVES;

      expect(createdPlayerSide).toStrictEqual<PlayerSide>(expectedPlayerSide);
    });
  });
});