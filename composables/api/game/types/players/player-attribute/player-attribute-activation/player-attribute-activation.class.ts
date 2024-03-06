import { Expose, plainToInstance } from "class-transformer";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { GamePhase } from "~/composables/api/game/types/game.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class PlayerAttributeActivation {
  @Expose()
  public turn: number;

  @Expose()
  public phase: GamePhase;

  public static create(playerAttributeActivation: PlayerAttributeActivation): PlayerAttributeActivation {
    return plainToInstance(PlayerAttributeActivation, playerAttributeActivation, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { PlayerAttributeActivation };