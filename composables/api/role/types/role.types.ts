import type { RoleOrigins, RoleSides, RoleTypes, RoleNames } from "~/composables/api/role/enums/role.enums";

type Role = {
  name: RoleNames;

  side: RoleSides;

  type: RoleTypes;

  origin: RoleOrigins;

  // additionalCardsEligibleRecipients?: GameAdditionalCardRecipientRoleName[];

  minInGame?: number;

  maxInGame: number;

  recommendedMinPlayers?: number;
};

export type { Role };