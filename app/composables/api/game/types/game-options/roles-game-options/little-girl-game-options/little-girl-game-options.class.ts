import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class LittleGirlGameOptions {
  @Expose()
  public isProtectedByDefender: boolean;

  public static create(littleGirlGameOptions: LittleGirlGameOptions): LittleGirlGameOptions {
    return plainToInstance(LittleGirlGameOptions, littleGirlGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { LittleGirlGameOptions };