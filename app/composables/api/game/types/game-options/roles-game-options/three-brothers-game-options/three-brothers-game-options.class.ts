import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class ThreeBrothersGameOptions {
  @Expose()
  public wakingUpInterval: number;

  public static create(threeBrothersGameOptions: ThreeBrothersGameOptions): ThreeBrothersGameOptions {
    return plainToInstance(ThreeBrothersGameOptions, threeBrothersGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { ThreeBrothersGameOptions };