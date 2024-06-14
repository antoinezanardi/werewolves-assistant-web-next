import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class BigBadWolfGameOptions {
  @Expose()
  public isPowerlessIfWerewolfDies: boolean;

  public static create(bigBadWolfGameOptions: BigBadWolfGameOptions): BigBadWolfGameOptions {
    return plainToInstance(BigBadWolfGameOptions, bigBadWolfGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { BigBadWolfGameOptions };