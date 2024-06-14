import { Expose, plainToInstance } from "class-transformer";
import type { GamePhaseName } from "~/composables/api/game/types/game-phase/game-phase.types";

import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class PlayerAttributeActivation {
  @Expose()
  public turn: number;

  @Expose()
  public phaseName: GamePhaseName;

  public static create(playerAttributeActivation: PlayerAttributeActivation): PlayerAttributeActivation {
    return plainToInstance(PlayerAttributeActivation, playerAttributeActivation, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { PlayerAttributeActivation };