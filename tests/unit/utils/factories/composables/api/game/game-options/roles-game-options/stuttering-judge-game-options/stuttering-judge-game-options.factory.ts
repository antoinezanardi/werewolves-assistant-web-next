import { faker } from "@faker-js/faker";
import { StutteringJudgeGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/stuttering-judge-game-options/stuttering-judge-game-options.class";

function createFakeStutteringJudgeGameOptions(stutteringJudgeGameOptions: Partial<StutteringJudgeGameOptions> = {}): StutteringJudgeGameOptions {
  return StutteringJudgeGameOptions.create({ voteRequestsCount: stutteringJudgeGameOptions.voteRequestsCount ?? faker.number.int({ min: 1, max: 5 }) });
}

export { createFakeStutteringJudgeGameOptions };