import { VotesGameOptions } from "~/composables/api/game/types/game-options/votes-game-options/votes-game-options.class";

describe("Votes Game Option Class", () => {
  describe("create", () => {
    it("should create a votes game option when called.", () => {
      const createdVotesGameOption = VotesGameOptions.create({
        canBeSkipped: true,
        duration: 10,
      });
      const expectedVotesGameOption = new VotesGameOptions();
      expectedVotesGameOption.canBeSkipped = true;
      expectedVotesGameOption.duration = 10;

      expect(createdVotesGameOption).toStrictEqual<VotesGameOptions>(expectedVotesGameOption);
    });
  });
});