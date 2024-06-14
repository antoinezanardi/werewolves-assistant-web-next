import { Expose, instanceToPlain, plainToInstance, Type } from "class-transformer";

import { CreateGameAdditionalCardDto } from "~/composables/api/game/dto/create-game/create-game-additional-card/create-game-additional-card.dto";
import { CreateGamePlayerDto } from "~/composables/api/game/dto/create-game/create-game-player/create-game-player.dto";
import { GameOptions } from "~/composables/api/game/types/game-options/game-options.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";
import type { OmitToJSON } from "~/utils/types/class.types";

class CreateGameDto {
  @Type(() => CreateGamePlayerDto)
  @Expose()
  public players: CreateGamePlayerDto[] = [];

  @Type(() => CreateGameAdditionalCardDto)
  @Expose()
  public additionalCards?: CreateGameAdditionalCardDto[];

  @Type(() => GameOptions)
  @Expose()
  public options: GameOptions;

  public static create(createGameDto: OmitToJSON<CreateGameDto>): CreateGameDto {
    return plainToInstance(CreateGameDto, createGameDto, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }

  public toJSON(): object {
    return instanceToPlain(this);
  }
}

export { CreateGameDto };