import { Expose, plainToInstance } from "class-transformer";

import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class CreateGameFeedbackDto {
  @Expose()
  public score: number;

  @Expose()
  public review?: string;

  @Expose()
  public hasEncounteredError: boolean;

  public static create(createGameFeedbackDto: CreateGameFeedbackDto): CreateGameFeedbackDto {
    return plainToInstance(CreateGameFeedbackDto, createGameFeedbackDto, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { CreateGameFeedbackDto };