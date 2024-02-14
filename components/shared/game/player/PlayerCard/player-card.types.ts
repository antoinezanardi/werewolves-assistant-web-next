import type { RoleNames } from "~/composables/api/role/enums/role.enums";

type PlayerCardProps = {
  playerName: string;
  playerRole?: RoleNames;
  selectorAriaLabel?: string;
  doesShowSelectorTooltip?: boolean;
};

type PlayerCardEmits = {
  playerCardSelectorClick: [];
};

export type {
  PlayerCardProps,
  PlayerCardEmits,
};