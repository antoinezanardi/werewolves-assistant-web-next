import { Expose } from "class-transformer";

import { RoleNames } from "~/composables/api/role/enums/role.enums";

class PlayerRole {
  @Expose()
  public original: RoleNames;

  @Expose()
  public current: RoleNames;

  @Expose()
  public isRevealed: boolean;
}

export { PlayerRole };