import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class ElderGameOptions {
  @Expose()
  public livesCountAgainstWerewolves: number;

  @Expose()
  public doesTakeHisRevenge: boolean;

  public static create(elderGameOptions: ElderGameOptions): ElderGameOptions {
    return plainToInstance(ElderGameOptions, elderGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { ElderGameOptions };