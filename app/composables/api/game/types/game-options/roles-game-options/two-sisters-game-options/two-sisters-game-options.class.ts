import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class TwoSistersGameOptions {
  @Expose()
  public wakingUpInterval: number;

  public static create(twoSistersGameOptions: TwoSistersGameOptions): TwoSistersGameOptions {
    return plainToInstance(TwoSistersGameOptions, twoSistersGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { TwoSistersGameOptions };