import { TwoSistersGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/two-sisters-game-options/two-sisters-game-options.class";

describe("Two Sisters Game Options Class", () => {
  describe("create", () => {
    it("should create a two sisters game options when called.", () => {
      const createdTwoSistersGameOptions = TwoSistersGameOptions.create({ wakingUpInterval: 5 });
      const expectedTwoSistersGameOptions = new TwoSistersGameOptions();
      expectedTwoSistersGameOptions.wakingUpInterval = 5;

      expect(createdTwoSistersGameOptions).toStrictEqual<TwoSistersGameOptions>(expectedTwoSistersGameOptions);
    });
  });
});