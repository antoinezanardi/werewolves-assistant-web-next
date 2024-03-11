import { Expose, plainToInstance } from "class-transformer";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { GameAdditionalCardRecipientRoleName } from "~/composables/api/game/types/game-additional-card/types/game-additional-card.types";
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { RoleName } from "~/composables/api/role/types/role.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class CreateGameAdditionalCardDto {
  @Expose()
  public roleName: RoleName;

  @Expose()
  public recipient: GameAdditionalCardRecipientRoleName;

  public static create(createGameAdditionalCardDto: CreateGameAdditionalCardDto): CreateGameAdditionalCardDto {
    return plainToInstance(CreateGameAdditionalCardDto, createGameAdditionalCardDto, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { CreateGameAdditionalCardDto };