import { Expose, plainToInstance } from "class-transformer";

import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GameFeedback {
  @Expose()
  public _id: string;

  @Expose()
  public gameId: string;

  @Expose()
  public score: number;

  @Expose()
  public review?: string;

  @Expose()
  public hasEncounteredError: boolean;

  @Expose()
  public createdAt: Date;

  public static create(gameFeedback: GameFeedback): GameFeedback {
    return plainToInstance(GameFeedback, gameFeedback, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GameFeedback };