import type { RoleFlippingImageProps } from "~/components/shared/role/RoleImage/RoleFlippingImage/role-flipping-image.types";
import type { Player } from "~/composables/api/game/types/players/player.class";

type GameEventFlippingPlayersCardProps = Omit<RoleFlippingImageProps, "definition" | "roleName" | "sizes"> & {
  players?: Player[];
};

export type { GameEventFlippingPlayersCardProps };