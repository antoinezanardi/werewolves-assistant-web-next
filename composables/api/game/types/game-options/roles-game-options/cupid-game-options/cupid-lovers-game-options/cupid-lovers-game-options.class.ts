import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class CupidLoversGameOptions {
  @Expose()
  public doRevealRoleToEachOther: boolean;

  public static create(cupidLoversGameOptions: CupidLoversGameOptions): CupidLoversGameOptions {
    return plainToInstance(CupidLoversGameOptions, cupidLoversGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { CupidLoversGameOptions };