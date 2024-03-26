import { Expose, plainToInstance } from "class-transformer";

import type { GameAdditionalCardRecipientRoleName } from "~/composables/api/game/types/game-additional-card/types/game-additional-card.types";
import type { RoleName, RoleOrigin, RoleSide, RoleType } from "~/composables/api/role/types/role.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class Role {
  @Expose()
  public name: RoleName;

  @Expose()
  public side: RoleSide;

  @Expose()
  public type: RoleType;

  @Expose()
  public origin: RoleOrigin;

  @Expose()
  public additionalCardsEligibleRecipients?: GameAdditionalCardRecipientRoleName[];

  @Expose()
  public minInGame?: number;

  @Expose()
  public maxInGame: number;

  @Expose()
  public recommendedMinPlayers?: number;

  public static create(role: Role): Role {
    return plainToInstance(Role, role, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { Role };