import { Expose, plainToInstance, Type } from "class-transformer";

import { CreateGamePlayerRoleDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player-role.dto";
import { CreateGamePlayerSideDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player-side.dto";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class CreateGamePlayerDto {
  @Expose()
  public name: string;

  @Type(() => CreateGamePlayerRoleDto)
  @Expose()
  public role: CreateGamePlayerRoleDto;

  @Type(() => CreateGamePlayerSideDto)
  @Expose()
  public side: CreateGamePlayerSideDto;

  @Expose()
  public group?: string;

  public static create(createGamePlayerDto: CreateGamePlayerDto): CreateGamePlayerDto {
    return plainToInstance(CreateGamePlayerDto, createGamePlayerDto, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { CreateGamePlayerDto };