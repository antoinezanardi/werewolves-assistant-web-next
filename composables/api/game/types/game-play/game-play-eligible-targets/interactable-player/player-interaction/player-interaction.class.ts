import { Expose, plainToInstance } from "class-transformer";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { PlayerInteractionType } from "~/composables/api/game/types/game-play/game-play-eligible-targets/interactable-player/player-interaction/player-interaction.types";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { GameSource } from "~/composables/api/game/types/game.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class PlayerInteraction {
  @Expose()
  public source: GameSource;

  @Expose()
  public type: PlayerInteractionType;

  public static create(interaction: PlayerInteraction): PlayerInteraction {
    return plainToInstance(PlayerInteraction, interaction, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { PlayerInteraction };