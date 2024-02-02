import { Expose, Type } from "class-transformer";

import { CreateGamePlayerRoleDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player-role.dto";

class CreateGamePlayerDto {
  @Expose()
  public name: string | undefined;

  @Type(() => CreateGamePlayerRoleDto)
  public role: CreateGamePlayerRoleDto;
}

export { CreateGamePlayerDto };