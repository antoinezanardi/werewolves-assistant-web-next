import type { PlayerInteractionType } from "~/composables/api/game/types/players/player-interaction/player-interaction.types";
import type { Player } from "~/composables/api/game/types/players/player.class";

type GamePlaygroundPlayerCardProps = {
  player: Player;
  interaction?: PlayerInteractionType;
};

export type { GamePlaygroundPlayerCardProps };