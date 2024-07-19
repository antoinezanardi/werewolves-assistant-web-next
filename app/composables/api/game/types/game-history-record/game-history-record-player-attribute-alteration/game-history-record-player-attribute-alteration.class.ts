import { Expose, plainToInstance } from "class-transformer";
import type { GameHistoryRecordPlayerAttributeAlterationStatus } from "~/composables/api/game/types/game-history-record/game-history-record-player-attribute-alteration/game-history-record-player-attribute-alteration.types";
import type { GameSource } from "~/composables/api/game/types/game.types";
import type { PlayerAttributeName } from "~/composables/api/game/types/players/player-attribute/player-attribute.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GameHistoryRecordPlayerAttributeAlteration {
  @Expose()
  public name: PlayerAttributeName;

  @Expose()
  public source: GameSource;

  @Expose()
  public playerName: string;

  @Expose()
  public status: GameHistoryRecordPlayerAttributeAlterationStatus;

  public static create(gameHistoryRecordPlayerAttributeAlteration: GameHistoryRecordPlayerAttributeAlteration): GameHistoryRecordPlayerAttributeAlteration {
    return plainToInstance(GameHistoryRecordPlayerAttributeAlteration, gameHistoryRecordPlayerAttributeAlteration, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GameHistoryRecordPlayerAttributeAlteration };