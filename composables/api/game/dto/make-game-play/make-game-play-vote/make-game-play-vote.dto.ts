import { Expose } from "class-transformer";

class MakeGamePlayVoteDto {
  @Expose()
  public sourceId: string;

  @Expose()
  public targetId: string;
}

export { MakeGamePlayVoteDto };