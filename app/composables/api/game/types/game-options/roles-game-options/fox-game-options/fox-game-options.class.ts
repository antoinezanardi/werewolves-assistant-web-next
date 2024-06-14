import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class FoxGameOptions {
  @Expose()
  public isPowerlessIfMissesWerewolf: boolean;

  public static create(foxGameOptions: FoxGameOptions): FoxGameOptions {
    return plainToInstance(FoxGameOptions, foxGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { FoxGameOptions };