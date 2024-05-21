import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class PiedPiperGameOptions {
  @Expose()
  public charmedPeopleCountPerNight: number;

  @Expose()
  public isPowerlessOnWerewolvesSide: boolean;

  public static create(piedPiperGameOptions: PiedPiperGameOptions): PiedPiperGameOptions {
    return plainToInstance(PiedPiperGameOptions, piedPiperGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { PiedPiperGameOptions };