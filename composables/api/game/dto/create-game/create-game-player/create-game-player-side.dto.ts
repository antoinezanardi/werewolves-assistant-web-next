import { Expose, plainToInstance } from "class-transformer";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { RoleSide } from "~/composables/api/role/types/role.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class CreateGamePlayerSideDto {
  @Expose()
  public original?: RoleSide;

  @Expose()
  public current?: RoleSide;

  public static create(createGamePlayerSideDto: CreateGamePlayerSideDto): CreateGamePlayerSideDto {
    return plainToInstance(CreateGamePlayerSideDto, createGamePlayerSideDto, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { CreateGamePlayerSideDto };