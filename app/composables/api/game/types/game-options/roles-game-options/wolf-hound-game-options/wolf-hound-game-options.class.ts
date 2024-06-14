import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class WolfHoundGameOptions {
  @Expose()
  public isChosenSideRevealed: boolean;

  @Expose()
  public isSideRandomlyChosen: boolean;

  public static create(wolfHoundGameOptions: WolfHoundGameOptions): WolfHoundGameOptions {
    return plainToInstance(WolfHoundGameOptions, wolfHoundGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { WolfHoundGameOptions };