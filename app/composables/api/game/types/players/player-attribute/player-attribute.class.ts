import { Expose, plainToInstance, Type } from "class-transformer";

import type { GameSource } from "~/composables/api/game/types/game.types";
import { PlayerAttributeActivation } from "~/composables/api/game/types/players/player-attribute/player-attribute-activation/player-attribute-activation.class";
import type { PlayerAttributeName } from "~/composables/api/game/types/players/player-attribute/player-attribute.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class PlayerAttribute {
  @Expose()
  public name: PlayerAttributeName;

  @Expose()
  public source: GameSource;

  @Expose()
  public remainingPhases?: number;

  @Type(() => PlayerAttributeActivation)
  @Expose()
  public activeAt?: PlayerAttributeActivation;

  @Expose()
  public doesRemainAfterDeath?: boolean;

  public static create(playerAttribute: PlayerAttribute): PlayerAttribute {
    return plainToInstance(PlayerAttribute, playerAttribute, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { PlayerAttribute };