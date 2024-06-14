import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class BearTamerGameOptions {
  @Expose()
  public doesGrowlOnWerewolvesSide: boolean;

  public static create(bearTamerGameOptions: BearTamerGameOptions): BearTamerGameOptions {
    return plainToInstance(BearTamerGameOptions, bearTamerGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { BearTamerGameOptions };