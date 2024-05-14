import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class CompositionGameOptions {
  @Expose()
  public isHidden: boolean;

  public static create(compositionGameOptions: CompositionGameOptions): CompositionGameOptions {
    return plainToInstance(CompositionGameOptions, compositionGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { CompositionGameOptions };