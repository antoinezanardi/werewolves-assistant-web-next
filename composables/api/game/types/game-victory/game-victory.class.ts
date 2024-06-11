import { Expose, plainToInstance } from "class-transformer";

import type { GameVictoryType } from "~/composables/api/game/types/game-victory/game-victory.types";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GameVictory {
  @Expose()
  public type: GameVictoryType;

  @Expose()
  public winners?: Player[];

  public static create(gameVictory: GameVictory): GameVictory {
    return plainToInstance(GameVictory, gameVictory, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GameVictory };