import { Expose, plainToInstance } from "class-transformer";

import { RoleNames } from "~/composables/api/role/enums/role.enums";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class PlayerRole {
  @Expose()
  public original: RoleNames;

  @Expose()
  public current: RoleNames;

  @Expose()
  public isRevealed: boolean;

  public static create(role: Partial<PlayerRole>): PlayerRole {
    return plainToInstance(PlayerRole, role, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { PlayerRole };