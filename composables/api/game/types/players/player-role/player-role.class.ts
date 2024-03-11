import { Expose, plainToInstance } from "class-transformer";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { RoleName } from "~/composables/api/role/types/role.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class PlayerRole {
  @Expose()
  public original: RoleName;

  @Expose()
  public current: RoleName;

  @Expose()
  public isRevealed: boolean;

  public static create(role: Partial<PlayerRole>): PlayerRole {
    return plainToInstance(PlayerRole, role, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { PlayerRole };