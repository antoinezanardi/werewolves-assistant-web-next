import { CupidLoversGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/cupid-game-options/cupid-lovers-game-options/cupid-lovers-game-options.class";

describe("Cupid Lovers Game Options Class", () => {
  describe("create", () => {
    it("should create a cupid lovers game options when called.", () => {
      const createdCupidLoversGameOptions = CupidLoversGameOptions.create({ doRevealRoleToEachOther: false });
      const expectedCupidLoversGameOptions = new CupidLoversGameOptions();
      expectedCupidLoversGameOptions.doRevealRoleToEachOther = false;

      expect(createdCupidLoversGameOptions).toStrictEqual<CupidLoversGameOptions>(expectedCupidLoversGameOptions);
    });
  });
});