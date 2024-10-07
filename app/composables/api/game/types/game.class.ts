import { Expose, instanceToPlain, plainToInstance, Type } from "class-transformer";

import { GameEvent } from "~/composables/api/game/game-event/game-event.class";
import { GameAdditionalCard } from "~/composables/api/game/types/game-additional-card/game-additional-card.class";
import { GameOptions } from "~/composables/api/game/types/game-options/game-options.class";
import { GamePhase } from "~/composables/api/game/types/game-phase/game-phase.class";
import { GameHistoryRecord } from "~/composables/api/game/types/game-history-record/game-history-record.class";
import { GamePlay } from "~/composables/api/game/types/game-play/game-play.class";
import { GameVictory } from "~/composables/api/game/types/game-victory/game-victory.class";
import type { GameStatus } from "~/composables/api/game/types/game.types";
import { Player } from "~/composables/api/game/types/players/player.class";
import { DEFAULT_PLAIN_TO_INSTANCE_OPTIONS } from "~/utils/constants/class-transformer.constants";
import type { OmitToJSON } from "~/utils/types/class.types";

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

  @Expose()
  public playerGroups?: string[];

  @Type(() => GamePlay)
  @Expose()
  public currentPlay: GamePlay | null;

  @Type(() => GamePlay)
  @Expose()
  public upcomingPlays: GamePlay[];

  @Type(() => GameAdditionalCard)
  @Expose()
  public additionalCards?: GameAdditionalCard[];

  @Type(() => GameHistoryRecord)
  @Expose()
  public lastGameHistoryRecord: GameHistoryRecord | null;

  @Type(() => GameOptions)
  @Expose()
  public options: GameOptions;

  @Type(() => GameVictory)
  @Expose()
  public victory?: GameVictory;

  @Type(() => GameEvent)
  @Expose()
  public events?: GameEvent[];

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;

  public static create(game: OmitToJSON<Game>): Game {
    return plainToInstance(Game, game, DEFAULT_PLAIN_TO_INSTANCE_OPTIONS);
  }

  public toJSON(): object {
    return instanceToPlain(this);
  }
}

export { Game };