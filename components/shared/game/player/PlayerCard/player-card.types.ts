import type { RoleNames } from "~/composables/api/role/enums/role.enums";

type PlayerCardProps = {
  playerName: string;
  playerRole: RoleNames | undefined;
};

export type { PlayerCardProps };