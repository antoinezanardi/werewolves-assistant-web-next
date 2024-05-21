import { GameOptions } from "~/composables/api/game/types/game-options/game-options.class";
import { createFakeCompositionGameOptions } from "~/tests/unit/utils/factories/composables/api/game/game-options/composition-game-options/composition-game-options.factory";
import { createFakeRolesGameOptions } from "~/tests/unit/utils/factories/composables/api/game/game-options/roles-game-options/roles-game-options.factory";
import { createFakeVotesGameOptions } from "~/tests/unit/utils/factories/composables/api/game/game-options/votes-game-options/votes-game-options.factory";

describe("Game Options Class", () => {
  describe("create", () => {
    it("should create a game options when called.", () => {
      const composition = createFakeCompositionGameOptions();
      const roles = createFakeRolesGameOptions();
      const votes = createFakeVotesGameOptions();
      const createdGameOptions = GameOptions.create({
        composition,
        roles,
        votes,
      });
      const expectedGameOptions = new GameOptions();
      expectedGameOptions.composition = composition;
      expectedGameOptions.roles = roles;
      expectedGameOptions.votes = votes;

      expect(createdGameOptions).toStrictEqual<GameOptions>(expectedGameOptions);
    });
  });
});