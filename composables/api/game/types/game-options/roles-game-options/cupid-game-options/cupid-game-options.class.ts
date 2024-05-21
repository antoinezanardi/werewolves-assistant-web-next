import { Expose, plainToInstance, Type } from "class-transformer";
import { CupidLoversGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/cupid-game-options/cupid-lovers-game-options/cupid-lovers-game-options.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class CupidGameOptions {
  @Type(() => CupidLoversGameOptions)
  @Expose()
  public lovers: CupidLoversGameOptions;

  @Expose()
  public mustWinWithLovers: boolean;

  public static create(cupidGameOptions: CupidGameOptions): CupidGameOptions {
    return plainToInstance(CupidGameOptions, cupidGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { CupidGameOptions };