import { Expose } from "class-transformer";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { WitchPotion } from "~/composables/api/game/types/game-play/game-play.types";

class MakeGamePlayTargetDto {
  @Expose()
  public playerId: string;

  @Expose()
  public drankPotion?: WitchPotion;
}

export { MakeGamePlayTargetDto };