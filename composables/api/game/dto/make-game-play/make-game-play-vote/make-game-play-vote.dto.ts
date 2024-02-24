import { Expose, plainToInstance } from "class-transformer";

import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class MakeGamePlayVoteDto {
  @Expose()
  public sourceId: string;

  @Expose()
  public targetId: string;

  public static create(makeGamePlayVoteDto: MakeGamePlayVoteDto): MakeGamePlayVoteDto {
    return plainToInstance(MakeGamePlayVoteDto, makeGamePlayVoteDto, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { MakeGamePlayVoteDto };