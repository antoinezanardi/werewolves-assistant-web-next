import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class WitchGameOptions {
  @Expose()
  public doesKnowWerewolvesTargets: boolean;

  public static create(witchGameOptions: WitchGameOptions): WitchGameOptions {
    return plainToInstance(WitchGameOptions, witchGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { WitchGameOptions };