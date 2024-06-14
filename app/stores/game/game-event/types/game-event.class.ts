import { Expose, plainToInstance } from "class-transformer";
import type { Player } from "~/composables/api/game/types/players/player.class";
import type { GameEventType } from "~/stores/game/game-event/types/game-event.types";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class GameEvent {
  @Expose()
  public type: GameEventType;

  @Expose()
  public players?: Player[];

  public static create(gameEvent: GameEvent): GameEvent {
    return plainToInstance(GameEvent, gameEvent, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { GameEvent };