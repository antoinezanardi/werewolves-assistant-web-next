import { IdiotGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/idiot-game-options/idiot-game-options.class";

describe("Idiot Game Options Class", () => {
  describe("create", () => {
    it("should create an idiot game options when called.", () => {
      const createdIdiotGameOptions = IdiotGameOptions.create({ doesDieOnElderDeath: false });
      const expectedIdiotGameOptions = new IdiotGameOptions();
      expectedIdiotGameOptions.doesDieOnElderDeath = false;

      expect(createdIdiotGameOptions).toStrictEqual<IdiotGameOptions>(expectedIdiotGameOptions);
    });
  });
});