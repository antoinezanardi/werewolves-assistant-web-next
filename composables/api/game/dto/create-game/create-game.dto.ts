import { Expose, plainToInstance, Type } from "class-transformer";

import { CreateGameAdditionalCardDto } from "~/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto";
import { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class CreateGameDto {
  @Type(() => CreateGamePlayerDto)
  @Expose()
  public players: CreateGamePlayerDto[] = [];

  @Type(() => CreateGameAdditionalCardDto)
  @Expose()
  public additionalCards?: CreateGameAdditionalCardDto[];

  public static create(createGameDto: CreateGameDto): CreateGameDto {
    return plainToInstance(CreateGameDto, createGameDto, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { CreateGameDto };