import { Expose, plainToInstance } from "class-transformer";

import type { WitchPotion } from "~/composables/api/game/types/game-play/game-play.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class MakeGamePlayTargetDto {
  @Expose()
  public playerId: string;

  @Expose()
  public drankPotion?: WitchPotion;

  public static create(makeGamePlayTargetDto: MakeGamePlayTargetDto): MakeGamePlayTargetDto {
    return plainToInstance(MakeGamePlayTargetDto, makeGamePlayTargetDto, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { MakeGamePlayTargetDto };