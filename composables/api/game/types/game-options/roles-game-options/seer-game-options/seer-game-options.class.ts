import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class SeerGameOptions {
  @Expose()
  public isTalkative: boolean;

  @Expose()
  public canSeeRoles: boolean;

  public static create(seerGameOptions: SeerGameOptions): SeerGameOptions {
    return plainToInstance(SeerGameOptions, seerGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { SeerGameOptions };