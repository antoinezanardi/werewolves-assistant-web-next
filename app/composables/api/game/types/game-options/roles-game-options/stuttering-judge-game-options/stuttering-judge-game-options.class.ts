import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class StutteringJudgeGameOptions {
  @Expose()
  public voteRequestsCount: number;

  public static create(stutteringJudgeGameOptions: StutteringJudgeGameOptions): StutteringJudgeGameOptions {
    return plainToInstance(StutteringJudgeGameOptions, stutteringJudgeGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { StutteringJudgeGameOptions };