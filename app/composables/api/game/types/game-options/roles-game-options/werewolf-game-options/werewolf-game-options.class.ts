import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class WerewolfGameOptions {
  @Expose()
  public canEatEachOther: boolean;

  public static create(werewolfGameOptions: WerewolfGameOptions): WerewolfGameOptions {
    return plainToInstance(WerewolfGameOptions, werewolfGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { WerewolfGameOptions };