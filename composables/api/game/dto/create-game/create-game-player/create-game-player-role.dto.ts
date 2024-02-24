import { Expose, plainToInstance } from "class-transformer";

import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class CreateGamePlayerRoleDto {
  @Expose()
  public name?: RoleNames;

  public static create(createGamePlayerRoleDto: CreateGamePlayerRoleDto): CreateGamePlayerRoleDto {
    return plainToInstance(CreateGamePlayerRoleDto, createGamePlayerRoleDto, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { CreateGamePlayerRoleDto };