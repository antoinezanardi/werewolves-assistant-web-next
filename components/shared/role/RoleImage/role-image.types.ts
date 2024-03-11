import type { RoleName } from "~/composables/api/role/types/role.types";

type RoleImageProps = {
  alt?: string,
  roleName?: RoleName,
  sizes?: string,
  definition?: "normal" | "small";
};

export type { RoleImageProps };