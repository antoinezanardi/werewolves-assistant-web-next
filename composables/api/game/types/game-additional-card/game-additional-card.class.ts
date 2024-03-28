import { Expose, plainToInstance } from "class-transformer";

import type { GameAdditionalCardRecipientRoleName } from "~/composables/api/game/types/game-additional-card/game-additional-card.types";
import type { RoleName } from "~/composables/api/role/types/role.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GameAdditionalCard {
  @Expose()
  public _id: string;

  @Expose()
  public roleName: RoleName;

  @Expose()
  public recipient: GameAdditionalCardRecipientRoleName;

  @Expose()
  public isUsed: boolean;

  public static create(gameAdditionalCard: GameAdditionalCard): GameAdditionalCard {
    return plainToInstance(GameAdditionalCard, gameAdditionalCard, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GameAdditionalCard };