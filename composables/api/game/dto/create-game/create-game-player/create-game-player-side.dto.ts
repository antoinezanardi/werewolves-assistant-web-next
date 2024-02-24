import { Expose, plainToInstance } from "class-transformer";

import { RoleSides } from "~/composables/api/role/enums/role.enums";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class CreateGamePlayerSideDto {
  @Expose()
  public original?: RoleSides;

  @Expose()
  public current?: RoleSides;

  public static create(createGamePlayerSideDto: CreateGamePlayerSideDto): CreateGamePlayerSideDto {
    return plainToInstance(CreateGamePlayerSideDto, createGamePlayerSideDto, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { CreateGamePlayerSideDto };