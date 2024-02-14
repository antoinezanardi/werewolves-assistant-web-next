import { Expose, plainToInstance, Type } from "class-transformer";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { GamePhase, GameStatus } from "~/composables/api/game/types/game.types";
import { Player } from "~/composables/api/game/types/players/player.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class Game {
  @Expose()
  public _id: string;

  @Expose()
  public turn: number;

  @Expose()
  public phase: GamePhase;

  @Expose()
  public tick: number;

  @Expose()
  public status: GameStatus;

  @Type(() => Player)
  @Expose()
  public players: Player[];

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;

  public static create(game: Game): Game {
    return plainToInstance(Game, game, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { Game };