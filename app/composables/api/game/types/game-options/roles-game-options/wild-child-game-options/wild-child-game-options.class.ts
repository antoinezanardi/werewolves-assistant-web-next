import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class WildChildGameOptions {
  @Expose()
  public isTransformationRevealed: boolean;

  public static create(wildChildGameOptions: WildChildGameOptions): WildChildGameOptions {
    return plainToInstance(WildChildGameOptions, wildChildGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { WildChildGameOptions };