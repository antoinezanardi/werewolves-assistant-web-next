import { Expose, plainToInstance } from "class-transformer";

import type { RoleSide } from "~/composables/api/role/types/role.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class PlayerSide {
  @Expose()
  public original: RoleSide;

  @Expose()
  public current: RoleSide;

  public static create(side: Partial<PlayerSide>): PlayerSide {
    return plainToInstance(PlayerSide, side, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { PlayerSide };