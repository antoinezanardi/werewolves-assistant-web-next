import { Expose, plainToInstance, Type } from "class-transformer";

import { GamePhase } from "~/composables/api/game/types/game-phase/game-phase.class";
import { GamePlay } from "~/composables/api/game/types/game-play/game-play.class";
import { GameVictory } from "~/composables/api/game/types/game-victory/game-victory.class";
import type { GameStatus } from "~/composables/api/game/types/game.types";
import { Player } from "~/composables/api/game/types/players/player.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";

class Game {
  @Expose()
  public _id: string;

  @Expose()
  public turn: number;

  @Type(() => GamePhase)
  @Expose()
  public phase: GamePhase;

  @Expose()
  public tick: number;

  @Expose()
  public status: GameStatus;

  @Type(() => Player)
  @Expose()
  public players: Player[];

  @Type(() => GamePlay)
  @Expose()
  public currentPlay: GamePlay | null;

  @Type(() => GamePlay)
  @Expose()
  public upcomingPlays: GamePlay[];

  @Type(() => GameVictory)
  @Expose()
  public victory?: GameVictory;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;

  public static create(game: Game): Game {
    return plainToInstance(Game, game, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }
}

export { Game };