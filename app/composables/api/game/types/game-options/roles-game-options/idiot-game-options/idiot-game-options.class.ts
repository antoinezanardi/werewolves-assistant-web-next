import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class IdiotGameOptions {
  @Expose()
  public doesDieOnElderDeath: boolean;

  public static create(idiotGameOptions: IdiotGameOptions): IdiotGameOptions {
    return plainToInstance(IdiotGameOptions, idiotGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { IdiotGameOptions };