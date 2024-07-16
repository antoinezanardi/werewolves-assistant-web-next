import { Expose, plainToInstance } from "class-transformer";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class VotesGameOptions {
  @Expose()
  public canBeSkipped: boolean;

  @Expose()
  public duration: number;

  public static create(votesGameOptions: VotesGameOptions): VotesGameOptions {
    return plainToInstance(VotesGameOptions, votesGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { VotesGameOptions };