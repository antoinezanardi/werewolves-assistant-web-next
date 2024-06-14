import type { BadgeProps } from "primevue/badge";

import type { RoleOrigin } from "~/composables/api/role/types/role.types";

type RoleOriginBadgeProps = {
  roleOrigin: RoleOrigin;
  size?: BadgeProps["size"];
};

export type { RoleOriginBadgeProps };