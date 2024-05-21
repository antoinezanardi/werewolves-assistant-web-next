import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class PrejudicedManipulatorGameOptions {
  @Expose()
  public isPowerlessOnWerewolvesSide: boolean;

  public static create(prejudicedManipulatorGameOptions: PrejudicedManipulatorGameOptions): PrejudicedManipulatorGameOptions {
    return plainToInstance(PrejudicedManipulatorGameOptions, prejudicedManipulatorGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { PrejudicedManipulatorGameOptions };