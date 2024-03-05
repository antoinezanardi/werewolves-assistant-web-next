import { Expose, plainToInstance, Type } from "class-transformer";

import { PlayerInteraction } from "~/composables/api/game/types/game-play/game-play-eligible-targets/interactable-player/player-interaction/player-interaction.class";
import { Player } from "~/composables/api/game/types/players/player.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class InteractablePlayer {
  @Type(() => Player)
  @Expose()
  public player: Player;

  @Type(() => PlayerInteraction)
  @Expose()
  public interactions: PlayerInteraction[];

  public static create(interactablePlayer: InteractablePlayer): InteractablePlayer {
    return plainToInstance(InteractablePlayer, interactablePlayer, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { InteractablePlayer };