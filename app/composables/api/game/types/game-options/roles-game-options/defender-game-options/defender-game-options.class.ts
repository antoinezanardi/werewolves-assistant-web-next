import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class DefenderGameOptions {
  @Expose()
  public canProtectTwice: boolean;

  public static create(defenderGameOptions: DefenderGameOptions): DefenderGameOptions {
    return plainToInstance(DefenderGameOptions, defenderGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { DefenderGameOptions };