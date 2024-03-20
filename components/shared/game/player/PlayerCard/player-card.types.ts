import type { RoleName } from "~/composables/api/role/types/role.types";

type PlayerCardProps = {
  playerName: string;
  playerRole?: RoleName;
  selectorAriaLabel?: string;
  doesShowSelectorTooltip?: boolean;
  isSelected?: boolean;
};

type PlayerCardEmits = {
  playerCardSelectorClick: [];
};

export type {
  PlayerCardProps,
  PlayerCardEmits,
};