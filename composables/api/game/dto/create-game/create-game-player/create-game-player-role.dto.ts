import { Expose } from "class-transformer";

import type { RoleNames } from "~/composables/api/role/enums/role.enums";

class CreateGamePlayerRoleDto {
  @Expose()
  public name: RoleNames | undefined;
}

export { CreateGamePlayerRoleDto };