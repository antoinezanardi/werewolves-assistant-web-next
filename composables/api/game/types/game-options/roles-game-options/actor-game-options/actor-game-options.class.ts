import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class ActorGameOptions {
  @Expose()
  public isPowerlessOnWerewolvesSide: boolean;

  @Expose()
  public additionalCardsCount: number;

  public static create(actorGameOptions: ActorGameOptions): ActorGameOptions {
    return plainToInstance(ActorGameOptions, actorGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { ActorGameOptions };