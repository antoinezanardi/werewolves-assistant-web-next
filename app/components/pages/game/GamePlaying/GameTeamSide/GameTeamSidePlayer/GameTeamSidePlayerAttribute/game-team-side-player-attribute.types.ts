import type { PlayerAttribute } from "~/composables/api/game/types/players/player-attribute/player-attribute.class";
import type { Player } from "~/composables/api/game/types/players/player.class";

type GameTeamSidePlayerAttributeProps = {
  player: Player;
  attribute: PlayerAttribute;
};

export type { GameTeamSidePlayerAttributeProps };