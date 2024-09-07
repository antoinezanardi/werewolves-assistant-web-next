import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class ThiefGameOptions {
  @Expose()
  public mustChooseBetweenWerewolves: boolean;

  @Expose()
  public isChosenCardRevealed: boolean;

  public static create(thiefGameOptions: ThiefGameOptions): ThiefGameOptions {
    return plainToInstance(ThiefGameOptions, thiefGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { ThiefGameOptions };