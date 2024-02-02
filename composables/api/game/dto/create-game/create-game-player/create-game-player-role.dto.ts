import { Expose } from "class-transformer";

import { RoleNames } from "~/composables/api/role/enums/role.enums";

class CreateGamePlayerRoleDto {
  @Expose()
  public name: RoleNames;
}

export { CreateGamePlayerRoleDto };