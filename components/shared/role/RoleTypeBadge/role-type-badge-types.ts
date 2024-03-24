import type { BadgeProps } from "primevue/badge";

import type { RoleType } from "~/composables/api/role/types/role.types";

type RoleTypeBadgeProps = {
  roleType: RoleType;
  size?: BadgeProps["size"];
};

export type { RoleTypeBadgeProps };