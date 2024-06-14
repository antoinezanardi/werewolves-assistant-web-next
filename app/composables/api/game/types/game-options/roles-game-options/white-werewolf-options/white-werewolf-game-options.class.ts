import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class WhiteWerewolfGameOptions {
  @Expose()
  public wakingUpInterval: number;

  public static create(whiteWerewolfGameOptions: WhiteWerewolfGameOptions): WhiteWerewolfGameOptions {
    return plainToInstance(WhiteWerewolfGameOptions, whiteWerewolfGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { WhiteWerewolfGameOptions };