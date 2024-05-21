import { CompositionGameOptions } from "~/composables/api/game/types/game-options/composition-game-options/composition-game-options.class";

describe("Composition Game Options Class", () => {
  describe("create", () => {
    it("should create a composition game options when called.", () => {
      const createdCompositionGameOptions = CompositionGameOptions.create({ isHidden: true });
      const expectedCompositionGameOptions = new CompositionGameOptions();
      expectedCompositionGameOptions.isHidden = true;

      expect(createdCompositionGameOptions).toStrictEqual<CompositionGameOptions>(expectedCompositionGameOptions);
    });
  });
});