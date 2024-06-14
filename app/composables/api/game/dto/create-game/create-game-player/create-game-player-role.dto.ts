import { Expose, plainToInstance } from "class-transformer";

import type { RoleName } from "~/composables/api/role/types/role.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class CreateGamePlayerRoleDto {
  @Expose()
  public name?: RoleName;

  public static create(createGamePlayerRoleDto: CreateGamePlayerRoleDto): CreateGamePlayerRoleDto {
    return plainToInstance(CreateGamePlayerRoleDto, createGamePlayerRoleDto, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { CreateGamePlayerRoleDto };