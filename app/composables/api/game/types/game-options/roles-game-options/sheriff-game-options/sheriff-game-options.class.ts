import { Expose, plainToInstance, Type } from "class-transformer";
import { SheriffElectionGameOptions } from "~/composables/api/game/types/game-options/roles-game-options/sheriff-game-options/sheriff-election-game-options/sheriff-election-game-options.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class SheriffGameOptions {
  @Expose()
  public isEnabled: boolean;

  @Type(() => SheriffElectionGameOptions)
  @Expose()
  public electedAt: SheriffElectionGameOptions;

  @Expose()
  public hasDoubledVote: boolean;

  @Expose()
  public mustSettleTieInVotes: boolean;

  public static create(sheriffGameOptions: SheriffGameOptions): SheriffGameOptions {
    return plainToInstance(SheriffGameOptions, sheriffGameOptions, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { SheriffGameOptions };