import type { Player } from "~/composables/api/game/types/players/player.class";

type PlayersHorizontalListProps = {
  players: Player[];
  roleImageSizeInPx?: number;
};

export type { PlayersHorizontalListProps };