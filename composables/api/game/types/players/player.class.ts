import { Expose, plainToInstance } from "class-transformer";

import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class Player {
  @Expose()
  public _id: string;

  @Expose()
  public name: string;

  public static create(player: Player): Player {
    return plainToInstance(Player, player, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { Player };