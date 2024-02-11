import { Expose, plainToInstance } from "class-transformer";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { GameAdditionalCardRecipientRoleName } from "~/composables/api/game/types/game-additional-card/types/game-additional-card.types";
import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class CreateGameAdditionalCardDto {
  @Expose()
  public roleName: RoleNames;

  @Expose()
  public recipient: GameAdditionalCardRecipientRoleName;

  public static create(createGameAdditionalCardDto: CreateGameAdditionalCardDto): CreateGameAdditionalCardDto {
    return plainToInstance(CreateGameAdditionalCardDto, createGameAdditionalCardDto, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { CreateGameAdditionalCardDto };