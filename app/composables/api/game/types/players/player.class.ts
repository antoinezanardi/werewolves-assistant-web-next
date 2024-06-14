import { Expose, plainToInstance, Type } from "class-transformer";

import { PlayerAttribute } from "~/composables/api/game/types/players/player-attribute/player-attribute.class";
import { PlayerRole } from "~/composables/api/game/types/players/player-role/player-role.class";
import { PlayerSide } from "~/composables/api/game/types/players/player-side/player-side.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class Player {
  @Expose()
  public _id: string;

  @Expose()
  public name: string;

  @Expose()
  @Type(() => PlayerRole)
  public role: PlayerRole;

  @Expose()
  @Type(() => PlayerSide)
  public side: PlayerSide;

  @Type(() => PlayerAttribute)
  @Expose()
  public attributes: PlayerAttribute[];

  @Expose()
  public isAlive: boolean;

  public static create(player: Player): Player {
    return plainToInstance(Player, player, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { Player };