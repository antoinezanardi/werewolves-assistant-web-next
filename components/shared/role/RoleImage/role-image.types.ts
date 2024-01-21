import type { RoleNames } from "~/composables/api/role/enums/role.enums";

type RoleImageProps = {
  roleName: RoleNames,
  sizes?: string,
  definition?: "normal" | "small";
};

export type { RoleImageProps };