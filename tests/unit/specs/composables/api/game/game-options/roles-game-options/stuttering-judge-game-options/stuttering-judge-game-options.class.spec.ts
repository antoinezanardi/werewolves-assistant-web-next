import { StutteringJudgeGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/stuttering-judge-game-options/stuttering-judge-game-options.class";

describe("Stuttering Judge Game Options Class", () => {
  describe("create", () => {
    it("should create a stuttering judge game options when called.", () => {
      const createdStutteringJudgeGameOptions = StutteringJudgeGameOptions.create({ voteRequestsCount: 3 });
      const expectedStutteringJudgeGameOptions = new StutteringJudgeGameOptions();
      expectedStutteringJudgeGameOptions.voteRequestsCount = 3;

      expect(createdStutteringJudgeGameOptions).toStrictEqual<StutteringJudgeGameOptions>(expectedStutteringJudgeGameOptions);
    });
  });
});