import { Expose, plainToInstance } from "class-transformer";
import type { GamePhaseName } from "~/composables/api/game/types/game-phase/game-phase.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GamePhase {
  @Expose()
  public name: GamePhaseName;

  @Expose()
  public tick: number;

  public static create(gamePhase: GamePhase): GamePhase {
    return plainToInstance(GamePhase, gamePhase, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GamePhase };