import { ActorGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/actor-game-options/actor-game-options.class";

describe("Actor Game Options Class", () => {
  describe("create", () => {
    it("should create an actor game options when called.", () => {
      const createdActorGameOptions = ActorGameOptions.create({
        isPowerlessOnWerewolvesSide: false,
      });
      const expectedActorGameOptions = new ActorGameOptions();
      expectedActorGameOptions.isPowerlessOnWerewolvesSide = false;

      expect(createdActorGameOptions).toStrictEqual<ActorGameOptions>(expectedActorGameOptions);
    });
  });
});