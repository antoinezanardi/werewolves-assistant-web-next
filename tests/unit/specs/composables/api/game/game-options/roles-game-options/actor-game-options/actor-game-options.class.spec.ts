import { ActorGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/actor-game-options/actor-game-options.class";

describe("Actor Game Options Class", () => {
  describe("create", () => {
    it("should create an actor game options when called.", () => {
      const createdActorGameOptions = ActorGameOptions.create({
        additionalCardsCount: 1,
        isPowerlessOnWerewolvesSide: false,
      });
      const expectedActorGameOptions = new ActorGameOptions();
      expectedActorGameOptions.additionalCardsCount = 1;
      expectedActorGameOptions.isPowerlessOnWerewolvesSide = false;

      expect(createdActorGameOptions).toStrictEqual<ActorGameOptions>(expectedActorGameOptions);
    });
  });
});