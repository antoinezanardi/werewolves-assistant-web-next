import type { BadgeProps } from "primevue/badge";

import type { RoleSide } from "~/composables/api/role/types/role.types";

type RoleSideBadgeProps = {
  roleSide: RoleSide;
  size?: BadgeProps["size"];
};

export type { RoleSideBadgeProps };