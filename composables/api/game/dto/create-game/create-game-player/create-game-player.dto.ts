import { Expose, plainToInstance, Type } from "class-transformer";

import { CreateGamePlayerRoleDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player-role.dto";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class CreateGamePlayerDto {
  @Expose()
  public name: string;

  @Type(() => CreateGamePlayerRoleDto)
  @Expose()
  public role: CreateGamePlayerRoleDto;

  public static create(createGamePlayerDto: CreateGamePlayerDto): CreateGamePlayerDto {
    return plainToInstance(CreateGamePlayerDto, createGamePlayerDto, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { CreateGamePlayerDto };