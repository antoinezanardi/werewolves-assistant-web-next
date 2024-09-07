import { Expose, plainToInstance, Type } from "class-transformer";
import { CompositionGameOptions } from "~/composables/api/game/types/game-options/composition-game-options/composition-game-options.class";
import { RolesGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/roles-game-options.class";
import { VotesGameOptions } from "~/composables/api/game/types/game-options/votes-game-options/votes-game-options.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";
import type { OmitToJSON } from "~/utils/types/class.types";

class GameOptions {
  @Type(() => CompositionGameOptions)
  @Expose()
  public composition: CompositionGameOptions;

  @Type(() => VotesGameOptions)
  @Expose()
  public votes: VotesGameOptions;

  @Type(() => RolesGameOptions)
  @Expose()
  public roles: RolesGameOptions;

  public static create(gameOptions: OmitToJSON<GameOptions>): GameOptions {
    return plainToInstance(GameOptions, gameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GameOptions };