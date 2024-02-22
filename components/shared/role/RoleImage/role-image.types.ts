import type { RoleNames } from "~/composables/api/role/enums/role.enums";

type RoleImageProps = {
  alt: string,
  roleName?: RoleNames,
  sizes?: string,
  definition?: "normal" | "small";
};

export type { RoleImageProps };