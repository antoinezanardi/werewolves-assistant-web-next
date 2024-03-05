import { InteractablePlayer } from "~/composables/api/game/types/game-play/game-play-eligible-targets/interactable-player/interactable-player.class";
import { createFakePlayer } from "~/tests/unit/utils/factories/composables/api/game/player/player.factory";

function createFakeInteractablePlayer(interactablePlayer: Partial<InteractablePlayer> = {}): InteractablePlayer {
  return InteractablePlayer.create({
    player: interactablePlayer.player ?? createFakePlayer(),
    interactions: interactablePlayer.interactions ?? [],
  });
}

export { createFakeInteractablePlayer };