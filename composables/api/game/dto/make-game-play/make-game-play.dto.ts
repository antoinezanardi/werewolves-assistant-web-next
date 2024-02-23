import { Expose, plainToInstance, Type } from "class-transformer";

import { MakeGamePlayTargetDto } from "~/composables/api/game/dto/make-game-play/make-game-play-target/make-game-play-target.dto";
import { MakeGamePlayVoteDto } from "~/composables/api/game/dto/make-game-play/make-game-play-vote/make-game-play-vote.dto";
import { RoleSides } from "~/composables/api/role/enums/role.enums";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class MakeGamePlayDto {
  @Type(() => MakeGamePlayTargetDto)
  @Expose()
  public targets?: MakeGamePlayTargetDto[];

  @Type(() => MakeGamePlayVoteDto)
  @Expose()
  public votes?: MakeGamePlayVoteDto[];

  @Expose()
  public doesJudgeRequestAnotherVote?: boolean;

  @Expose()
  public chosenCardId?: string;

  @Expose()
  public chosenSide?: RoleSides;

  public static create(makeGamePlayDto: MakeGamePlayDto): MakeGamePlayDto {
    return plainToInstance(MakeGamePlayDto, makeGamePlayDto, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { MakeGamePlayDto };