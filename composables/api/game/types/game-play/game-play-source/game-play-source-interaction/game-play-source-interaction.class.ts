import { Expose, plainToInstance } from "class-transformer";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { PlayerInteractionType } from "~/composables/api/game/types/players/player-interaction/player-interaction.types";
import { GamePlaySourceInteractionBoundaries } from "~/composables/api/game/types/game-play/game-play-source/game-play-source-interaction/game-play-source-interaction-boundaries/game-play-source-interaction-boundaries.class";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { GameSource } from "~/composables/api/game/types/game.types";
import type { Player } from "~/composables/api/game/types/players/player.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GamePlaySourceInteraction {
  @Expose()
  public source: GameSource;

  @Expose()
  public type: PlayerInteractionType;

  @Expose()
  public eligibleTargets: Player[];

  @Expose()
  public boundaries: GamePlaySourceInteractionBoundaries;

  public static create(gamePlaySourceInteraction: GamePlaySourceInteraction): GamePlaySourceInteraction {
    return plainToInstance(GamePlaySourceInteraction, gamePlaySourceInteraction, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GamePlaySourceInteraction };