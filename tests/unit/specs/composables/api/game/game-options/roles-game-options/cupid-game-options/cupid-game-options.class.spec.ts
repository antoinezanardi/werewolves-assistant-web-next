import { CupidGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/cupid-game-options/cupid-game-options.class";
import { createFakeCupidLoversGameOptions } from "~/tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/cupid-game-options/cupid-lovers-game-options/cupid-lovers-game-options.factory";

describe("Cupid Game Options Class", () => {
  describe("create", () => {
    it("should create a cupid game options when called.", () => {
      const loversOptions = createFakeCupidLoversGameOptions();
      const createdCupidGameOptions = CupidGameOptions.create({
        mustWinWithLovers: true,
        lovers: loversOptions,
      });
      const expectedCupidGameOptions = new CupidGameOptions();
      expectedCupidGameOptions.mustWinWithLovers = true;
      expectedCupidGameOptions.lovers = loversOptions;

      expect(createdCupidGameOptions).toStrictEqual<CupidGameOptions>(expectedCupidGameOptions);
    });
  });
});